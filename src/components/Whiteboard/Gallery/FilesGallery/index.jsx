import React, { useState, useEffect, useRef, useCallback } from 'react';
import './FilesGallery.scss';

import { useUser } from '../../../UserManagment/UserProvider';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_FOLDER, DELETE_FILE, UPDATE_FILE } from '../../graphQL/mutations';
import { useCreateFile } from '../../hooks/useCreateFile';
import { FILES_BY_USERS } from '../../graphQL/queries';

import Spinner from 'react-bootstrap/Spinner';
import { S3Service } from '../../../../services/S3.service';
import { v4 as uuid } from 'uuid';
import { ReactComponent as NextIcon } from 'assets/icons/forward.svg';
import FolderComponent from '../components/FolderComponent';
import DraggableItem from 'components/AdminDashboard/DraggableItem';
import DropTarget from 'components/AdminDashboard/DropTarget';
import folderIcon from '../assets/folder_icon.svg';
import { v4 as uuidv4 } from 'uuid';
import ExamIconComponent from '../components/ExamIconComponent';
import StudentsPopper from '../components/studentsPopper';
import { Divider, Popper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getNavigationHistory } from 'store/reduxToolkit/whiteboard/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  pushToNavigationHistory,
  removeLastHistory
} from 'store/reduxToolkit/whiteboard/actions';
import { FOLDER_MODES, FOLDER_NAMES } from './constants';

