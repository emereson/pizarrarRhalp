//COMPONETE QUE MUESTRA EL CHAT QUE
//SERA PRIVADO SOLO PERSONAL AUTORIZADO...

import React, { useState, useEffect, Fragment, useCallback } from 'react';
import InputLogin from '../inputLogin/inputLogin';
import Input from '../input/Input';
//import './styles.css'
import '../ChatWhiteboard.css';
import '../containermessage/containermessage.css';
import Typing from '../typing';
import Containermessage from '../containermessage/containermessage';
import Changedatausers from '../containermessage/changedateusers/changedatausers';
import { useSpring, animated } from 'react-spring';

//HOOKS PARA CUANDO NO HAY ACTIVAD EN EL CHAT
import { useIdleTimer } from 'react-idle-timer';

import VisitorsInit from '../visitorsinit/visitorsinit';
import Bell from '../bell';

import { useSocket } from '../../../../providers/SocketProvider';

import Sound from '../SoundConfig.js';

const TeacherChatRoom = ({ modelType }) => {
  const { publicSocket: socket } = useSocket();
  const [admin, setAdmin] = useState('');
  const [admin_chatinit, setAdminChatinit] = useState(true);
  const [admin_menssageinit, setAdminMenssageinit] = useState(false);
  const [admin_status, setAdminStatus] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [usersConectToChat, setUsersConectToChat] = useState({ users: [] });
  const [userSelected, setUserSelected] = useState('');
  const [admin_changedata, setAdminChangedata] = useState(false);
  const [ownerMode, setOwnerMode] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingName, setIsTypingName] = useState('');
  const [bell, setbell] = useState(false);
  const [textColor, setTextColor] = useState('white');
  const props = useSpring({
    opacity: admin_changedata ? 1 : 0
  });

  const playSound = (audioFile, cicle = false, stop = false) => {
    if (stop) {
      audioFile.pause();
      audioFile.currentTime = 0;
    } else {
      audioFile.loop = cicle;
      audioFile.play();
    }
  };

  const getAllMessages = useCallback(client_room_id => {
    //emitimos la sala para optener mensajes
    socket.emit('chat:messages', client_room_id);
    //optenemos todos los mensajes disponibles del la sala
    socket.on('chat:messages', messages => {
      setMessages(messages);
    });
  });

  //test de inactividad onfiguracion
  const sinActividad = event => {
    //activeColorChat(false);
  };

  const handleOnActive = event => {
    if (window.sessionStorage.getItem('admin_id') !== null) {
      if (socket !== null) {
        if (userSelected) {
          socket.emit('join', userSelected);
        } else {
          socket.emit('join', admin);
        }
      }
    }
  };

  useIdleTimer({
    timeout: 120000,
    onIdle: sinActividad,
    onActive: handleOnActive,
    debounce: 500
  });

  const clickEffect = e => {
    playSound(Sound.chat_hidden_audio);
    if (admin_status) {
      //activeColorChat(true);
      setAdminMenssageinit(!admin_menssageinit);
    } else if (!admin_status) {
      // activeColorChat(false);
    }
  };

  //test de conexion socket
  useEffect(() => {
    socket.on('reconnection', function () {
      if (userSelected) {
        socket.emit('join', userSelected);
      } else {
        socket.emit('join', admin);
      }
    });
  }, [socket]);

  //activa la carga de usuarios del chat conectados
  useEffect(() => {
    if (ownerMode) {
      if (window.sessionStorage.getItem('admin_id') !== null) {
        let data = window.sessionStorage.getItem('admin_id');

        setAdmin(data.replace(/['"]+/g, ''));
      } else {
        initAdmin();
      }
      socket.emit('ownerMode', {
        name: ''
      });

      setAdminChatinit(false);

      setAdminMenssageinit(!admin_menssageinit);

      socket.on('outputAllDatabase2', data => {
        if (data.newUser) {
          playSound(Sound.first_message_audio, true);
        }
        setUsersConectToChat({ ...usersConectToChat, users: data.users });

        //COMPROBAMOS SI HAY NUEVO USUARIO PARA ACTIVAR EL EVENTO DE ANCHO MINIMO Y MAXINO DE ICONS
        if (data.users.length > 1) {
          //newPositionH(true);
        } else {
          //newPositionH(false);
          //activeColorChat(false);
        }
      });
    }
  }, [ownerMode, socket]);

  useEffect(() => {
    //evento de prueba para el modo de color clasico moderno
    if (!modelType) {
      setTextColor('grey');
    } else {
      setTextColor('white');
    }
  }, [modelType]);

  //EVENTOS GLOBALES
  useEffect(() => {
    socket.on('bellNotificationChange', status => {
      playSound(Sound.Nice_Msg_Tone_audio);
      //APAGAMOS LOS DEMAS EVENTOS DE NOTIFICACIONES
      setAdminChangedata(false);
      setIsTyping(false);
      setbell(status);
      setTimeout(() => {
        setbell(false);
      }, 3000);
    });

    socket.on('isTyping', data => {
      //APAGAMOS TODOS LOS DEMAS EVENTOS DE NOTIFICACION
      setbell(false);
      setAdminChangedata(false);
      setIsTyping(true);
      setIsTypingName(data.name);
    });

    socket.on('stopTyping', data => {
      setIsTyping(false);
    });

    socket.on('chat:init', data => {
      playSound(Sound.good_morning_audio);
    });

    socket.on('chat:exit', data => {
      playSound(Sound.chat_hidden_audio);
    });

    socket.on('chat:new:changer', data => {
      if (data.color !== '') {
        setTextColor(data.color);
        playSound(Sound.Changer_audio);
      }

      getAllMessages(data.roomid);
    });

    //CUANDO SE RECIBE MENSAJES DEL CLIENTE EN LA SALA DE CHAT....
    socket.on('chat:new:message', data => {
      playSound(Sound.messageSound_audio);
      getAllMessages(data.roomid);
    });

    //CUANDO SE ENVIA MENSAJE A AL SALA DE CHAT...
    socket.on('chat:send:message:admin', data => {
      getAllMessages(data.roomid);
    });

    //RESPUESTA CUANDO SE ELIMINA UN USUARIO
    socket.on('chat:delete', data => {
      setUserSelected('');
      setMessages([]);
      //socket.emit('join', admin);
      setAdminStatus(false);
      //setAdminMenssageinit(false);
      //setMessages([]);
    });
  }, [socket]);

  //EVENTO PARA OPTENER CHAT DE USUARIO
  useEffect(() => {
    if (!userSelected == '') {
      socket.on('chat:room:messages', data => {
        setAdminMenssageinit(true);
        setAdminStatus(true);
        setMessages(data);
      });

      playSound(Sound.first_message_audio, false, true);
    }
  }, [socket, userSelected]);

  function initAdmin() {
    let admin = {
      name: 'Ralph',
      isUser: false
    };
    socket.emit('sendOwner', admin);
    socket.on('chat:admin:login', data => {
      window.sessionStorage.setItem('admin_id', data.admin._id);
      let i = window.sessionStorage.getItem('admin_id');

      setAdmin(i.replace(/['"]+/g, ''));
    });
  }

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      let newMessage = {
        autor: admin,
        roomid: userSelected,
        message: message,
        isAdmin: true,
        send: 'admin'
      };
      socket.emit('sendMessage', newMessage);
      playSound(Sound.message_send_audio);
      setMessage('');
    }
  };

  const cambiarDatos = e => {
    e.preventDefault();
    if (e) {
      //APAGAMOS LOS DEMAS EVENTOS DE NOTIFICACIONES
      setbell(false);
      setIsTyping(false);
      setAdminChangedata(!admin_changedata);
    }
  };

  const showMessages = (roomid, e) => {
    e.preventDefault();
    //activeColorChat(true);
    setUserSelected(roomid);

    socket.emit('join', roomid);
    socket.emit('visitorSelect', roomid);
  };

  const setImageurl = image => {
    socket.emit('uploadimage', {
      url: image,
      id: admin
    });
    getAllMessages(userSelected);
  };

  const avatarStatus = status => {
    socket.emit('avatarStatus', {
      status: status,
      id: admin
    });
    getAllMessages(userSelected);
  };

  const setMessageAndTyping = value => {
    setMessage(value);
  };

  const deleteToDataBase = (_id, rmid, event) => {
    event.preventDefault();
    if (window.confirm('Delete conversation?')) {
      socket.emit('delete', { _id: _id, roomid: rmid });
    }
  };

  const bellNotification = () => {
    socket.emit('bellNotification', { status: true, roomid: userSelected });
  };

  const isTypingOn = event => {
    if (event.key !== 'Enter') {
      socket.emit('isTyping', {
        name: 'Ralp Hodge',
        roomid: userSelected
      });
    }
  };

  const stopTypingOn = event => {
    if (event.key !== 'Enter') {
      socket.emit('stopTyping', {
        roomid: userSelected
      });
    }
  };

  const updateUserInfo = _id => {
    socket.emit('updateUserInfo', _id);
  };

  const changeTextColor = color => {
    if (color === 'alternado') {
      socket.emit('changeColor', {
        roomid: userSelected,
        color: color
      });
      setTextColor(color);
    }

    if (!modelType) {
      if (color === 'white') {
        socket.emit('changeColor', {
          roomid: userSelected,
          color: 'grey'
        });
        setTextColor('grey');
      }
    } else {
      if (color === 'white') {
        socket.emit('changeColor', {
          roomid: userSelected,
          color: color
        });
        setTextColor('white');
      }
    }
  };

  return (
    <Fragment>
      <div className="whiteboard-admin-container">
        <div className="whiteboard-admin-newsvisitors">
          {usersConectToChat
            ? usersConectToChat.users
                .filter(u => u.isUser === true)
                .map((user, i) => (
                  <VisitorsInit
                    className="whiteboard-admin-VisitorsInit"
                    key={i}
                    user={user}
                    select={userSelected}
                    showMessages={showMessages}
                    updateUserInfo={updateUserInfo}
                    deleteToDataBase={deleteToDataBase}
                  />
                ))
            : null}
        </div>

        <div className="whiteboard-admin-messages">
          {admin_status ? (
            admin_menssageinit ? (
              <Containermessage
                className="whiteboard-admin-container-messages"
                bell={bell}
                bellNotification={bellNotification}
                ownerMode={ownerMode}
                avatarStatus={avatarStatus}
                setImageurl={setImageurl}
                setChangedata={e => cambiarDatos(e)}
                changedata={admin_changedata}
                changeTextColor={changeTextColor}
                textColor={textColor}
                visitors={messages}
              />
            ) : null
          ) : null}
        </div>

        <div className="whiteboard-admin-div-typing">
          {isTyping ? <Typing name={isTypingName} /> : null}
          {bell ? <Bell /> : null}
          {admin_changedata ? (
            <animated.div style={props} className="whiteboard-admin-chagendata">
              <Changedatausers
                changeTextColor={changeTextColor}
                avatarStatus={avatarStatus}
                setImageurl={setImageurl}
                ownerMode={ownerMode}
                setChangedata={setAdminChangedata}
              />
            </animated.div>
          ) : null}
        </div>

        <div className="whiteboard-admin-chatall">
          {admin_status ? (
            <div className="ct">
              {admin_chatinit ? <InputLogin className="inputs" /> : null}
              {admin_menssageinit ? (
                <Input
                  message={message}
                  isTypingOn={isTypingOn}
                  stopTypingOn={stopTypingOn}
                  setMessage={setMessageAndTyping}
                  sendMessage={sendMessage}
                  modelType={modelType}
                />
              ) : null}
            </div>
          ) : null}
          {/*<img src={chatIco} alt="chat_ico" 
                className="chat-icon admin-chat-icon" onClick={e => clickEffect(e)} />*/}
        </div>
      </div>
    </Fragment>
  );
};

export default TeacherChatRoom;
