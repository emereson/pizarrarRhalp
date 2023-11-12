// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

/** Components */
import TeacherChatRoom from './ChatWhiteBoard/teacherChatRoom';
import PublicWhiteBoardChat from './PublicWhiteBoardChat';
import ToolBar from './ToolBar';
import Canvas from './Canvas';
import BottomBar from './BottomBar';
import VoiceCall from 'components/VoiceCall/VoiceCall';
import VideoChat from 'components/VideoConference/VideoChat';
import LoadingSpinner from '../common/LoadingSpinner';
/** styles */
import './whiteboard.css';
/** hooks */
import { useSocket } from '../../providers/SocketProvider';
import { useWhiteBoard } from './WhiteBoardProvider';
import { useDispatch } from 'react-redux';
import { setClassRoom, loadWhiteBoardState } from '../../store/actions/WhiteBoardActions';
import { VoiceProvider } from 'components/VoiceCall/VoiceProvider';
import { useParams } from 'react-router-dom';
import { useUserClassRoom } from '../UserManagment/hooks/useUserClassRoom';
import { useUser } from '../UserManagment/UserProvider';
import { useUserRole } from '../../services/cognito.service';
import debounce from 'lodash.debounce';

import { LIST_STUDENTS, LIST_TEACHERS } from 'components/AdminDashboard/graphql/queries';
import constants from 'enums/constants.enum';
import { useQuery } from '@apollo/client';

