import React, { useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

import { Animated } from 'react-animated-css';

import SatelliteBlack2 from 'assets/voice-call/in-call-remote.svg';
import './style.css';

const satelliteIcon = model => css`
  height: 25px !important;
  width: auto !important;
  margin-top: ${model ? '8px' : '20px'};
  vertical-align: middle;
  @media (max-width: 480px) {
    height: 20px !important;
  }
`;

const IconCallRemote = ({ initiateCall }) => {
  const animation = true;

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
          src={SatelliteBlack2}
          css={satelliteIcon(false)}
          onClick={() => initiateCall()}
        />
      </Animated>
    </div>
  );
};

export default IconCallRemote;
