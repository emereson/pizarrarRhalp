import React, { useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
//import { WhiteBoardContext } from 'components/Whiteboard/whiteBoard.context';
import { VideoConferenceContext } from '../VideoConferenceContext';
import { Animated } from 'react-animated-css';

import SatelliteBlack from 'assets/whiteboard/satellite.svg';

import './style.css';

const satelliteIcon = model => css`
  height: 25px !important;
  width: auto !important;
  margin-top: ${model ? '8px' : '10px'};

  @media (max-width: 480px) {
    height: 20px !important;
  }
`;

const SatelliteIcon = () => {
  //contexto global
  //const { model } = useContext(WhiteBoardContext);
  const model = true;
  const { animation, setStopRemoteVideoCall } = useContext(VideoConferenceContext);

  return (
    <div
      className={
        animation ? 'satellite-container cbutton--effect-stoja' : 'satellite-container'
      }
    >
      <p className="satellite-p" style={{ color: 'black' }}>
        {' '}
      </p>
      <Animated
        animationIn="fadeInDown"
        animationOut="zoomOutDown"
        animationInDuration={800}
        animationOutDuration={800}
        isVisible={true}
      >
        <img
          src={SatelliteBlack}
          css={satelliteIcon(model)}
          onClick={() => setStopRemoteVideoCall(true)}
        />
      </Animated>
    </div>
  );
};

export default SatelliteIcon;
