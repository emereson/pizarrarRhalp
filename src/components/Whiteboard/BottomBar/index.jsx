import React, { Fragment, useState, useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import './styles.css';

import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';

import LockTool from './LockTool';
import PageLeftTool from './PageLeftTool';
import PageRightTool from './PageRightTool';
import UploadFileTool from './UploadFileTool';
import ChangeBackgroundTool from './ChangeBackgroundTool';
import FilesTool from './FilesTool';
import IconsColorTool from './IconsColorTool';
import WhiteBoardThemeTool from './WhiteBoardThemeTool';
import SplitScreenTool from './SplitScreenTool';
import BookingTool from './BookingTool';
import ChatOpenerTool from './ChatOpenerTool';
import VoiceCallTool from './VoiceCallTool';
import DigitalBookAccess from './DigitalBookAccess';

const BottomBar = props => {
  const { isDisabledAndStudent, isCrystalTheme } = useUserClassRoom();
  const [openGallery, setOpenGallery] = useState(false);
  const { setIsVoiceOrVideo, isVoiceOrVideo } = props;
  const icons = () => {
    return (
      <Fragment>
        <PageLeftTool color={props.color} />

        <UploadFileTool
          color={props.color}
          openChat={props.openChat}
          openGallery={openGallery}
          setOpenGallery={setOpenGallery}
        />

        <FilesTool color={props.color} onClick={() => setOpenGallery(true)} />

        <VoiceCallTool
          color={props.color}
          setIsVoiceOrVideo={setIsVoiceOrVideo}
          isVoiceOrVideo={isVoiceOrVideo}
        />

        <LockTool color={props.color} />

        <IconsColorTool color={props.color} onClick={() => props.changeModeColor()} />

        <ChangeBackgroundTool color={props.color} />

        <WhiteBoardThemeTool color={props.color} />

        <BookingTool color={props.color} />

        <DigitalBookAccess color={props.color} />

        <ChatOpenerTool onClick={() => props.openChat()} color={props.color} />

        <PageRightTool color={props.color} />
      </Fragment>
    );
  };

  if (isDisabledAndStudent) {
    return null;
  }

  return (
    <div
      className={isCrystalTheme ? 'modern-model__page-icon' : 'clasic-model__page-icon'}
    >
      {icons()}
    </div>
  );
};

export default BottomBar;
