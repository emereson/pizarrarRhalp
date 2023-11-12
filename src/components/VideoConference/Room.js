import React, { useState, useEffect, useContext, Fragment } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
import { VideoConferenceContext } from './VideoConferenceContext';
import { useUser } from 'components/UserManagment/UserProvider';
import { resolverMediaError } from './Errors';

import { VideoEvents, VoiceStateConnect } from './enum';
import { GRID_DESKTOP_CONFIG } from './VideoConfigs';
import { playSound } from 'helpers/PlaySound';
import Sound from '../../utils/soundConfig';
import { useUserRole } from 'services/cognito.service';
const { CONNECTED } = VoiceStateConnect;

const Room = ({
  socket,
  model,
  callingTeacherOrStudent,
  blockTeacherOrStudent,
  initTeacherOrStudent,
  teachersData,
  studentsData,
  setAnimation,
  classRoomId,
  setCallingVideo,
  setStopRemoteVideoCall
}) => {
  const { CALLING_VIDEO, EXIT_VIDEO_CALL, VIDEO_CALL_ACCEPTED, VIDEO_CALL_CANCELLED } =
    VideoEvents;

  const {
    roomName,
    token,
    setConected,
    setToken,
    callingVideo,
    stopRemoteVideoCall,
    setIsVoiceOrVideo
  } = useContext(VideoConferenceContext);

  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const [isAudioMute, setIsAudioMute] = useState(true);
  const [isVideoMute, setIsVideoMute] = useState(true);
  const [first, setfirst] = useState(true);

  //hooks
  const { user } = useUser(); //user global con session activa

  let userRole = useUserRole();

  useEffect(() => {
    if (stopRemoteVideoCall) {
      handleLogout();
    }
  }, [stopRemoteVideoCall]);

  useEffect(() => {
    if (participants.length === 0) {
      callingTeacherOrStudent(user.attributes.sub, 'waitingVideo');
      initTeacherOrStudent(user.attributes.sub, 'active');
    } else {
      blockTeacherOrStudent(user.attributes.sub, 'toUnlock');
      callingTeacherOrStudent(user.attributes.sub, 'video');
      playSound(Sound.VideoLlamada, false, true);
    }
  }, [participants]);

  useEffect(() => {
    if (first && participants.length === 0) {
      switch (userRole.toString()) {
        case 'TEACHER':
          const teacher = teachersData.find(item => item.id === user.attributes.sub);

          blockTeacherOrStudent(user.attributes.sub, teacher.callingBlock ?? 'toUnlock');
          break;
        case 'STUDENT':
          const student = studentsData.find(item => item.id === user.attributes.sub);

          blockTeacherOrStudent(user.attributes.sub, student.callingBlock ?? 'toUnlock');
          break;
      }
    }
  }, [first, userRole, teachersData, studentsData]);

  useEffect(() => {
    const participantConnected = participant => {
      setfirst(true);
      setParticipants(prevParticipants => [...prevParticipants, participant]);

      if (user.attributes.email) {
        callingTeacherOrStudent(user.attributes.sub, 'video');
      }
    };

    const participantDisconnected = participant => {
      setfirst(false);
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
      participant.identity === user.attributes.email
        ? callingTeacherOrStudent(user.attributes.sub, 'onblackboard')
        : participants.length === 0
        ? callingTeacherOrStudent(user.attributes.sub, 'waitingVideo')
        : callingTeacherOrStudent(user.attributes.sub, 'video');

      if (participant.identity === user.attributes.email) {
        room.disconnect();
      }
    };

    Video.connect(token, GRID_DESKTOP_CONFIG(roomName)).then(
      room => {
        setRoom(room);
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        room.participants.forEach(participantConnected);

        //emit status conect local-participante
        if (room.state === CONNECTED) {
          setIsVoiceOrVideo(true);
          setConected(true);
          setAnimation(true);
          setCallingVideo(true);
          setConected(true);
          setStopRemoteVideoCall(false);
          socket.emit(CALLING_VIDEO, { roomId: classRoomId });
          callingVideo && socket.emit(VIDEO_CALL_ACCEPTED, {});
        }
      },
      error =>
        resolverMediaError(error, () => {
          setTimeout(() => {
            callingTeacherOrStudent(user.attributes.sub, 'onblackboard');
            initTeacherOrStudent(user.attributes.sub, 'InActive');
            setConected(false);
            setAnimation(false);
            setIsVoiceOrVideo(true);
            socket.emit(CALLING_VIDEO, {});
            setIsVoiceOrVideo(true);
            socket.emit(EXIT_VIDEO_CALL, {
              user: user.attributes.email,
              roomId: roomName
            });
          }, 4000);
        })
    );

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === CONNECTED) {
          currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map(
    participant => (
      setAnimation(false),
      (<Participant key={participant.sid} participant={participant} />)
    )
  );

  const audioMute = () => {
    room.localParticipant.audioTracks.forEach(publication => {
      isAudioMute ? publication.track.disable() : publication.track.enable();

      setIsAudioMute(!isAudioMute);
    });
  };

  const videoMute = () => {
    room.localParticipant.videoTracks.forEach(publication => {
      isVideoMute ? publication.track.disable() : publication.track.enable();
      setIsVideoMute(!isVideoMute);
    });
  };

  if (room) {
    console.log(
      `Connected to the Room as LocalParticipant '${room.localParticipant.identity}'`
    );

    // Log any Participants already connected to the Room
    room.participants.forEach(participant => {
      console.log(`Participant '${participant.identity}' is connected to the Room`);
      playSound(Sound.VideoLlamada, false, true);
      playSound(Sound.VideoLlamadaRemoto, false, true);
      setIsVoiceOrVideo(true);
    });

    // Log new Participants as they connect to the Room
    room.once('participantConnected', participant => {
      console.log(`Participant '${participant.identity}' has connected to the Room`);
      playSound(Sound.VideoLlamada, false, true);
      playSound(Sound.VideoLlamadaRemoto, false, true);
      setIsVoiceOrVideo(true);
    });

    // Log Participants as they disconnect from the Room
    room.once('participantDisconnected', participant => {
      console.log(`Participant '${participant.identity}' has disconnected from the Room`);
      playSound(Sound.VideoLlamada, false, true);
      playSound(Sound.VideoLlamadaRemoto, false, true);
      socket.emit(CALLING_VIDEO, {});
      setIsVoiceOrVideo(true);
    });

    room.on('participantConnected', participant => {
      console.log(`Participant connected: ${participant.identity}`);
      playSound(Sound.VideoLlamada, false, true);
      playSound(Sound.VideoLlamadaRemoto, false, true);
      setIsVoiceOrVideo(true);
    });

    room.on('participantDisconnected', participant => {
      console.log(`Participant disconnected: ${participant.identity}`);
      playSound(Sound.VideoLlamada, false, true);
      playSound(Sound.VideoLlamadaRemoto, false, true);
      socket.emit(CALLING_VIDEO, {});
      setIsVoiceOrVideo(true);
    });
  }

  //salir de la videollamada
  const handleLogout = () => {
    if (room) {
      room.localParticipant.tracks.forEach(function (trackPublication) {
        trackPublication.track.stop();
      });

      setAnimation(false);
      setCallingVideo(false);
      setToken(null);
      setConected(false);
      setIsVoiceOrVideo(true);

      playSound(Sound.VideoLlamada, false, true);
      playSound(Sound.VideoLlamadaRemoto, false, true);

      socket.emit(EXIT_VIDEO_CALL, {
        user: user.attributes.email,
        roomId: roomName
      });
      //PARA LOS USUARIO QUE NO SE HAN CONECTADO A LA VIDEOLLAMADA CON TIEMPO.
      socket.emit(VIDEO_CALL_CANCELLED, {
        user: user.attributes.email,
        roomId: roomName
      });

      socket.emit(CALLING_VIDEO, {});

      callingTeacherOrStudent(user.attributes.sub, 'onblackboard');

      room.disconnect();
    }
  };

  return (
    room && (
      <Fragment>
        <Participant
          key={room.localParticipant.sid}
          participant={room.localParticipant}
          localParticipant={true}
          isAudioMute={isAudioMute}
          audioMute={audioMute}
          isVideoMute={isVideoMute}
          videoMute={videoMute}
          handleLogout={handleLogout}
          model={model}
        />

        {remoteParticipants}
      </Fragment>
    )
  );
};

export default Room;
