import React from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { optionVideoStyle, optionBtnStyle } from './VideoChatStyles';
import VideoActive from 'assets/video-llamada/video-active.svg';
import VideoMute from 'assets/video-llamada/video-mute.svg';
import MicroActive from 'assets/video-llamada/micro-active.svg';
import MicroMute from 'assets/video-llamada/micro-mute.svg';
import VideoExit from 'assets/video-llamada/llamada.svg';
import Plus from 'assets/video-llamada/plus.svg';
import Minus from 'assets/video-llamada/minus.svg';
import SpeakerActive from 'assets/video-llamada/speaker-active.svg';
import useDeviceDetect from 'hooks/useDeviceDetect';

const OptionVideo = ({
  movilWidth,
  isAudioMute,
  isVideoMute,
  audioMute,
  videoMute,
  handleLogout,
  localParticipant,
  onMaxWidthAndHeightVideo,
  onMinWidthAndHeightVideo,
  onMaxWidthAndHeightVideoMovil,
  isVideoScream
}) => {
  const { isMobile } = useDeviceDetect();

  const OptionVideoLocal = () => {
    return isMobile ? (
      <>
        <a css={optionBtnStyle} onTouchStart={audioMute}>
          {isAudioMute ? (
            <img src={MicroActive} alt="micro-active" className="icon-option " />
          ) : (
            <img src={MicroMute} alt="micro-active" className="icon-option " />
          )}
        </a>

        <a css={optionBtnStyle} onTouchStart={videoMute}>
          {isVideoMute ? (
            <img src={VideoActive} alt="video-activo" className="icon-option" />
          ) : (
            <img src={VideoMute} alt="video-activo" className="icon-option" />
          )}
        </a>

        <a css={optionBtnStyle} onTouchStart={() => handleLogout()}>
          <img src={VideoExit} alt="video-activo2" className="icon-option" />
        </a>

        <a css={optionBtnStyle} onTouchStart={onMaxWidthAndHeightVideo}>
          <img
            src={Plus}
            alt="video-plus"
            className="icon-option"
            id="icon-option-plus"
          />
        </a>

        <a css={optionBtnStyle} onTouchStart={onMinWidthAndHeightVideo}>
          <img src={Minus} alt="minus-activo2" className="icon-option" />
        </a>

        <a css={optionBtnStyle} onTouchStart={onMaxWidthAndHeightVideoMovil}>
          <img
            src={isVideoScream ? Plus : Minus}
            alt="video-plus"
            className="icon-option"
            id="icon-option-plus"
          />
        </a>
      </>
    ) : (
      <>
        <a css={optionBtnStyle} onClick={audioMute}>
          {isAudioMute ? (
            <img src={MicroActive} alt="micro-active" className="icon-option " />
          ) : (
            <img src={MicroMute} alt="micro-active" className="icon-option " />
          )}
        </a>

        <a css={optionBtnStyle} onClick={videoMute}>
          {isVideoMute ? (
            <img src={VideoActive} alt="video-activo" className="icon-option" />
          ) : (
            <img src={VideoMute} alt="video-activo" className="icon-option" />
          )}
        </a>

        <a css={optionBtnStyle} onClick={() => handleLogout()}>
          <img src={VideoExit} alt="video-activo2" className="icon-option" />
        </a>

        <a css={optionBtnStyle} onClick={onMaxWidthAndHeightVideo}>
          <img
            src={Plus}
            alt="video-plus"
            className="icon-option"
            id="icon-option-plus"
          />
        </a>

        <a css={optionBtnStyle} onClick={onMinWidthAndHeightVideo}>
          <img src={Minus} alt="minus-activo2" className="icon-option" />
        </a>

        <a css={optionBtnStyle} onClick={onMaxWidthAndHeightVideoMovil}>
          <img
            src={isVideoScream ? Plus : Minus}
            alt="video-plus"
            className="icon-option"
            id="icon-option-plus"
          />
        </a>
      </>
    );
  };

  const OptionVideoRemote = () => {
    return isMobile ? (
      <>
        <a css={optionBtnStyle}>
          <img src={SpeakerActive} alt="micro-active" className="icon-option " />
        </a>

        <a css={optionBtnStyle}>
          <img src={VideoActive} alt="video-activo" className="icon-option" />
        </a>

        <a css={optionBtnStyle} onTouchStart={onMaxWidthAndHeightVideoMovil}>
          <img
            src={isVideoScream ? Plus : Minus}
            alt="video-plus"
            className="icon-option"
            id="icon-option-plus"
          />
        </a>
      </>
    ) : (
      <>
        <a css={optionBtnStyle}>
          <img src={SpeakerActive} alt="micro-active" className="icon-option " />
        </a>

        <a css={optionBtnStyle}>
          <img src={VideoActive} alt="video-activo" className="icon-option" />
        </a>

        <a css={optionBtnStyle} onClick={onMaxWidthAndHeightVideo}>
          <img
            src={Plus}
            alt="video-plus"
            className="icon-option"
            id="icon-option-plus"
          />
        </a>

        <a css={optionBtnStyle} onClick={onMinWidthAndHeightVideo}>
          <img src={Minus} alt="minus-activo2" className="icon-option" />
        </a>
      </>
    );
  };

  return (
    <div css={optionVideoStyle(movilWidth)}>
      {localParticipant ? OptionVideoLocal() : OptionVideoRemote()}
    </div>
  );
};

export default OptionVideo;
