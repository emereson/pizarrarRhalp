// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { participantContent } from './VideoChatStyles';
import Room from './Room';
import VideoConectIcon from './VideoConectIcon';
import HTTP from '../../services/conn';
import Sound from '../../utils/soundConfig';
import { playSound } from '../../helpers/PlaySound';
import { useUser } from 'components/UserManagment/UserProvider';
import { VideoConferenceContext } from './VideoConferenceContext';

import { VideoEvents, VoiceStateConnect } from './enum';
import { useUserRole } from 'services/cognito.service';

/* Importing the hooks from the other files. */
import { useStateCallingTeacher } from 'components/AdminDashboard/hooks/useStateCallingTeacher';
import { useStateCallingStudent } from 'components/AdminDashboard/hooks/useStateCallingStudent';
import { useBlockCallingTeacher } from 'components/AdminDashboard/hooks/useBlockCallingTeacher';
import { useBlockCallingStudent } from 'components/AdminDashboard/hooks/useBlockCallingStudent';
import { useInitCallingTeacher } from 'components/AdminDashboard/hooks/useInitCallingTeacher';
import { useInitCallingStudent } from 'components/AdminDashboard/hooks/useInitCallingStudent';

const { DISCONECTED } = VoiceStateConnect;

const VideoChat = ({
  classRoomId,
  socket,
  model,
  isVoiceOrVideo,
  setIsVoiceOrVideo,
  teachersData,
  studentsData
}) => {
  //test for twilio-video
  const [roomName] = useState(classRoomId);
  const [token, setToken] = useState(null);
  const [animation, setAnimation] = useState(false);
  const [conected, setConected] = useState(false);
  const [callingVideo, setCallingVideo] = useState(false);
  const [stopRemoteVideoCall, setStopRemoteVideoCall] = useState(false);

  const { updateTeacherStateCalling } = useStateCallingTeacher();
  const { updateStudentStateCalling } = useStateCallingStudent();

  const { updateTeacherBlockCalling } = useBlockCallingTeacher();
  const { updateStudentBlockCalling } = useBlockCallingStudent();

  const { updateTeacherInitCalling } = useInitCallingTeacher();
  const { updateStudentInitCalling } = useInitCallingStudent();

  const { CALLING_VIDEO, EXIT_VIDEO_CALL, VIDEO_CALL_ACCEPTED, VIDEO_CALL_CANCELLED } =
    VideoEvents;

  const { user } = useUser(); //user global con session activa

  let userRole = useUserRole();

  const callingTeacherOrStudent = (user, state) => {
    switch (userRole) {
      case 'TEACHER':
        updateTeacherStateCalling(user, state);
        break;
      case 'STUDENT':
        updateStudentStateCalling(user, state);
        break;
    }
  };

  const initTeacherOrStudent = (user, state) => {
    switch (userRole) {
      case 'TEACHER':
        updateTeacherInitCalling(user, state);
        break;
      case 'STUDENT':
        updateStudentInitCalling(user, state);
        break;
    }
  };

  const blockTeacherOrStudent = (user, state) => {
    switch (userRole) {
      case 'TEACHER':
        updateTeacherBlockCalling(user, state);
        break;
      case 'STUDENT':
        updateStudentBlockCalling(user, state);
        break;
    }
  };

  useEffect(() => {
    socket.on(CALLING_VIDEO, res => {
      if (res.roomId === classRoomId) {
        console.log('evento cuando se recibe la VideoLlamada');
        setAnimation(true);
        setCallingVideo(true);
        setConected(true);
        setStopRemoteVideoCall(false);
        playSound(Sound.VideoLlamada, false, true);
        playSound(Sound.VideoLlamadaRemoto, true, false);
        setIsVoiceOrVideo(true);
      } else {
        console.log('llamada saliente!!!!');
        playSound(Sound.VideoLlamada, false, true);
        playSound(Sound.VideoLlamadaRemoto, false, true);
        setAnimation(false);
        setCallingVideo(false);
        setIsVoiceOrVideo(true);
        setAnimation(false);
        setConected(false);
        // ? It doesn't have any functionality but you can take advantage of the event
        socket.emit(VIDEO_CALL_ACCEPTED, {});
      }
    });
  }, []);

  useEffect(() => {
    socket.on(EXIT_VIDEO_CALL, res => {
      //apagamos todos lo sonido y animaciones...
      if (res.user === user.attributes.email) {
        Sound.VideoLlamadaExit.play();
        callingTeacherOrStudent(user.attributes.sub, 'onblackboard');
        setAnimation(false);
        setCallingVideo(false);
        setConected(false);
        setToken(null);
        setStopRemoteVideoCall(true);
        playSound(Sound.VideoLlamada, false, true);
        playSound(Sound.VideoLlamadaRemoto, false, true);
        setIsVoiceOrVideo(true);
        socket.emit(CALLING_VIDEO, {});
      }
    });

    socket.on(VIDEO_CALL_CANCELLED, () => {
      Sound.VideoLlamadaExit.play();
      callingTeacherOrStudent(user.attributes.sub, 'onblackboard');
      setAnimation(false);
      setCallingVideo(false);
      setConected(false);
      setToken(null);
      setStopRemoteVideoCall(true);
      playSound(Sound.VideoLlamada, false, true);
      playSound(Sound.VideoLlamadaRemoto, false, true);
      setIsVoiceOrVideo(true);
      socket.emit(CALLING_VIDEO, {});
    });

    socket.on(VIDEO_CALL_ACCEPTED, () => {
      // playSound(Sound.VideoLlamada, false, true);
      // playSound(Sound.VideoLlamadaRemoto, false, true);
    });
  }, []);

  //conect-video con twilio-video
  const getTokenVideoTwilio = async () => {
    if (callingVideo) {
      playSound(Sound.VideoLlamadaRemoto, false, true);
    } else {
      playSound(Sound.VideoLlamada, true, false);
    }

    setIsVoiceOrVideo(true);

    let username = user !== null ? user.attributes.email : 'Participante';

    try {
      const data = await HTTP.post('/token', {
        identity: username,
        room: roomName
      });

      setToken(data.data.token);
    } catch (error) {
      console.error(error);
      //en caso de que heroku no responda....
      Sound.VideoLlamadaExit.play();
      playSound(Sound.VideoLlamada, false, true);
      playSound(Sound.VideoLlamadaRemoto, false, true);
      setAnimation(false);
    }
  };

  return (
    <VideoConferenceContext.Provider
      value={{
        animation,
        callingVideo,
        conected,
        roomName,
        setIsVoiceOrVideo,
        stopRemoteVideoCall,
        token,

        // method
        getTokenVideoTwilio,
        playSound,
        setAnimation,
        setConected,
        setStopRemoteVideoCall,
        setToken
      }}
    >
      {/* isVoiceOrVideo video */}
      {isVoiceOrVideo ? <VideoConectIcon /> : ''}

      <div css={participantContent(model)}>
        {token && (
          <Room
            socket={socket}
            model={model}
            classRoomId={classRoomId}
            callingTeacherOrStudent={callingTeacherOrStudent}
            initTeacherOrStudent={initTeacherOrStudent}
            blockTeacherOrStudent={blockTeacherOrStudent}
            teachersData={teachersData}
            studentsData={studentsData}
            setAnimation={setAnimation}
            setCallingVideo={setCallingVideo}
            setStopRemoteVideoCall={setStopRemoteVideoCall}
          />
        )}
      </div>
    </VideoConferenceContext.Provider>
  );
};

export default VideoChat;