const WhiteBoard = () => {
  const dispatch = useDispatch();
  const { whiteBoardSocket, createWhiteBoardSocket } = useSocket();

  const [connectionState, setConnectionState] = useState({
    isConnecting: true,
    ConnectedSuccesfully: false,
    connectionError: false
  });
  const role = useUserRole();
  const whiteBoardContext = useWhiteBoard();
  const { classRoomId } = useParams();
  const {
    setSocketId,
    setModel,
    openchat,
    setOpenChat,
    reloadChatCountDown,
    setIsAdmin,
    isAdmin,
    isVoiceOrVideo,
    setIsVoiceOrVideo,
    isDrawing
  } = whiteBoardContext;
  const {
    loading: loadingClassRoomData,
    backgroundUrl,
    iconsColor,
    classRoomName,
    isCrystalTheme,
    assignedClassRoom,
    blur
  } = useUserClassRoom();
  const { user } = useUser();
  const userRole = useUserRole();
  const [modeBlur, setModeBlur] = useState(false);

  useEffect(() => {
    async function createPrivateConnection() {
      try {
        await createWhiteBoardSocket(classRoomId);
        setConnectionState({
          isConnecting: false,
          ConnectedSuccesfully: true
        });
        dispatch(setClassRoom({ classRoomId }));
        dispatch(loadWhiteBoardState());
      } catch (error) {
        setConnectionState({
          isConnecting: false,
          ConnectedSuccesfully: false,
          connectionError: error
        });
      }
    }
    if (classRoomId) {
      createPrivateConnection();
    }
  }, []);

  useEffect(() => {
    if (whiteBoardSocket) {
      whiteBoardSocket.on('SOCKET_ID', socketId => {
        setSocketId(socketId);
      });
      //on evento del cambio de modo clasico-moderno
      whiteBoardSocket.on('GET_MODE', modowhiteboard => {
        setModel(!modowhiteboard);
      });
      whiteBoardSocket.emit('SOCKET_ID');
    }
  }, [whiteBoardSocket, setModel, setSocketId]);

  // para activar el admin que muestra el chat de portada en modo admin
  const activeAdminMode = useCallback(
    event => {
      if (event.keyCode === 27) {
        setOpenChat(!openchat);
        return setIsAdmin(true);
      }
    },
    [openchat, setIsAdmin, setOpenChat]
  );

  useEffect(() => {
    document.addEventListener('keydown', activeAdminMode, false);

    return () => {
      document.removeEventListener('keydown', activeAdminMode, false);
    };
  }, [activeAdminMode]);

  //activador del chat por los momentos
  const openChat = (open = null, toOpenFromIncomingMessage) => {
    // se activa con un onclick
    setIsAdmin(false);
    if (openchat) {
      setOpenChat(false);
    } else {
      reloadChatCountDown();
      setOpenChat(true);
    }

    if (toOpenFromIncomingMessage) setOpenChat(true);

    if (open !== null) setOpenChat(open);
  };

  const { data: teachersData } = useQuery(LIST_TEACHERS, {
    pollInterval: constants.POLL_INTERVAL
  });
  const { data: studentsData } = useQuery(LIST_STUDENTS, {
    pollInterval: constants.POLL_INTERVAL
  });

  if (connectionState.isConnecting || loadingClassRoomData) {
    return (
      <section className="container vh-100 text-center d-flex align-items-center justify-content-center">
        <LoadingSpinner></LoadingSpinner>
      </section>
    );
  }

  if (connectionState.connectionError) {
    return (
      <div className="container">
        <h1>There was a connection error</h1>
        <h2>
          {connectionState.connectionError.message
            ? connectionState.connectionError.message
            : connectionState.connectionError}
        </h2>
      </div>
    );
  }

  const customBackground = css`
    background: ${backgroundUrl
      ? `url('${backgroundUrl}') no-repeat center center fixed`
      : null};
    background-size: cover;
  `;

  return (
    <div className="whiteBoard-container">
      <div css={customBackground} className={isCrystalTheme ? 'app-model' : null}>
        <div className={`filter filterBlur${blur}`}></div>
        <div className={isCrystalTheme ? `app-model__crystal-wp ` : null}>
          <div
            className={window.classnames(
              isCrystalTheme ? `modern-model ` : 'clasic-model',
              {
                blur: modeBlur
              }
            )}
          >
            <ToolBar color={iconsColor} />
            <div
              css={css`
                z-index: ${isDrawing ? 4 : null};
              `}
              className={isCrystalTheme ? 'modern-model__canvas' : 'clasic-model__canvas'}
            >
              <VideoChat
                teachersData={teachersData?.listTeachers?.items || []}
                studentsData={studentsData?.listStudents?.items || []}
                classRoomId={classRoomId}
                socket={whiteBoardSocket}
                model={isCrystalTheme}
                isVoiceOrVideo={isVoiceOrVideo}
                setIsVoiceOrVideo={setIsVoiceOrVideo}
              />
              <Canvas
                whiteBoardContext={whiteBoardContext}
                classRoomName={classRoomName}
                isCrystalTheme={isCrystalTheme}
                color={iconsColor}
                userName={user.attributes.name}
                userRole={userRole}
                setModeBlur={setModeBlur}
              />
            </div>
            <div className={openchat ? 'showChat' : ' hiddenChat'}>
              {isAdmin ? (
                <TeacherChatRoom modelType={isCrystalTheme} />
              ) : (
                <PublicWhiteBoardChat
                  modelType={isCrystalTheme}
                  classRoomId={assignedClassRoom.classRoomId}
                  openChat={() => openChat(null, true)}
                />
              )}
            </div>

            <VoiceProvider
              classRoomId={classRoomId}
              socket={whiteBoardSocket}
              setIsVoiceOrVideo={setIsVoiceOrVideo}
              isVoiceOrVideo={isVoiceOrVideo}
            >
              <VoiceCall
                socket={whiteBoardSocket}
                classRoomId={classRoomId}
                teachersData={teachersData?.listTeachers?.items || []}
                studentsData={studentsData?.listStudents?.items || []}
                setIsVoiceOrVideo={setIsVoiceOrVideo}
                isVoiceOrVideo={isVoiceOrVideo}
              />
              <BottomBar
                setIsVoiceOrVideo={setIsVoiceOrVideo}
                isVoiceOrVideo={isVoiceOrVideo}
                color={iconsColor}
                openChat={openChat}
                openChatAdmin={null}
              />
            </VoiceProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteBoard;
