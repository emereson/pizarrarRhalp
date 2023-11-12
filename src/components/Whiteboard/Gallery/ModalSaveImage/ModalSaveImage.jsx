import React, { useEffect, useState } from 'react';
import './ModalSaveImage.scss';
import { useQuery } from '@apollo/client';
import { useUser } from '../../../UserManagment/UserProvider';

// MODULES - SERVICES
import html2canvas from 'html2canvas';
import { v4 as uuid } from 'uuid';
import { S3Service } from '../../../../services/S3.service';
import { useMutation } from '@apollo/client';
import { UPDATE_FILE } from '../../graphQL/mutations';
import { useCreateFile } from '../../hooks/useCreateFile';
import { FILES_BY_USERS } from '../../graphQL/queries';

// COMPONENTS
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Form from './Form';
import socket from 'socket.io-client/lib/socket';
import { useSocket } from 'providers/SocketProvider';
import * as Actions from 'store/actions/WhiteBoardActions';
import SaveBranakButton from './componentsModalSaveImage/index/SaveBranakButton';

const ModalSave = ({ show, onHide, canvasImage, savedFile }) => {
  const { user } = useUser();
  const [loadings, setLoadings] = useState([0, 0]);
  const [file, setFile] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [updateCurrentFile, setupdateCurrentFile] = useState(false);
  const [saveInBranakMode, setsaveInBranakMode] = useState(false);
  const { createFile } = useCreateFile();
  const { loading: loadingUserFiles, data: userFiles } = useQuery(FILES_BY_USERS, {
    variables: { userId: user.attributes.sub },
    fetchPolicy: 'network-only'
  });
  const [LoadingSaveInBranak, setLoadingSaveInBranak] = useState(false);
  const [showSimpleSaveButton, setshowSimpleSaveButton] = useState(false);
  const [ScoreForm, setScoreForm] = useState(false);

  const { publicSocket: socket } = useSocket();

  const s3Service = new S3Service('public', 'image/png');
  const [updateFile] = useMutation(UPDATE_FILE);

  console.log(s3Service);

  const isLoading = loadings[0] || loadings[1];

  const saveComputer = async () => {
    if (isLoading) return;

    setLoadings([1, 0]);

    const file = await capture();
    download(file);
    closeModal();
  };

  const fileExistInUSerGallery = file => {
    return (
      file && // Asegura que file no sea undefined o null
      userFiles?.filesByUsers?.items.map(item => item.id).includes(file.id)
    );
  };

  const saveBranak = async (action, useStored) => {
    if (action !== 'test') setLoadingSaveInBranak(true);
    if (isLoading) return;

    const file = await capture();

    const commonActions = () => {
      setLoadingSaveInBranak(false);
      setsaveInBranakMode(null);
      window.sessionStorage.setItem('isNewWhiteboardModification', 'false');
      savedFile();
      closeModal();
    };

    if (fileExistInUSerGallery(file) || useStored) {
      if (action === 'update' || action === 'replace') {
        await createUpdateImage(file, 'update', {
          specificId: useStored
            ? window.sessionStorage.getItem('storedUploadedImage')
            : null
        });
      }
    }

    if (action === 'test') {
      setLoadingSaveInBranak(false);
      setScoreForm(true);
    }

    if (action === 'new' || action === 'newFromDevice') {
      await createUpdateImage(file, 'create', {
        saveInDefault: action === 'new',
        storageInCache: action === 'newFromDevice'
      });
    }

    commonActions();
  };

  useEffect(() => {
    if (show) {
      setScoreForm(false);
      setsaveInBranakMode(null);
      setshowSimpleSaveButton(false);
    }
    if (
      show &&
      window.sessionStorage.getItem('imageUploadedFrom') === 'device' &&
      window.sessionStorage.getItem('isNewWhiteboardModification') !== 'true'
    ) {
      const file = capture();
      if (file) {
        setsaveInBranakMode(file);
        setshowSimpleSaveButton(true);
      }
    }
    if (
      show &&
      window.sessionStorage.getItem('imageUploadedFrom') === 'device' &&
      window.sessionStorage.getItem('isNewWhiteboardModification') === 'true'
    ) {
      const file = capture();
      if (file) {
        setsaveInBranakMode(file);
      }
    }
  }, [window.sessionStorage.getItem('createNewImageInBranak'), show]);

  const createUpdateImage = async (file, mode, options) => {
    try {
      // delete old image
      await s3Service.deleteFile(file.url);
      const { fileUrl } = await s3Service.uploadImage(file);

      let fileInput = {
        id: file.id,
        name: file.name,
        url: fileUrl,
        mode: 'file',
        currentFolder: options.saveInDefault
          ? 'default'
          : window.sessionStorage.getItem('currentFileLocation') || 'default'
      };
      let fileData;
      if (mode === 'create') {
        delete fileInput.id;
        fileInput = {
          ...fileInput,
          userId: user.attributes.sub
        };
        const { data } = await createFile({ variables: fileInput });
        fileData = data;
      }
      if (mode === 'update') {
        if (options.specificId)
          fileInput = {
            ...fileInput,
            id: options.specificId
          };
        const { data } = await updateFile({ variables: fileInput });
        fileData = data;
      }

      if (options.storageInCache) {
        // this is for prevent the refreshing of the image, and enable the another functionality
        window.sessionStorage.setItem('storedUploadedImage', fileData?.createFile?.id);
      }
      if (!fileData?.updateFile?.id && mode === 'update')
        throw new Error('Error update file in DynamoDB');
      setsaveInBranakMode(null);
    } catch (error) {
      if (error.message === 'Choose an image file') {
        console.error('ERROR-TYPE-FILE->', error);
        alert('The selected file must be an image');
      } else {
        console.error('ERROR-UPDATE-IMAGE ->', error);
        alert('Error updating file');
      }
    } finally {
      setLoadings([0, 0]);
    }
  };

  const capture = async () => {
    const capture = document.getElementById('capture');
    const canvasImageRef = JSON.parse(localStorage.getItem('canvasImageData'));

    try {
      if (!capture || !canvasImageRef) {
        throw new Error('Capture or canvasImageRef not found');
      }

      const canvas = await html2canvas(capture, {
        useCORS: true,
        allowTaint: true,
        scrollX: -36,
        scrollY: -7,
        height: canvasImageRef.height || 0,
        width: canvasImageRef.width || 0
      });

      const newFile = await new Promise((resolve, reject) => {
        canvas.toBlob(
          blob => {
            if (blob) {
              const image = canvasImage.image;

              const newFile = {
                id: image.id || '',
                userId: image.userId || '',
                name: `gallery/file_branak_${uuid()}.png`,
                url: image.url || '',
                blob
              };

              resolve(newFile);
            } else {
              reject(new Error('Error generating blob'));
            }
          },
          'image/png',
          1.0
        );
      });

      setFile(newFile);
      return newFile;
    } catch (error) {
      console.error('ERROR-CAPTURE-IMAGE ->', error);
      alert(`Error capturing whiteboard image: ${error.message}`);
      setLoadings([0, 0]);
    }
  };

  const download = file => {
    const link = document.createElement('a');

    link.href = window.URL.createObjectURL(file.blob);
    link.download = file.name;
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setLoadings([0, 0]);
    onHide();
  };

  console.log(loadingUserFiles);
  return (
    <Modal
      className={window.classnames('modal-save', { 'modal-form': openForm })}
      show={show}
      onHide={isLoading ? () => null : onHide}
      backdrop={openForm ? 'static' : true}
      aria-label="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <React.Fragment>
          {ScoreForm && (
            <Form
              file={file}
              closeModal={onHide}
              savedFile={savedFile}
              updateImage={updateCurrentFile}
              setOpenForm={setScoreForm}
            />
          )}
          {loadingUserFiles ? (
            <Spinner className="bran-spinner" animation="border" />
          ) : (
            <div className="saving-image-branak-from-gallery" hidden="hidden">
              <div
                className="btn-container"
                style={{
                  flexDirection: window.innerWidth < 750 ? 'column-reverse' : 'row',
                  opacity: 0
                }}
              >
                <SaveBranakButton
                  capture={capture}
                  fileExistInUSerGallery={fileExistInUSerGallery}
                  setLoadings={setLoadings}
                  setsaveInBranakMode={setsaveInBranakMode}
                  saveBranak={saveBranak}
                  isLoading={isLoading}
                  loadings={loadings}
                  show={show}
                  saveInBranakMode={saveInBranakMode}
                />
              </div>
            </div>
          )}
        </React.Fragment>
        {LoadingSaveInBranak && (
          <div className="save-image-loading-view">
            <Spinner
              className="bran-spinner"
              animation="border"
              style={{ width: 50, height: 50 }}
            />
          </div>
        )}
        {saveInBranakMode && !ScoreForm && (
          <div className="saving-image-branak-from-gallery">
            <div className="btn-container" style={{ flexDirection: 'column' }}>
              {(window.sessionStorage.getItem('storedUploadedImage') === 'false' ||
                !window.sessionStorage.getItem('storedUploadedImage')) &&
                !fileExistInUSerGallery(saveInBranakMode) && (
                  <button
                    className="saving-image-branak-from-gallery-btns"
                    style={{
                      marginBottom: '10px'
                    }}
                    onClick={() => {
                      saveBranak('newFromDevice');
                    }}
                    disabled={isLoading}
                  >
                    <p>Simple save</p>
                  </button>
                )}

              {(fileExistInUSerGallery(saveInBranakMode) ||
                window.sessionStorage.getItem('storedUploadedImage')) !== 'false' && (
                <button
                  className="saving-image-branak-from-gallery-btns"
                  style={{
                    marginBottom: '10px'
                  }}
                  onClick={() =>
                    saveBranak(
                      'replace',
                      window.sessionStorage.getItem('storedUploadedImage') !== 'false'
                        ? true
                        : false
                    )
                  }
                  disabled={isLoading}
                >
                  <p>Replace existent</p>
                </button>
              )}

              {(fileExistInUSerGallery(saveInBranakMode) ||
                window.sessionStorage.getItem('storedUploadedImage')) !== 'false' && (
                <button
                  className="saving-image-branak-from-gallery-btns"
                  onClick={() => {
                    saveBranak('new');
                  }}
                  disabled={isLoading}
                >
                  <p>Keep both</p>
                </button>
              )}

              <button
                className="saving-image-branak-from-gallery-btns"
                style={{
                  marginBottom: '10px'
                }}
                onClick={() => saveBranak('test')}
                disabled={isLoading}
              >
                <p>Save as practice</p>
              </button>

              <button
                className="saving-image-branak-from-gallery-btns"
                onClick={() => {
                  closeModal();
                }}
                disabled={isLoading}
              >
                <p>Cancel</p>
              </button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalSave;
