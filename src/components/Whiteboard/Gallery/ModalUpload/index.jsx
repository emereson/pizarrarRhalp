import React, { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import './ModalUpload.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setOpenGallery } from '../../../../store/actions/WhiteBoardActions';

/* COMPONENTS */
import FilesGallery from '../FilesGallery';
import { DndProvider } from 'react-dnd';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; // or any other pipeline
import MultiBackend from 'react-dnd-multi-backend';
import CustomModal from 'components/Whiteboard/components/CustomModalPositioning/CustomModal';

const ModalUpload = ({
  openModal,
  onHide,
  inputOpen,
  showFile,
  openGallery,
  setOpenGallery
}) => {
  const mountWhiteboard = file => {
    window.sessionStorage.setItem('isNewWhiteboardModification', 'false');
    window.sessionStorage.setItem('currentFileLocation', file.currentFolder);
    showFile(file);
    onHide();
  };

  return (
    <React.Fragment>
      <CustomModal
        open={openGallery}
        dismiss={onHide}
        allowDropContext
        typesOfDraggables={['file-draggable']}
        callback={mountWhiteboard}
      >
        {openGallery && (
          <FilesGallery
            eventCallback={mountWhiteboard}
            openGallery={openGallery}
            setOpenGallery={() => setOpenGallery(false)}
          />
        )}
      </CustomModal>
      {openModal && (
        <Modal
          className={window.classnames('modal-save')}
          show={openModal}
          onHide={onHide}
          backdrop={true}
          aria-label="contained-modal-title-vcenter"
          centered
        >
          <div
            className="saving-image-branak-from-gallery"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '106%'
            }}
          >
            <button
              className="saving-image-branak-from-gallery-btns color-2"
              style={{ fontSize: 18.5, borderRadius: '8px' }}
              onClick={() => inputOpen()}
            >
              <p style={{ margin: '0' }}>Upload from your device</p>
            </button>

            <button
              className="saving-image-branak-from-gallery-btns color-2"
              style={{ fontSize: 18.5, borderRadius: '8px' }}
              onClick={() => setOpenGallery(true)}
            >
              <p style={{ margin: '0' }}>Upload from Branak</p>
            </button>

            {/* TODO: add text and action */}
            {/* This button, for now will be commented because his purpose is not defined. */}
            {/* <button className="bran-btn">
              <p>
                3er Boton <br />
                para mostrar slider
              </p>
            </button> */}
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({ whiteBoard }) => ({
  openGallery: whiteBoard.openGallery
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setOpenGallery }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpload);