const FilesGallery = ({ eventCallback, setOpenGallery, sort, filter }) => {
  const { user } = useUser();
  const [fileList, setFileList] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileDeleting, setFileDeleting] = useState(null);
  const [CreatingFolder, setCreatingFolder] = useState(null);
  const [fileConfirming, setFileConfirming] = useState(null);
  const navigationHistory = useSelector(getNavigationHistory);
  const [fileListFiltered, setfileListFiltered] = useState([]);
  const [updateFile] = useMutation(UPDATE_FILE);
  const [ChangingFileLocation, setChangingFileLocation] = useState(false);
  const [DraggingFile, setDraggingFile] = useState(false);
  const [ChangeAddButton, setChangeAddButton] = useState(false);
  const [AnchorPoint, setAnchorPoint] = useState(null);
  const [OsDragging, setOsDragging] = useState(true);
  const [ExamMode, setExamMode] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const inputFile = useRef();
  const s3Service = new S3Service('public', 'image/png');
  const [getFilesByUsers, { loading: queryLoading, error, data: filesData }] =
    useLazyQuery(FILES_BY_USERS, {
      variables: { userId: user.attributes.sub, sort },
      fetchPolicy: 'network-only'
    });
  const { createFile } = useCreateFile();
  const [deleteFile] = useMutation(DELETE_FILE);

  const homeDefaultFolder = {
    mode: 'folder',
    id: 'home-default-folder',
    name: window.sessionStorage.getItem('defaultFolderName') ?? 'Default Folder',
    currentFolder: 'default',
    isNew: false
  };

  const saveFile = async fileBlob => {
    setFileUploading(true);

    const file = {
      name: `gallery/file_branak_${uuid()}.png`,
      blob: fileBlob
    };

    try {
      // Create file in S3
      const { fileUrl } = await s3Service.uploadFile(file);

      const fileInput = {
        userId: user.attributes.sub,
        name: file.name,
        url: fileUrl,
        mode: 'file',
        currentFolder: navigationHistory[navigationHistory.length - 1].id
          ? navigationHistory[navigationHistory.length - 1].id
          : 'default'
      };

      // Create file in DynamoDB
      const { data: fileData } = await createFile({ variables: fileInput });

      if (fileData?.createFile.id) {
        if (filter) fileList.shift();

        setFileList([...fileList, { ...fileData.createFile }]);
      } else throw new Error('Error saving file in DynamoDB');
    } catch (error) {
      console.error('ERROR-SAVE-FILE ->', error.message);
      alert('Error saving new file');
    }

    setFileUploading(false);
  };

  const saveTheExam = async (UserSelected, file) =>
    new Promise(async (response, reject) => {
      setFileUploading(true);
      let fileInput;

      if (UserSelected) {
        fileInput = {
          userId: UserSelected?.id,
          name: file.name,
          url: 'null',
          mode: 'exam',
          currentFolder: 'default'
        };
        try {
          // Create new file in DynamoDB
          const { data: fileData } = await createFile({ variables: fileInput });
          if (fileData) {
            setFileUploading(false);
            response(true);
          }
        } catch (error) {
          setFileUploading(false);
          reject(error);
        }
      }
    });

  const examSendToAll = sendToAll =>
    new Promise((response, reject) => {
      setFileUploading(true);
      const promises = [];
      sendToAll.forEach(({ user }) => {
        promises.push(
          new Promise((response, reject) => {
            saveTheExam(user, ExamMode)
              .then(() => response())
              .catch(e => reject(e));
          })
        );
      });

      Promise.all(promises)
        .then(() => {
          setFileUploading(false);
          response();
        })
        .catch(err => {
          reject(err);
        });
    });

  const addFolderToList = e => {
    e.nativeEvent.preventDefault();
    setChangeAddButton(true);
    setTimeout(() => {
      setAnchorPoint(null);
    }, 10);
    if (navigationHistory.length > 1) {
      setfileListFiltered(
        fileListFiltered.concat([
          {
            mode: 'folder',
            id: uuidv4(),
            name: 'New Folder',
            currentFolder: navigationHistory[navigationHistory.length - 1],
            isNew: true
          }
        ])
      );
    } else {
      setFileList(
        fileList.concat([
          {
            mode: 'folder',
            id: uuidv4(),
            name: 'New Folder',
            isNew: true
          }
        ])
      );
    }
  };

  const handleSaveFolder = async newFolder => {
    setCreatingFolder(newFolder.name);
    // Creating folderc
    await createFile({ variables: newFolder })
      .then(folder => {
        setCreatingFolder(null);
        setChangeAddButton(false);
      })
      .catch(error => {
        console.log('ERROR-CREATING-FOLDER ->', error);
        setCreatingFolder(null);
        alert('Error saving new file');
      });
  };

  const refreshAfterUpdate = (id, updated) => {
    setChangeAddButton(false);
    const filterFileList = fileList.filter(file => file.id !== id);
    if (updated) setFileList(filterFileList.concat([updated]));
    else setFileList(filterFileList);
  };

  const confirmDeleteFile = async ({ id: fileId, name: fileName, file }) =>
    new Promise(async (response, reject) => {
      try {
        const deleted = await s3Service.deleteFile(fileName);

        if (deleted) {
          const { data } = await deleteFile({ variables: { id: fileId } });

          if (data.deleteFile.id) {
            refreshAfterUpdate(fileId);
            response(true);
          } else throw new Error('delete failed in S3');
        } else throw new Error('delete failed in DynamoDB');
      } catch (error) {
        reject(error.message);
        console.error('ERROR-DELETE-FILE ->', error.message);
        alert('Error deleting file');
      } finally {
        setFileConfirming(null);
        setFileDeleting(null);
        response(true);
      }
    });

  const confirmDeleteFolder = (id, fileName) =>
    new Promise((response, reject) => {
      setCreatingFolder(fileName);
      const filesInFolder = fileList.filter(file => file.currentFolder === id);
      if (filesInFolder.length > 0) {
        filesInFolder.forEach((file, index) => {
          confirmDeleteFile(file).then(() => {
            if (index === filesInFolder.length - 1) {
              deleteFile({ variables: { id } })
                .then(() => {
                  refreshAfterUpdate(id);
                  setCreatingFolder(null);
                })
                .catch(error => {
                  setCreatingFolder(null);
                  reject(error.message + ' also, all the files has been deleted.');
                });
            }
          });
        });
      } else {
        deleteFile({ variables: { id } })
          .then(() => {
            refreshAfterUpdate(id);
            setCreatingFolder(null);
          })
          .catch(error => {
            setCreatingFolder(null);
            reject(error.message + ' also, all the files has been deleted.');
          });
      }
    });

  const inputOpen = () => {
    if (!fileUploading) inputFile.current.click();
  };

  const callback = file => {
    window.sessionStorage.setItem('currentFileLocation', file.currentFolder);
    window.sessionStorage.setItem('imageUploadedFrom', 'gallery');
    if (eventCallback) eventCallback(file);
  };

  // MOUNTED
  useEffect(() => {
    getFilesByUsers();
    return () => setOpenGallery && setOpenGallery(false);
  }, []);

  const filteringFiles = files => {
    if (navigationHistory.length > 1) {
      setfileListFiltered(
        files.filter(
          file =>
            file.currentFolder === navigationHistory[navigationHistory.length - 1].id
        )
      );
    } else {
      setfileListFiltered(
        files.filter(
          file =>
            file.currentFolder === 'default' ||
            !file.currentFolder ||
            file.currentFolder === null
        )
      );
    }
  };

  useEffect(() => {
    if (filesData) {
      let files = filesData.filesByUsers.items;
      if (filter) {
        files = files.filter((_, i) => i < filter);
        files = files.reverse();
      }
      setFileList(files);
      filteringFiles(files);
    }
  }, [filesData]);

  useEffect(() => {
    filteringFiles(fileList);
  }, [navigationHistory, fileList]);

  if (error) {
    console.error('ERROR-GET-FILES ->', error.message);
    alert('Error getting files');
    setOpenGallery(false);
  }

  if (queryLoading) {
    return (
      <div className="bran-loading">
        <Spinner animation="border" />
      </div>
    );
  }

  const handleNavigateInFolders = e => {
    dispatch(pushToNavigationHistory(e));
  };

  const removeLastInHistory = () => {
    dispatch(removeLastHistory());
  };

  const handleChangeFileFolder = async (file, id) => {
    setChangingFileLocation(true);
    const fileInput = {
      ...file,
      currentFolder: id
    };
    if (file.id !== id) {
      await updateFile({ variables: fileInput })
        .then(folder => {
          setChangingFileLocation(false);
          refreshAfterUpdate(file.id, fileInput);
        })
        .catch(error => {
          console.log('ERROR-UPDATING-FILE ->', error);
          setChangingFileLocation(false);
          alert('Error saving new file');
        });
    } else {
      setChangingFileLocation(false);
      alert("Can't perform this change, it should not be the same folder");
    }
  };

  const handleContextMenu = (e, mode) => {
    e.preventDefault();
    setAnchorPoint(null);
    if (window.innerWidth > 750) setAnchorPoint(e.target);
  };

  const handleSOfiles = async e => {
    e.preventDefault();
    if (OsDragging) {
      const { files } = e.dataTransfer;
      const success = [];
      await Array.from(files).forEach(async file => {
        await saveFile(file);
        success.push(true);
      });
      if (success) {
        console.log('success');
      }
      setDraggingFile(false);
    }
  };

  const fileBackground = mode => {
    if (mode === 'folder') {
      return 'transparent';
    }
    if (mode === 'exam') {
      return '#42F08C7a';
    }

    return 'inherit';
  };

  return (
    <>
      <Popper open={Boolean(AnchorPoint)} anchorEl={AnchorPoint} placement="bottom">
        <div className="contextMenu">
          {!ExamMode ? (
            <p className="popper-item" onClick={addFolderToList}>
              New Folder
            </p>
          ) : (
            <>
              <p
                className="popper-item"
                onClick={() => {
                  if (ExamMode) {
                    let examId = ExamMode.name.substring(
                      ExamMode.name.indexOf(': ') + 2,
                      ExamMode.name.length
                    );
                    navigator.clipboard.writeText(
                      `${window.location.origin}/take-exam/${examId}`
                    );
                  }
                }}
              >
                Copy exam link
              </p>
              <p
                className="popper-item"
                onClick={() => {
                  if (ExamMode) {
                    let examId = ExamMode.name.substring(
                      ExamMode.name.indexOf(': ') + 2,
                      ExamMode.name.length
                    );

                    history.push('/admin/exam-editor/' + examId);
                  }
                }}
              >
                Edit exam template
              </p>
              <Divider />
              <StudentsPopper
                updateLoading={e => console.log(e)}
                Spinner={Spinner}
                sendToAll={true}
                model2
                callback={(e, action) => {
                  if (!action) saveTheExam(e, ExamMode);
                  if (action === 'sendingToAll') {
                    examSendToAll(e);
                  }
                }}
              />
            </>
          )}
        </div>
      </Popper>
      <div
        className="files-gallery"
        onContextMenu={handleContextMenu}
        onDragOver={() => {
          if (OsDragging) {
            setDraggingFile(true);
          }
        }}
        onDragLeave={() => {
          if (OsDragging) {
            setDraggingFile(false);
          }
        }}
        id="files-gallery"
        onDrop={handleSOfiles}
        onClick={() => {
          setAnchorPoint(null);
          setExamMode(null);
        }}
        style={{ transform: eventCallback ? 'none' : 'scale(0.9)' }}
      >
        <div
          className={
            navigationHistory.length > 1 ? 'files-header' : 'files-header object-opacity'
          }
        >
          <NextIcon
            width="15"
            height="15"
            className="backIcon buttons-animations-3"
            onClick={removeLastInHistory}
          />
          {navigationHistory.map((foldername, index) => {
            return (
              <DropTarget
                types={['file-draggable']}
                handleDrop={item =>
                  handleChangeFileFolder(
                    item.payload,
                    foldername.id ? foldername.id : FOLDER_NAMES.DEFAULT
                  )
                }
                customOverStyle={{
                  background: 'rgba(195, 136, 255, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'fit-content'
                }}
              >
                <div className="location-tag">
                  {window.innerWidth > 750 ? (
                    <p>
                      {foldername.name === FOLDER_NAMES.DEFAULT
                        ? 'Home'
                        : foldername.name.length > 20
                        ? `${foldername.name.substring(0, 15)}...`
                        : foldername.name}
                    </p>
                  ) : (
                    <p>
                      {foldername.name === FOLDER_NAMES.DEFAULT
                        ? 'Home'
                        : foldername.name.length > 10
                        ? `${foldername.name.substring(0, 10)}...`
                        : foldername.name}
                    </p>
                  )}
                  {index != navigationHistory.length - 1 && (
                    <p style={{ margin: '0 5px' }}>{'>'}</p>
                  )}
                </div>
              </DropTarget>
            );
          })}
        </div>
        {navigationHistory.length === 1 && (
          <DraggableItem
            payload={homeDefaultFolder}
            type={'file-draggable'}
            className="file-container"
            style={{ margin: '0 7px' }}
            ListenNativeEvents
            responsiveDragFeedback
            containerPercentHeight={() => {
              const parentHeight = document.getElementById('files-gallery')?.offsetHeight;
              return parentHeight;
            }}
            enableOSdragging={() => setOsDragging(true)}
            disableOSdragging={() => setOsDragging(false)}
          >
            <div
              className="file-container"
              style={{
                background: fileBackground(homeDefaultFolder.mode),
                backgroundSize: 'cover',
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}
              onMouseLeave={() => setFileConfirming(null)}
            >
              <FolderComponent
                id={homeDefaultFolder.id}
                CreatingFolder={CreatingFolder}
                FolderName={homeDefaultFolder.name}
                Spinner={Spinner}
                isNew={false}
                handleSaveFolder={handleSaveFolder}
                FilterByFolder={navigationHistory[navigationHistory.length - 1]}
                folderClick={() => handleNavigateInFolders(homeDefaultFolder)}
                setCreatingFolder={setCreatingFolder}
                folderIcon={folderIcon}
                refreshAfterUpdate={refreshAfterUpdate}
                deleteFunction={() =>
                  confirmDeleteFolder(homeDefaultFolder.id, homeDefaultFolder.name)
                }
                setChangingFileLocation={setChangingFileLocation}
              />
            </div>
          </DraggableItem>
        )}
        {fileListFiltered
          .sort((prev, next) => prev.name - next.name)
          .map((file, i) => (
            <DraggableItem
              payload={file}
              type={'file-draggable'}
              className="file-container"
              style={{ margin: '0 7px' }}
              ListenNativeEvents
              responsiveDragFeedback
              containerPercentHeight={() => {
                const parentHeight =
                  document.getElementById('files-gallery')?.offsetHeight;
                return parentHeight;
              }}
              enableOSdragging={() => setOsDragging(true)}
              disableOSdragging={() => setOsDragging(false)}
            >
              <div
                key={i}
                className="file-container"
                style={{
                  background: fileBackground(file.mode),
                  backgroundSize: 'cover',
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box'
                }}
                onMouseLeave={() => setFileConfirming(null)}
              >
                {file.mode !== FOLDER_MODES.FOLDER && file.mode !== FOLDER_MODES.EXAM && (
                  <React.Fragment>
                    <div className="delete-container">
                      {fileConfirming === i ? (
                        <div
                          className="confirm"
                          onClick={() => {
                            setFileDeleting(i);
                            confirmDeleteFile(file);
                          }}
                        >
                          <span>Ready ?</span>
                        </div>
                      ) : (
                        <img
                          className="delete"
                          src="/static/icons/ban.png"
                          alt="Icon delete"
                          onClick={() => setFileConfirming(i)}
                        />
                      )}
                    </div>

                    {fileDeleting === i && (
                      <div className="loading-container" style={{ width: '100%' }}>
                        <Spinner className="bran-spinner" animation="border" />
                      </div>
                    )}
                    {fileDeleting === i && (
                      <div className="loading-container" style={{ width: '100%' }}>
                        <Spinner className="bran-spinner" animation="border" />
                      </div>
                    )}

                    <img
                      loading="lazy"
                      className="file"
                      src={file.url}
                      alt={`File ${i + 1}`}
                      onClick={() => callback(file)}
                    />
                  </React.Fragment>
                )}
                {file.mode === FOLDER_MODES.EXAM && (
                  <React.Fragment>
                    <ExamIconComponent
                      name={file.name}
                      cancelContextMenu={() => setExamMode(null)}
                      handleContextMenu={e => {
                        setAnchorPoint(e.target);
                        setExamMode(file);
                      }}
                      deleteFunction={() => confirmDeleteFile(file)}
                    />
                  </React.Fragment>
                )}
                {file.mode === FOLDER_MODES.FOLDER && (
                  <React.Fragment>
                    <FolderComponent
                      id={file.id}
                      CreatingFolder={CreatingFolder}
                      FolderName={file.name}
                      Spinner={Spinner}
                      isNew={file.isNew}
                      handleSaveFolder={handleSaveFolder}
                      FilterByFolder={navigationHistory[navigationHistory.length - 1]}
                      folderClick={() => handleNavigateInFolders(file)}
                      setCreatingFolder={setCreatingFolder}
                      folderIcon={folderIcon}
                      refreshAfterUpdate={refreshAfterUpdate}
                      deleteFunction={() => confirmDeleteFolder(file.id, file.name)}
                      setChangingFileLocation={setChangingFileLocation}
                    />
                  </React.Fragment>
                )}
              </div>
            </DraggableItem>
          ))}

        <div
          className="file-container"
          onClick={inputOpen}
          onContextMenu={addFolderToList}
        >
          <div
            className={window.classnames('add-container', { disabled: fileUploading })}
          >
            {fileUploading ? (
              <Spinner className="bran-spinner" animation="border" />
            ) : (
              <img className="add" src="/static/icons/plus.png" alt="Icono mas" />
            )}
          </div>
        </div>

        <input
          type="file"
          ref={inputFile}
          value=""
          onChange={e => saveFile(e.target.files[0])}
          style={{ display: 'none' }}
        />
        {ChangingFileLocation && (
          <div
            className="bran-loading"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              backdropFilter: 'blur(7px)'
            }}
          >
            <Spinner animation="border" />
          </div>
        )}
        {DraggingFile && (
          <div
            className="bran-loading"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              zIndex: -1
              // backdropFilter: 'blur(5px)'
            }}
          >
            <div className="dropTarget">
              <p>Drop files here for save it</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilesGallery;
