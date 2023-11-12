import React, { createContext, useReducer } from 'react';
import { useUser } from 'components/UserManagment/UserProvider';

import HTTP from '../../services/conn';

import { voiceInitialState, voiceReducer } from './VoiceStore';

import { VoiceEvents, VoiceType } from './enum';

const { TOKEN, STATE_LIVE_ICON, ON_CALL, SHOW_ICON } = VoiceType;

const VoiceContext = createContext({});

const VoiceProvider = ({
  classRoomId,
  socket,
  setIsVoiceOrVideo,
  children,
  isVoiceOrVideo
}) => {
  const [state, dispatch] = useReducer(voiceReducer, voiceInitialState);
  const { token } = state;
  const { user } = useUser();

  const { SILENCE_REMOTE_VOICE_CALL, DELETE_USER_VOICE_CALL } = VoiceEvents;

  const username = user !== null ? user.attributes.email : 'default';

  const initiateCall = async () => {
    try {
      if (token === null) {
        const data = await HTTP.post('/token', {
          identity: username,
          room: classRoomId
        });

        dispatch({ type: TOKEN, playload: data.data.token });

        dispatch({ type: STATE_LIVE_ICON, playload: false });

        dispatch({ type: SHOW_ICON, playload: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeCallParticipant = identity => {
    socket.emit(DELETE_USER_VOICE_CALL, {
      user: identity,
      roomId: classRoomId
    });
  };

  const silenceRemoteVoiceCall = identity => {
    socket.emit(SILENCE_REMOTE_VOICE_CALL, {
      user: identity,
      roomId: classRoomId
    });
  };

  return (
    <VoiceContext.Provider
      value={{
        state,
        dispatch,
        initiateCall,
        removeCallParticipant,
        silenceRemoteVoiceCall,
        setIsVoiceOrVideo,
        isVoiceOrVideo
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export { VoiceContext, VoiceProvider };
