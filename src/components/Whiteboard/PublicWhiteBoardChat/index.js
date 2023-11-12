import React, { useState, useEffect, Fragment, useRef, useContext } from 'react';
import { useWhiteBoard, whiteBoardContext } from '../WhiteBoardProvider';

import { useUser } from '../../UserManagment/UserProvider';
import Sound from '../ChatWhiteBoard/SoundConfig.js';

/*** COMPONENTS ***/
import Input from './input/Input';
import Containermessage from './containermessage/containermessage';
import Bell from '../ChatWhiteBoard/bell';
import Changedatausers from './containermessage/changedateusers/changedatausers';
import './PublicChat.css';
//import './containermessage/containermessage.css';
/*** ASSETS ***/
/*** ANIMACIONES ***/
import { useUserRole } from 'services/cognito.service';
import { USER_ROLES } from 'enums/constants.enum';
import { useSocket } from '../../../providers/SocketProvider';

/*** SERVICES ***/

export default function PublicWhiteBoardChat({ modelType, classRoomId, openChat }) {
  const { publicSocket: socket } = useSocket();

  const [status, setStatus] = useState(true);

  const userRole = useUserRole();

  const [menssageinit] = useState(true);

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);

  const [changedata, setChangedata] = useState(false);

  const { reloadChatCountDown } = useWhiteBoard();

  const [bell, setbell] = useState(false);

  const [statusAvatar, setStatusAvatar] = useState(
    window.sessionStorage.getItem('avatarStatus')
  );
  const { selectedTool } = useContext(whiteBoardContext);

  const ROOM_ID = classRoomId || '33'; //id de la sala

  const whiteboardTextColor = window.sessionStorage.getItem('whiteboardTextColor');
  const thisRoomID = whiteboardTextColor?.substring(0, whiteboardTextColor.indexOf(':'));
  const tcolor = whiteboardTextColor?.substring(
    whiteboardTextColor.indexOf(':') + 1,
    whiteboardTextColor.length
  );

  const [textColor, setTextColor] = useState(
    modelType
      ? thisRoomID === ROOM_ID
        ? tcolor
        : 'white'
      : thisRoomID === ROOM_ID
      ? tcolor
      : 'grey'
  );

  const { user } = useUser();

  const [userId, setUserId] = useState(null);

  const [color, setColor] = useState('');

  const [userSelected, setUserSelected] = useState({});

  const [isModeAdmin, setIsModeAdmin] = useState(null);

  const [sendPrivate, setSendPrivate] = useState(false);

  const [onPrivate, setOnPrivate] = useState(false);

  let IS_ADMIN = false;

  if (useUserRole === USER_ROLES.ADMINS) {
    IS_ADMIN = true;
  }

  useEffect(() => {
    socket.emit('whiteboard:join', ROOM_ID);

    cacheHelp();

    getAllMessages(ROOM_ID);

    if (useUserRole === USER_ROLES.ADMINS) {
      setIsModeAdmin(true);
    } else {
      setIsModeAdmin(null);
    }
  }, [ROOM_ID, socket]);

  const changeTextColor = color => {
    window.sessionStorage.setItem('whiteboardTextColor', `${ROOM_ID}:${color}`);
    if (color === 'alternado') {
      socket.emit('whiteboard:changeColor', {
        roomid: ROOM_ID,
        textColor: color
      });
      setTextColor(color);
    }

    if (!modelType) {
      if (color === 'white') {
        socket.emit('whiteboard:changeColor', {
          roomid: ROOM_ID,
          textColor: color
        });
        setTextColor('grey');
      }
    } else {
      if (color === 'white') {
        socket.emit('whiteboard:changeColor', {
          roomid: ROOM_ID,
          textColor: color
        });
        setTextColor('white');
      }
    }
  };

  //EFECTO GLOBALES DE LOS SOCKET.IO
  useEffect(() => {
    //Evento de reconect de socket
    socket.on('reconnect', function () {
      if (user !== null) {
        if (socket !== null) {
          socket.emit('whiteboard:join', ROOM_ID);
          console.log(`Reconnecting to chat room ${ROOM_ID}`);
        }
      }
    });
  }, [ROOM_ID, socket, user]);

  useEffect(() => {
    if (window.sessionStorage.getItem('avatarStatus') === 'true') {
      setStatusAvatar(true);
    } else {
      setStatusAvatar(false);
    }
  }, [window.sessionStorage.getItem('avatarStatus')]);

  //enventos globales
  useEffect(() => {
    socket.on('whiteboard:bellNotificationChange', ({ status, user_id, send_id }) => {
      setChangedata(false);
      setSendPrivate(false);
      if (
        user_id === window.sessionStorage.getItem('user_Id') ||
        send_id === window.sessionStorage.getItem('user_Id')
      ) {
        playSound(Sound.Nice_Msg_Tone_audio);
        setbell(status);
        setTimeout(() => {
          setbell(false);
        }, 3000);
      }
    });

    socket.on('whiteboard:messages', messages => {
      if (messages.messages.length > 1) {
        openChat(true);
      }
      setStatus(true);
      setMessages(messages);
      reloadChatCountDown();
    });

    socket.on('whiteboard:deletedSuccess', () => {
      getAllMessages(classRoomId);
    });

    socket.on('whiteboard:reloadingSockets', () => {
      getAllMessages(classRoomId);
    });

    socket.on('whiteboard:alert', () => {
      setStatus(true);
      getAllMessages(ROOM_ID);
    });

    socket.on('whiteboard:changeColor', textColor => {
      window.sessionStorage.setItem(
        'whiteboardTextColor',
        `${ROOM_ID}:${textColor.textColor}`
      );
      setTextColor(textColor.textColor);
    });

    socket.on('whiteboard:sendMessagePrivate', ({ recipient }) => {
      if (recipient === window.sessionStorage.getItem('user_Id')) {
        //on message private
        playSound(Sound.messageSound_audio);
        setOnPrivate(true);
      }
    });
  }, [ROOM_ID, classRoomId, openChat, socket]);

  //evento del cambio de color
  useEffect(() => {
    //evento de prueba para el modo de color clasico moderno
    if (!modelType) {
      if (tcolor === 'white') setTextColor('grey');
      else setTextColor(tcolor);
    } else {
      setTextColor(thisRoomID === ROOM_ID ? tcolor : 'white');
    }
  }, [modelType]);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      playSound(Sound.message_send_audio);

      let newMessage = {};
      //verificamos si es mensaje privado
      if (sendPrivate && userSelected.id) {
        //mesaje privado...
        newMessage = {
          autorid: userId,
          name: user !== null ? user.attributes.name : 'Participante',
          roomid: ROOM_ID,
          message: message,
          color: color,
          private: true,
          recipient: userSelected.id,
          isAdmin: user !== null && IS_ADMIN ? true : false,
          avatarStatus: statusAvatar,
          avatar:
            window.sessionStorage.getItem('avatar') !== ''
              ? window.sessionStorage.getItem('avatar')
              : null
        };
      } else {
        //mensaje publico
        newMessage = {
          autorid: userId,
          name: user !== null ? user.attributes.name : 'Participante',
          roomid: ROOM_ID,
          message: message,
          color: color,
          isAdmin: user !== null && IS_ADMIN ? true : false,
          avatarStatus: statusAvatar,
          avatar:
            window.sessionStorage.getItem('avatar') !== ''
              ? window.sessionStorage.getItem('avatar')
              : null
        };
      }

      if (userRole === USER_ROLES.TEACHERS) {
        newMessage = {
          ...newMessage,
          isAdmin: true
        };
      }

      socket.emit('whiteboard:sendMessage', newMessage);
      socket.emit('whiteboard:activeSockets', { roomid: ROOM_ID });

      getAllMessages(ROOM_ID);

      //limpiamos los estado...
      setMessage('');
      setUserSelected({});
      setSendPrivate(false);
      getAllMessages();
    }
  };

  const cambiarDatos = e => {
    e.preventDefault();
    if (e) {
      //APAGAMOS LOS DEMAS EVENTOS DE NOTIFICACIONES
      setChangedata(!changedata);
    }
  };

  const setImageurl = image => {
    window.sessionStorage.setItem('avatar', image);

    socket.emit('whiteboard:uploadimage', {
      url: image,
      roomid: ROOM_ID,
      userId: userId
    });

    setStatusAvatar(true);
  };

  const avatarStatus = status => {
    window.sessionStorage.setItem('avatarStatus', status);
    setStatusAvatar(status);
    socket.emit('whiteboard:avatarStatus', {
      status: status,
      roomid: ROOM_ID,
      userId: userId
    });
  };

  const setMessageAndTyping = value => {
    setMessage(value);
  };

  const getAllMessages = roomid => {
    socket.emit('whiteboard:messages', roomid);
    socket.on('whiteboard:messages', messages => {
      setMessages(messages);
    });
  };

  const generarNuevoColor = () => {
    let simbolos = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color = color + simbolos[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  const playSound = audioFile => {
    audioFile.play();
  };

  const cacheHelp = () => {
    if (
      window.sessionStorage.getItem('color') !== null ||
      window.sessionStorage.getItem('user_Id') !== null
    ) {
      setColor(window.sessionStorage.getItem('color'));
      setUserId(window.sessionStorage.getItem('user_Id'));
      socket.emit('whiteboard:join', ROOM_ID);
    } else {
      let color = generarNuevoColor();
      //id del user logueado en la pizarra
      let user_id = user.attributes.email;
      setColor(color);
      setUserId(user_id);
      window.sessionStorage.setItem('user_Id', user_id);
      window.sessionStorage.setItem('color', color);
    }
  };

  const bellNotification = id => {
    socket.emit('whiteboard:bellNotification', {
      status: true,
      roomid: ROOM_ID,
      userId: id,
      send_id: window.sessionStorage.getItem('user_Id')
    });
  };

  const setUserMessagePrivate = (userSelect = null, nameUser = null) => {
    if (userSelect) {
      playSound(Sound.Changer_audio);
      setUserSelected({
        id: userSelect,
        name: nameUser
      });
      setSendPrivate(!sendPrivate);
      setOnPrivate(!onPrivate);
    }
  };

  const whiteboardChatRef = useRef(null);
  useEffect(() => {
    if (selectedTool === 'POINTER') {
      whiteboardChatRef.current.style.zIndex = 1;
    } else {
      whiteboardChatRef.current.style.zIndex = -1;
    }
  }, [selectedTool]);
  return (
    <Fragment>
      <div
        ref={whiteboardChatRef}
        className={
          modelType
            ? 'whiteboard-chat-public-container-wp'
            : 'whiteboard-chat-public-clasico-container-wp'
        }
      >
        <div className="wp-chat-conten-1">
          <div className="messages-wp">
            {status ? (
              <Containermessage
                bell={bell}
                bellNotification={bellNotification}
                avatarStatus={avatarStatus}
                setImageurl={setImageurl}
                setChangedata={e => cambiarDatos(e)}
                changedata={changedata}
                visitors={messages}
                statusAvatar={statusAvatar}
                changeTextColor={changeTextColor}
                textColor={textColor}
                isModeAdmin={isModeAdmin}
                onPrivate={onPrivate}
                setUserMessagePrivate={setUserMessagePrivate}
              />
            ) : null}
          </div>
        </div>
        <div className="wp-chat-conten-2">
          {bell ? <Bell /> : null}
          {changedata ? (
            <div className="chagendata-w">
              <Changedatausers
                changeTextColor={changeTextColor}
                avatarStatus={avatarStatus}
                setImageurl={setImageurl}
                classRoomId={classRoomId}
                setChangedata={setChangedata}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="wp-chat-conten-3">
        {menssageinit ? (
          <Input
            message={message}
            setMessage={setMessageAndTyping}
            sendMessage={sendMessage}
            modelType={modelType}
            name={userSelected.name}
            onPrivate={sendPrivate}
          />
        ) : null}
      </div>
    </Fragment>
  );
}
