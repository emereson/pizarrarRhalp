import React, { useContext } from 'react';

import { Animated } from 'react-animated-css';
import { VoiceContext } from '../../VoiceProvider';
import Gueste from 'assets/voice-call/connected.svg';

import './styles.css';

export const IconGuestConnected = props => {
  const { state } = useContext(VoiceContext);
  const { guestConnected } = state;

  return (
    <div className="itemCallConnected">
      <Animated
        animationIn="fadeInDown"
        animationOut="zoomOutDown"
        animationInDuration={800}
        animationOutDuration={800}
        isVisible={true}
      >
        <div style={{ display: 'grid', rowGap: '10px', marginTop: '9px' }}>
          <img src={Gueste} />
          <b style={{ fontSize: '.9rem', color: 'darkgrey' }}>{'Get connected'}</b>
        </div>
      </Animated>
    </div>
  );
};
