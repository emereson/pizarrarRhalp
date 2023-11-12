import React, { useState, useEffect, useRef, useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import OptionVideo from './OptionVideo';
import Draggable from 'react-draggable';
//import './room-css.css';
import {
  participantStyleModern,
  participantStyleClasic,
  translate
} from './VideoChatStyles';
//import { WhiteBoardContext } from 'components/Whiteboard/whiteBoard.context';

import useDeviceDetect from 'hooks/useDeviceDetect';

const Participant = ({
  participant,
  localParticipant,
  isAudioMute,
  isVideoMute,
  audioMute,
  videoMute,
  handleLogout,
  model
}) => {
  //contexto global
  //const { model } = useContext(WhiteBoardContext);
  //const model = true;
  const { isMobile } = useDeviceDetect();
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const [width, setWidth] = useState('220px');
  const [height, setHeight] = useState('165px');
  const [margin, setMargin] = useState(true);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isVideoScream, setIsVideoScream] = useState(true);
  const [couter, setCouter] = useState(0);
  const [position, setPosition] = useState(null);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = trackMap =>
    Array.from(trackMap.values())
      .map(publication => publication.track)
      .filter(track => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else if (track.kind === 'audio') {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else if (track.kind === 'audio') {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  //TODO: MEJORAR
  useEffect(() => {
    switch (couter) {
      case 1:
        setWidth('396px'); //25%
        setHeight('297.7px'); //35.63 + 28.5
        break;
      case 2:
        setWidth('594px'); //75%
        setHeight('445.5px'); //49.88 + 28.5
        break;
      case 3:
        setWidth('90%'); //100%
        setHeight('90%');
        setMargin(false);
        setIsDraggable(false);
        break;
      default:
        setWidth('220px'); //75%
        setHeight('165.5px');
    }
  }, [couter]);

  //aumentar de tamaño la camara
  const onMaxWidthAndHeightVideo = () => {
    if (couter < 3) setCouter(couter + 1);
  };
  const onMinWidthAndHeightVideo = () => {
    if (couter > 0) setCouter(couter - 1);
  };

  const onDragFun = () => {
    setIsDraggable(true);
    setMargin(false);
  };

  const onDragStopFun = () => {
    if (isDraggable) {
      setIsDraggable(false);
    }
  };

  const onMaxWidthAndHeightVideoMovil = () => {
    if (isVideoScream) {
      setWidth('90%');
      setHeight('90%');
      setIsVideoScream(false);
      setIsDraggable(false);
    } else {
      setWidth('135px');
      setHeight('115px');
      setIsVideoScream(true);
    }
  };

  return (
    <Draggable
      disabled={isDraggable}
      bounds="parent"
      onDrag={onDragFun}
      onStop={onDragStopFun}
    >
      <div
        css={
          model
            ? participantStyleModern(width, height, margin)
            : participantStyleClasic(width, height, margin)
        }
      >
        <video ref={videoRef} autoPlay={true} />
        <audio ref={audioRef} autoPlay={true} />

        <OptionVideo
          movilWidth={width}
          isVideoScream={isVideoScream}
          isAudioMute={isAudioMute}
          isVideoMute={isVideoMute}
          audioMute={audioMute}
          videoMute={videoMute}
          handleLogout={handleLogout}
          localParticipant={localParticipant}
          onMaxWidthAndHeightVideo={onMaxWidthAndHeightVideo}
          onMinWidthAndHeightVideo={onMinWidthAndHeightVideo}
          onMaxWidthAndHeightVideoMovil={onMaxWidthAndHeightVideoMovil}
        />
      </div>
    </Draggable>
  );
};
export default Participant;
