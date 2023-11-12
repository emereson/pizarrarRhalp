import React, { Fragment, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../store/actions/WhiteBoardActions';
import { S3Service } from '../../../services/S3.service';
import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';
import { WhiteBoardRepository } from '../Canvas/WhiteBoardRepository';
import { v1 as uuidv1 } from 'uuid';
import { SHAPE_TYPES } from '../../../enums/whiteBoard.enum';

/* COMPONENTS */
import { ReactComponent as UploadBlack } from 'assets/whiteboard/black/upload-black.svg';
import { ReactComponent as UploadGrey } from 'assets/whiteboard/grey/upload-grey.svg';
import { ReactComponent as UploadWhite } from 'assets/whiteboard/white/upload-white.svg';
import ModalUpload from '../Gallery/ModalUpload';

import { ICONS_COLORS } from '../../../enums/constants.enum';

const s3Service = new S3Service('public');

const UploadFileTool = ({
  color,
  openChat,
  openGallery,
  setOpenGallery,
  propSetOpenGallery,
  setCanvasImage,
  notifyDrawEvent
}) => {
  const inputFile = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const { assignedClassRoom, page } = useUserClassRoom();

  const showFile = async file => {
    let url = null;
    // the file comes from the user gallery
    if (file.url) url = file.url;
    // the file comes from the user computer
    else {
      window.sessionStorage.setItem('isNewWhiteboardModification', 'true');
      try {
        const name = `whiteBoard/${
          assignedClassRoom.classRoomId
        }/page/${page}/${file.name.replace(/\s/g, '')}`;
        const { fileUrl } = await s3Service.uploadImage({ name, blob: file });
        url = fileUrl;
      } catch (error) {
        if (error.message === 'Choose an image file') {
          alert('choose an image file');
        } else {
          console.error(error);
        }
      }
    }
    const payload = {
      id: uuidv1(),
      classRoomId: assignedClassRoom.classRoomId,
      page,
      shapeType: SHAPE_TYPES.IMAGE,
      url,
      isFromGallery: file.url ? true : false
    };
    if (payload.isFromGallery) {
      Object.assign(payload, file);
    }
    const whiteBoardEvent = new WhiteBoardRepository(payload);
    whiteBoardEvent.save();

    openChat(false);
    setCanvasImage(payload);
    // notify event to all users in the classRoom
    notifyDrawEvent({ ...payload, eventType: Actions.SET_CANVAS_IMAGE });
    setOpenModal(false);
  };

  useEffect(() => {
    if (openGallery) propSetOpenGallery(true);
    return () => setOpenGallery(false);
  }, [openGallery, setOpenGallery]);

  return (
    <Fragment>
      <div
        onClick={() => {
          window.sessionStorage.setItem('imageUploadedFrom', 'device');
          inputFile.current.click();
        }}
      >
        <input
          type="file"
          ref={inputFile}
          value=""
          onChange={e => showFile(e.target.files[0])}
          style={{ display: 'none' }}
        />
        {color === ICONS_COLORS.BLACK && <UploadBlack className="page-icon-item" />}
        {color === ICONS_COLORS.WHITE && <UploadWhite className="page-icon-item" />}
        {color === ICONS_COLORS.GREY && <UploadGrey className="page-icon-item" />}
      </div>

      <ModalUpload
        openModal={openModal}
        onHide={() => {
          setOpenModal(false);
          setOpenGallery(false);
          propSetOpenGallery(false);
        }}
        inputOpen={() => {}}
        showFile={showFile}
      />
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  const { setCanvasImage, setOpenGallery, notifyDrawEvent } = Actions;

  return bindActionCreators(
    {
      setCanvasImage,
      propSetOpenGallery: setOpenGallery,
      notifyDrawEvent
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(UploadFileTool);
