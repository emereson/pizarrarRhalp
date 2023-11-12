import React, { useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

import { Animated } from 'react-animated-css';
import SatelliteBlack from 'assets/voice-call/on-call-local.svg';

import './style.css';
import '../../styleCall.css';

const satelliteIcon = model => css`
  height: 25px !important;
  width: auto !important;
  margin-top: ${model ? '8px' : '20px'};
  margin-right: 10px;
  vertical-align: middle;
  @media (max-width: 480px) {
    height: 20px !important;
  }
`;

const IconCallLocal = () => {
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
        <img src={SatelliteBlack} css={satelliteIcon(false)} />
      </Animated>
    </div>
  );
};

export default IconCallLocal;
