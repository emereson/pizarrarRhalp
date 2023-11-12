import React, { useState, useEffect, useRef, useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

import { VoiceIconParticipant } from './VoiceIconParticipant';
import { VoiceContext } from './VoiceProvider';

const voiceCallContainer = css`
  height: 30px;
  top: 5px;
  cursor: pointer;
  box-sizing: border-box;
  z-index: 999;
  right: 0px;
  display: flex;
  min-width: 40px;
  margin: 10px;
`;

const VoiceParticipant = ({ participant, localParticipant, audioMute, handleLogout }) => {
  const { state } = useContext(VoiceContext);
  const { micMuted, speakerMuted } = state;

  const [audioTracks, setAudioTracks] = useState([]);
  const audioRef = useRef();

  const trackpubsToTracks = trackMap =>
    Array.from(trackMap.values())
      .map(publication => publication.track)
      .filter(track => track !== null);

  useEffect(() => {
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = track => {
      if (track.kind === 'audio') {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'audio') {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div css={voiceCallContainer}>
      <VoiceIconParticipant
        identity={participant.identity}
        micMuted={micMuted}
        speakerMuted={speakerMuted}
        localParticipant={localParticipant}
        audioMute={audioMute}
        handleLogout={handleLogout}
      />
      <audio ref={audioRef} autoPlay={true} />
    </div>
  );
};

export default VoiceParticipant;
