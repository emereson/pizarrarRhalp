import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'twilio-video';
import VoiceParticipant from './VoiceParticipant';
import { useUser } from 'components/UserManagment/UserProvider';
import { resolverMediaError } from './Errors';
import { VoiceContext } from './VoiceProvider';
import Sound from '../../utils/soundConfig';
import { VoiceEvents, VoiceType, VoiceStateConnect } from './enum';
import { playSound } from 'helpers/PlaySound';
import { useUserRole } from 'services/cognito.service';
import { useDispatch } from 'react-redux';

const {
  TOKEN,
  ON_MICRO_MUTED,
  ON_SPEAKER_MUTED,
  STATE_LIVE_ICON,
  ON_CALL,
  INCOMING_CALL,
  SHOW_ICON,
  GUEST_CONNECTED
} = VoiceType;

const { CONNECTED } = VoiceStateConnect;

const VoiceRoom = ({
  blockTeacherOrStudent,
  callingTeacherOrStudent,
  classRoomId,
  initTeacherOrStudent,
  setIsVoiceOrVideo,
  socket,
  studentsData,
  teachersData,
  guestConnected
}) => {
  const {
    CALLING_VOICE,
    EXIT_VOICE_CALL,
    VOICE_CALL_ACCEPTED,
    VOICE_CALL_CANCELLED,
    GUEST_CONNECTED_VOICE_CALL
  } = VoiceEvents;

  const { state, dispatch } = useContext(VoiceContext);
  const { token, micMuted, inComingCall, exitCall, onSilence } = state;
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [first, setfirst] = useState(true);
  const { user } = useUser();
  const dispatchS = useDispatch();

  let userRole = useUserRole();

  useEffect(() => {
    handleLogout();
  }, [exitCall]);

  useEffect(() => {
    if (room) {
      audioMute();
    }
  }, [onSilence]);

  useEffect(() => {
    if (participants.length === 0) {
      callingTeacherOrStudent(user.attributes.sub, 'waitingAudio');
      initTeacherOrStudent(user.attributes.sub, 'active');
      dispatch({ type: ON_CALL, playload: false });
      dispatchS({ type: 'AUDIO_OR_VIDEO', playload: true });
    } else {
      initTeacherOrStudent(user.attributes.sub, 'InActive');
      playSound(Sound.VoiceCallLocal, false, true);
      callingTeacherOrStudent(user.attributes.sub, 'audio');
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
        callingTeacherOrStudent(user.attributes.sub, 'audio');
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
        ? callingTeacherOrStudent(user.attributes.sub, 'waitingAudio')
        : callingTeacherOrStudent(user.attributes.sub, 'audio');
    };

    connect(token, {
      audio: true,
      name: classRoomId,
      video: false,
      maxAudioBitrate: 16000 //For music remove this line
    }).then(
      room => {
        setRoom(room);
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);

        room.participants.forEach(participantConnected);

        if (room.state === CONNECTED) {
          socket.emit(CALLING_VOICE, { roomId: classRoomId, isAll: false });

          if (inComingCall) {
            socket.emit(VOICE_CALL_ACCEPTED, {});
          }
          if (participants.length === 0) {
            playSound(Sound.VoiceCallLocal, true, false);
          }
          if (user?.attributes?.email) setIsVoiceOrVideo(false);
          dispatch({ type: INCOMING_CALL, playload: true });
          dispatch({ type: ON_CALL, playload: false });
          dispatch({ type: SHOW_ICON, playload: false });
          // dispatch({ type: GUEST_CONNECTED, playload: false });
          dispatchS({ type: 'AUDIO_OR_VIDEO', payload: false });
        }
      },
      error =>
        resolverMediaError(error, () => {
          setTimeout(() => {
            dispatch({ type: TOKEN, playload: null });
            // dispatch({ type: INCOMING_CALL, playload: false });
            dispatch({ type: ON_CALL, playload: true });
            dispatch({ type: STATE_LIVE_ICON, playload: false });
            initTeacherOrStudent(user.attributes.sub, 'InActive');
            // setIsVoiceOrVideo(true);
            socket.emit(CALLING_VOICE, { isAll: true });
            socket.emit(EXIT_VOICE_CALL, { user: user.attributes.email });
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
  }, [classRoomId, token]);

  const remoteParticipants = participants.map(participant => (
    <VoiceParticipant
      key={participant.sid}
      participant={participant}
      localParticipant={false}
    />
  ));

  const audioMute = () => {
    room.localParticipant.audioTracks.forEach(publication => {
      micMuted ? publication.track.disable() : publication.track.enable();
      dispatch({ type: ON_MICRO_MUTED, playload: !micMuted });
    });
  };

  if (room) {
    console.log(
      `Connected to the Room as LocalParticipant '${room.localParticipant.identity}'`
    );

    // Log any Participants already connected to the Room
    room.participants.forEach(participant => {
      console.log(`Participant '${participant.identity}' is connected to the Room`);
      playSound(Sound.VoiceCallLocal, false, true);
      playSound(Sound.VoiceCallRemote, false, true);
    });

    // Log new Participants as they connect to the Room
    room.once('participantConnected', participant => {
      console.log(`Participant '${participant.identity}' has connected to the Room`);
      playSound(Sound.VoiceCallLocal, false, true);
      playSound(Sound.VoiceCallRemote, false, true);
    });

    // Log Participants as they disconnect from the Room
    room.once('participantDisconnected', participant => {
      console.log(`Participant '${participant.identity}' has disconnected from the Room`);
      playSound(Sound.VoiceCallLocal, false, true);
      playSound(Sound.VoiceCallRemote, false, true);
    });

    room.on('participantConnected', participant => {
      Sound.VoiceCallUserConnected.play();
      console.log(`Participant connected: ${participant.identity}`);
      playSound(Sound.VoiceCallLocal, false, true);
      playSound(Sound.VoiceCallRemote, false, true);
    });

    room.on('participantDisconnected', participant => {
      Sound.VoiceCallUserConnected.play();
      console.log(`Participant disconnected: ${participant.identity}`);
      if (user?.attributes?.email) {
        setIsVoiceOrVideo(false);
        dispatchS({ type: 'AUDIO_OR_VIDEO', payload: false });
      }
      console.log("'''''''''''''''''Disconnected'''''''''''''''''''");
      // socket.emit(CALLING_VOICE, {});
      // socket.emit(GUEST_CONNECTED_VOICE_CALL, {});
      playSound(Sound.VoiceCallLocal, false, true);
      playSound(Sound.VoiceCallRemote, false, true);
    });
  }

  //cuando el participante mute el micro
  const handleTrackDisabled = track => {
    track.on('disabled', () => {
      console.log('Mute Micro');
      dispatch({ type: ON_SPEAKER_MUTED, playload: true });
    });
  };

  if (room) {
    room.participants.forEach(participant => {
      participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
          handleTrackDisabled(publication.track);
        }
        publication.on('subscribed', handleTrackDisabled);
      });
    });
  }

  //cuando el participante active el micro
  const handleTrackEnabled = track => {
    track.on('enabled', () => {
      console.log('Active Micro');
      dispatch({ type: ON_SPEAKER_MUTED, playload: false });
    });
  };

  if (room) {
    room.participants.forEach(participant => {
      participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
          handleTrackEnabled(publication.track);
        }
        publication.on('subscribed', handleTrackEnabled);
      });
    });
  }

  //salir de la llamada
  const handleLogout = () => {
    if (room) {
      room.localParticipant.tracks.forEach(function (trackPublication) {
        trackPublication.track.stop();
      });

      if (participants.length === 0) {
        socket.emit(CALLING_VOICE, { isAll: true });
      } else {
        socket.emit(CALLING_VOICE, { isAll: false });
        dispatch({ type: GUEST_CONNECTED, playload: true });
      }

      if (user?.attributes?.email) {
        setIsVoiceOrVideo(true);
        dispatchS({ type: 'AUDIO_OR_VIDEO', payload: true });
      }

      console.log("'''''''''''''''''handleLogout'''''''''''''''''''");

      dispatch({ type: TOKEN, playload: null });
      playSound(Sound.VoiceCallLocal, false, true);
      playSound(Sound.VoiceCallRemote, false, true);

      socket.emit(EXIT_VOICE_CALL, {
        user: user.attributes.email,
        roomId: classRoomId
      });
      socket.emit(VOICE_CALL_CANCELLED, {
        roomId: classRoomId,
        user: user.attributes.email
      });

      callingTeacherOrStudent(user.attributes.sub, 'onblackboard');

      room.disconnect();
    }
  };

  return room ? (
    <>
      {remoteParticipants}
      <VoiceParticipant
        key={room.localParticipant.sid}
        participant={room.localParticipant}
        localParticipant={true}
        audioMute={audioMute}
        handleLogout={handleLogout}
      />
    </>
  ) : null;
};

export default React.memo(VoiceRoom);
