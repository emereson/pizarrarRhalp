import React, { useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { Animated } from 'react-animated-css';
import { VoiceContext } from '../VoiceProvider';
import Mic from 'assets/voice-call/micro.svg';
import Speaker from 'assets/voice-call/speaker.svg';
import MicMuted from 'assets/voice-call/micro-mute.svg';
import exitCall from 'assets/voice-call/exit-call.svg';
import SpeakerMuted from 'assets/voice-call/speaker-mute.svg';

import './styles.css';

const itemCall = css`
  height: 40px !important;
  width: 40px !important;
  background: tomato;
  text-align: center;
  img {
    height: 26px !important;
    vertical-align: middle;
  }
`;

export const VoiceIconParticipant = props => {
  const { silenceRemoteVoiceCall, removeCallParticipant } = useContext(VoiceContext);

  const { micMuted, identity, handleLogout, localParticipant, audioMute, speakerMuted } =
    props;

  const participant = localParticipant => {
    if (localParticipant) {
      return (
        <>
          <div className="itemCall cbutton--effect-ivana">
            <Animated
              animationIn="fadeInDown"
              animationOut="zoomOutDown"
              animationInDuration={800}
              animationOutDuration={800}
              isVisible={true}
            >
              <img src={micMuted ? Mic : MicMuted} onClick={() => audioMute()} />
              {micMuted ? '' : <b>{'muted'}</b>}
            </Animated>
          </div>
        </>
      );
    } else {
      return (
        <div className="itemCall cbutton--effect-stoja">
          <Animated
            animationIn="fadeInDown"
            animationOut="zoomOutDown"
            animationInDuration={800}
            animationOutDuration={800}
            isVisible={true}
          >
            <img
              src={speakerMuted ? SpeakerMuted : Speaker}
              onClick={() => silenceRemoteVoiceCall(identity)}
              onDoubleClick={() => removeCallParticipant(identity)}
            />
            {speakerMuted ? <b>{'self muted'}</b> : ''}
          </Animated>
        </div>
      );
    }
  };

  return participant(localParticipant);
};
