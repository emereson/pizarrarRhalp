import React, { useContext, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useUserRole } from 'services/cognito.service';
import VoiceConectIcon from './VoiceIconConnection';
import { VoiceContext } from './VoiceProvider';

import { useUser } from 'components/UserManagment/UserProvider';
import VoiceRoom from './VoiceRoom';
import Sound from '../../utils/soundConfig';
import { playSound } from '../../helpers/PlaySound';
import { IconGuestConnected } from './VoiceIconConnection/iconGuestConnected';
import { VoiceEvents, VoiceType } from './enum';

import { useStateCallingTeacher } from 'components/AdminDashboard/hooks/useStateCallingTeacher';
import { useStateCallingStudent } from 'components/AdminDashboard/hooks/useStateCallingStudent';
import { useBlockCallingTeacher } from 'components/AdminDashboard/hooks/useBlockCallingTeacher';
import { useBlockCallingStudent } from 'components/AdminDashboard/hooks/useBlockCallingStudent';
import { useInitCallingTeacher } from 'components/AdminDashboard/hooks/useInitCallingTeacher';
import { useInitCallingStudent } from 'components/AdminDashboard/hooks/useInitCallingStudent';

const {
  ON_SILENCE_REMOTE,
  STATE_LIVE_ICON,
  ON_CALL,
  INCOMING_CALL,
  SHOW_ICON,
  GUEST_CONNECTED,
  EXIT_CALL
} = VoiceType;

const participantContent = css`
  z-index: 1;
  position: relative;
  height: 40px;
  flex-wrap: nowrap;
  display: flex;
  align-content: space-between;
  background-color: transparent;
  -moz-box-pack: end;
  justify-content: flex-end;
  padding-right: 10px;
`;

const VoiceCall = ({
  socket,
  classRoomId,
  teachersData,
  studentsData,
  setIsVoiceOrVideo,
  isVoiceOrVideo
}) => {
  const {
    CALLING_VOICE,
    EXIT_VOICE_CALL,
    VOICE_CALL_ACCEPTED,
    VOICE_CALL_CANCELLED,
    SILENCE_REMOTE_VOICE_CALL,
    DELETE_USER_VOICE_CALL,
    GUEST_CONNECTED_VOICE_CALL
  } = VoiceEvents;

  const { state, dispatch } = useContext(VoiceContext);
  const { token, exitCall, onSilence, guestConnected } = state;

  const { updateTeacherStateCalling } = useStateCallingTeacher();
  const { updateStudentStateCalling } = useStateCallingStudent();

  const { updateTeacherBlockCalling } = useBlockCallingTeacher();
  const { updateStudentBlockCalling } = useBlockCallingStudent();

  const { updateTeacherInitCalling } = useInitCallingTeacher();
  const { updateStudentInitCalling } = useInitCallingStudent();

  const { user } = useUser();

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
    socket.on(CALLING_VOICE, res => {
      if (res.roomId === classRoomId) {
        console.log('llamada entrante!!!!');
        dispatch({ type: INCOMING_CALL, playload: true });
        dispatch({ type: SHOW_ICON, playload: true });
        dispatch({ type: STATE_LIVE_ICON, playload: false });
        playSound(Sound.VoiceCallLocal, false, true);
        playSound(Sound.VoiceCallRemote, true, false);
        if (user?.attributes?.email) setIsVoiceOrVideo(false);
      } else {
        if (!isVoiceOrVideo) {
          dispatch({ type: GUEST_CONNECTED, playload: true });
          dispatch({ type: SHOW_ICON, playload: true });
          dispatch({ type: ON_CALL, playload: false });
          if (user?.attributes?.email) setIsVoiceOrVideo(false);
        } else {
          if (res.isAll) dispatch({ type: GUEST_CONNECTED, playload: false });
          dispatch({ type: STATE_LIVE_ICON, playload: true });
          dispatch({ type: ON_CALL, playload: true });
          dispatch({ type: INCOMING_CALL, playload: false });
          if (user?.attributes?.email) setIsVoiceOrVideo(true);
        }

        playSound(Sound.VoiceCallLocal, false, true);
        playSound(Sound.VoiceCallRemote, false, true);

        // ? It doesn't have any functionality but you can take advantage of the event
        socket.emit(VOICE_CALL_ACCEPTED, {});
      }
    });

    socket.on(EXIT_VOICE_CALL, res => {
      if (res.user === user.attributes.email) {
        callingTeacherOrStudent(user.attributes.sub, 'onblackboard');
        initTeacherOrStudent(user.attributes.sub, 'InActive');
        Sound.VideoLlamadaExit.play();
        playSound(Sound.VoiceCallLocal, false, true);
        playSound(Sound.VoiceCallRemote, false, true);
        dispatch({ type: ON_CALL, playload: true });
        // dispatch({ type: INCOMING_CALL, playload: false });
        dispatch({ type: STATE_LIVE_ICON, playload: true });
        // setIsVoiceOrVideo(true);
        socket.emit(CALLING_VOICE, {});
      } else {
        dispatch({ type: STATE_LIVE_ICON, playload: false });
      }
    });

    socket.on(VOICE_CALL_CANCELLED, res => {
      if (res.user === user.attributes.email) {
        Sound.VideoLlamadaExit.play();
        playSound(Sound.VoiceCallLocal, false, true);
        playSound(Sound.VoiceCallRemote, false, true);

        console.log('VOICE_CALL_CANCELLED FOR USER....');

        dispatch({ type: ON_CALL, playload: true });
        // dispatch({ type: INCOMING_CALL, playload: false });
        dispatch({ type: STATE_LIVE_ICON, playload: true });
        // setIsVoiceOrVideo(true);
        initTeacherOrStudent(user.attributes.sub, 'InActive');
        callingTeacherOrStudent(user.attributes.sub, 'onblackboard');
        socket.emit(CALLING_VOICE, {});
      }
    });

    socket.on(VOICE_CALL_ACCEPTED, () => {
      // playSound(Sound.VoiceCallLocal, false, true);
      // playSound(Sound.VoiceCallRemote, false, true);
    });

    socket.on(DELETE_USER_VOICE_CALL, res => {
      if (res.user === user.attributes.email && res.roomId === classRoomId) {
        dispatch({ type: EXIT_CALL, playload: !exitCall });
      }
    });

    socket.on(SILENCE_REMOTE_VOICE_CALL, res => {
      if (res.user === user.attributes.email && res.roomId === classRoomId) {
        dispatch({ type: ON_SILENCE_REMOTE, playload: !onSilence });
      }
    });

    socket.on(GUEST_CONNECTED_VOICE_CALL, () => {
      console.log('GUEST CONNECTED ' + guestConnected);
      dispatch({ type: ON_CALL, playload: false });
    });
  }, []);
  return (
    <>
      <div css={participantContent}>
        {guestConnected ? <IconGuestConnected /> : ''}

        {/* isVoiceOrVideo audio */}
        {isVoiceOrVideo ? '' : <VoiceConectIcon />}

        {token && (
          <VoiceRoom
            socket={socket}
            classRoomId={classRoomId}
            callingTeacherOrStudent={callingTeacherOrStudent}
            blockTeacherOrStudent={blockTeacherOrStudent}
            initTeacherOrStudent={initTeacherOrStudent}
            setIsVoiceOrVideo={setIsVoiceOrVideo}
            isVoiceOrVideo={isVoiceOrVideo}
            teachersData={teachersData}
            studentsData={studentsData}
            guestConnected={guestConnected}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(VoiceCall);
