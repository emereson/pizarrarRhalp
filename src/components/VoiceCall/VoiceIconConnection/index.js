import React, { useContext } from 'react';
import IconCallRemote from './iconCallRemote';
import { VoiceContext } from '../VoiceProvider';

const VoiceConectIcon = () => {
  const { state, initiateCall } = useContext(VoiceContext);
  const { onCall, inComingCall, showIcon } = state;

  if (onCall) {
    if (inComingCall) {
      return <IconCallRemote initiateCall={initiateCall} showIcon={showIcon} />;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default VoiceConectIcon;
