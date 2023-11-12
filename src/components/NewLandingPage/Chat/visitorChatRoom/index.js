import React, { useState, useEffect, Fragment } from 'react';

//HOOKS PARA CUANDO NO HAY ACTIVAD EN EL CHAT
import { useIdleTimer } from 'react-idle-timer';

/*** COMPONENTS ***/
import InputLogin from '../inputLogin/inputLogin';
import Input from '../input/Input';
import Containermessage from '../containermessage/containermessage';
import Typing from '../typing';

import Bell from '../bell';
import Changedatausers from '../containermessage/changedateusers/changedatausers';
import { useSpring, animated } from 'react-spring';
/*** STYLES GLOBALES ***/
import '../Chat.css';
import '../containermessage/containermessage.css';
/*** ASSETS ***/
import chatIco from 'assets/icons/chat2.svg';
import Sound from '../SoundConfig.js';
import { Close, CloseOutlined } from '@material-ui/icons';

/*** ANIMACIONES ***/
import ScrollToBottom from 'react-scroll-to-bottom';

/*** SERVICES ***/
import { v4 as uuidv4 } from 'uuid';

import { useSocket } from '../../../../providers/SocketProvider';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function VisitorChatRoom({
  activeColorChat,
  seticonsWidth,
  newPosition,
  comunicateChatStatus,
  width
}) {
  const { publicSocket: socket } = useSocket();
  const [chatinit, setChatinit] = useState(false); //muestra el input de login o message de ser el caso

  const [menssageinit, setMenssageinit] = useState(false);

  const [status, setStatus] = useState(false);

  const [TypingName, setTypingName] = useState('');

  const [message, setMessage] = useState('');

  const [ActiveChat, setActiveChat] = useState(false);

  const [isTyping, setIsTyping] = useState(false);

  const [isTypingName, setIsTypingName] = useState('');

  const [messages, setMessages] = useState([]);

  const [changedata, setChangedata] = useState(false);

  const [bell, setbell] = useState(false);

  const [notification, setNotification] = useState(false);

  const [onNotification, setOnNotification] = useState(false);

  const [statusAvatar, setStatusAvatar] = useState(false);

  const [textColor, setTextColor] = useState('white');

  const [containermessage, setContainerMessage] = useState(true);

  //id de la sala de chat
  const [client_room_id, setClientRoomId] = useState(null);

  const props = useSpring({
    opacity: changedata ? 1 : 0
  });

  //EFECTO GLOBALES DE LOS SOCKET.IO
  useEffect(() => {
    //Evento de reconect de socket
    socket.on('reconnection', function () {
      if (window.sessionStorage.getItem('client_room_id') !== null) {
        if (socket !== null) {
          socket.emit('join', client_room_id);
          console.log('RECONECTADO A LA SALA...');
        }
      }
    });
  }, []);

  const handleActiveColorChat = props => {
    if (activeColorChat) {
      activeColorChat(props);
    }
  };
  const handleNewPosition = props => {
    if (newPosition) {
      newPosition(props);
    }
  };
  const handleIconsWidth = props => {
    if (seticonsWidth) {
      seticonsWidth(props);
    }
  };
  const handleComunicateChatStatus = props => {
    if (comunicateChatStatus) {
      comunicateChatStatus(props);
    }
  };

  //test de inactividad onfiguracion
  const sinActividad = event => {
    handleActiveColorChat(false);
    setStatus(!status);
    handleNewPosition(false);
    setChangedata(false);
  };

  useEffect(() => {
    handleComunicateChatStatus(status);
  }, [status]);

  const handleOnActive = event => {
    if (window.sessionStorage.getItem('client_room_id') !== null) {
      if (socket !== null) {
        // socket.emit('join', client_room_id);
        console.log('reconectando');
        getDataToCache();
      }
    }
  };

  useIdleTimer({
    timeout: 120000,
    onIdle: sinActividad,
    onActive: handleOnActive,
    debounce: 500
  });

  //EFECTO QUE CARGA DE LA CACHE LA INFO DEL USUARIO
  useEffect(() => {
    getDataToCache();
  }, []);

  //EVENTOS GLOBALES
  useEffect(() => {
    socket.on('bellNotificationChange', status => {
      playSound(Sound.Nice_Msg_Tone_audio);
      //APAGAMOS TODOS LOS DEMAS EVENTOS DE NOTIFICACION
      setChangedata(false);
      setIsTyping(false);
      setbell(status);
      setTimeout(() => {
        setbell(false);
      }, 3000);
    });

    socket.on('isTyping', data => {
      //APAGAMOS TODOS LOS DEMAS EVENTOS DE NOTIFICACION
      setbell(false);
      setChangedata(false);

      setIsTyping(true);
      setIsTypingName(data.name);
    });

    socket.on('stopTyping', data => {
      setIsTyping(false);
    });

    socket.on('chat:new:changer', data => {
      if (data.color !== '') {
        setTextColor(data.color);
        playSound(Sound.Changer_audio);
      }

      getAllMessages(data.roomid);
    });

    //MESAJES RECIBIDOS

    socket.on('chat:new:message', data => {
      //DESACTIVAMOS LA NOTIFICACION DE 20 SEGUNDO!...
      setOnNotification(false);
      setNotification(false);
      playSound(Sound.messageSound_audio);
      console.log(data.roomid);
      getAllMessages(data.roomid);
      handleActiveColorChat(true);
    });

    //MENSAJES ENVIADOS
    socket.on('chat:send:message:cliente', data => {
      console.log(data);
      //setMessages(data);
      getAllMessages(data.roomid);
      handleActiveColorChat(true);
    });

    socket.on('notNotification', data => {
      //DESACTIVAMOS LA NOTIFICACION DE 20 SEGUNDO!...
      playSound(Sound.messageSound_audio);
      setNotification(true);
      setOnNotification(true);
    });
  }, []);

  //ACTIVAMOS LA NOTIFICACION EN EL PRIMER ENVIO DE MESAJE
  useEffect(() => {
    if (onNotification) {
      setTimeout(() => {
        setNotification(false);
      }, 20000);
    }
  }, [onNotification]);

  /****FUNCIONES DEL COMPONENTE****/
  const playSound = audioFile => {
    audioFile.play();
  };

  const getDataToCache = () => {
    if (window.sessionStorage.getItem('client_room_id') !== null) {
      setChatinit(false);
      handleActiveColorChat(true);

      let name = window.sessionStorage.getItem('name');

      let room_id = window.sessionStorage.getItem('client_room_id');

      setTypingName(name.replace(/['"]+/g, ''));

      setClientRoomId(room_id.replace(/['"]+/g, ''));

      setMenssageinit(true);

      socket.emit('join', room_id);

      socket.emit('set:cache', room_id);

      socket.on('chat:cache', data => {
        setMessages(data);
        setStatus(true);
      });
    } else {
      setChatinit(true);

      setMenssageinit(false);
    }
  };

  useEffect(() => {
    socket.on('chat:messages', data => {
      setMessages(data);
    });
  }, []);

  const clickEffect = e => {
    let body = document.querySelector('body');

    playSound(Sound.chat_hidden_audio);
    setStatus(!status);
    if (!chatinit) {
      handleActiveColorChat(!status);
      handleNewPosition(false);
    }

    if (status) {
      socket.emit('chat:exit', {});
      setChangedata(false);
      body.classList.remove('locked-scroll');
    } else if (!status) {
      socket.emit('chat:init', {});
      getDataToCache();
      body.classList.add('locked-scroll');
    }
  };

  const Login = () => {
    if (TypingName) {
      const id = uuidv4();
      //socket.emit('join', id);

      let newUser = {
        name: TypingName,
        roomid: id
      };
      socket.emit('sendUser', newUser);
      playSound(Sound.messageSound_audio);
      //LOGIN CORRECTO...
      setChatinit(false);
      setMenssageinit(true);
      //NOTIFICACION DE LOS 20 SEGUNDOS
    }
  };

  useEffect(() => {
    socket.on('chat:send:message', data => {
      setMessages(data);
      playSound(Sound.messageSound_audio);

      if (data.messages.length > 0) {
        handleIconsWidth(true);
      } else {
        handleIconsWidth(false);
      }

      window.sessionStorage.setItem('name', data.messages[0].autor.name);
      window.sessionStorage.setItem('client_id', data.messages[0].autor._id);
      window.sessionStorage.setItem('client_room_id', data.messages[0].roomid);

      let room_id = window.sessionStorage.getItem('client_room_id');
      handleActiveColorChat(true);
      setClientRoomId(room_id.replace(/['"]+/g, ''));
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      playSound(Sound.message_send_audio);

      let newMessage = {
        autor: window.sessionStorage.getItem('client_id'),
        roomid: client_room_id,
        message: message,
        isAdmin: false,
        send: 'cliente'
      };
      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  const cambiarDatos = e => {
    e.preventDefault();
    if (e) {
      //APAGAMOS LOS DEMAS EVENTOS DE NOTIFICACIONES
      setbell(false);
      setIsTyping(false);
      setChangedata(!changedata);
    }
  };

  //update avatar
  const setImageurl = image => {
    socket.emit('uploadimage', {
      url: image,
      id: window.sessionStorage.getItem('client_id')
      // roomid:window.sessionStorage.getItem('client_room_id')
    });
    setStatusAvatar(true);
    getAllMessages(client_room_id);
  };

  const avatarStatus = status => {
    setStatusAvatar(status);
    socket.emit('avatarStatus', {
      status: status,
      id: window.sessionStorage.getItem('client_id')
    });
    getAllMessages(client_room_id);
  };

  const setMessageAndTyping = value => {
    setMessage(value);
  };

  const getAllMessages = client_room_id => {
    //emitimos la sala para optener mensajes
    socket.emit('chat:messages', client_room_id);
  };

  const isTypingOn = event => {
    if (event.key !== 'Enter') {
      socket.emit('isTyping', {
        name: TypingName,
        roomid: client_room_id
      });
    }
  };

  const stopTypingOn = event => {
    if (event.key !== 'Enter') {
      socket.emit('stopTyping', {
        roomid: client_room_id
      });
    }
  };

  const changeTextColor = color => {
    if (color === 'alternado') {
      socket.emit('changeColor', {
        roomid: client_room_id,
        color: color
      });
      setTextColor(color);
    }

    if (color === 'white') {
      socket.emit('changeColor', {
        roomid: client_room_id,
        color: color
      });
      setTextColor('white');
    }
  };

  return (
    <Fragment>
      {status && (
        <>
          <div className="chat-mask"></div>
          <div className="landing-page-public-chat-container">
            <div className="landing-page-close-button">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-top`}>Cerrar</Tooltip>}
              >
                <CloseOutlined
                  className="landing-page-close-icon"
                  onClick={e => clickEffect(e)}
                  style={{ cursor: 'pointer', margin: '8px 10px', fontSize: 30 }}
                  color="disabled"
                />
              </OverlayTrigger>
            </div>
            <ScrollToBottom className="landing-page-newsvisitors"> </ScrollToBottom>
            <div className="landing-page-messages">
              {menssageinit && (
                <Containermessage
                  bell={bell}
                  avatarStatus={avatarStatus}
                  setImageurl={setImageurl}
                  setChangedata={e => cambiarDatos(e)}
                  changedata={changedata}
                  visitors={messages}
                  statusAvatar={statusAvatar}
                  changeTextColor={changeTextColor}
                  textColor={textColor}
                  notification={notification}
                />
              )}
            </div>

            <div className="landing-page-div-typing">
              {isTyping ? <Typing name={isTypingName} /> : null}
              {bell ? <Bell /> : null}
              {changedata ? (
                <div className="chagendata">
                  <Changedatausers
                    changeTextColor={changeTextColor}
                    avatarStatus={avatarStatus}
                    setImageurl={setImageurl}
                    setChangedata={setChangedata}
                  />
                </div>
              ) : null}
            </div>

            <div
              className="landing-page-public-input-and-send"
              style={{ justifyContent: status ? 'space-between' : 'flex-end' }}
            >
              <div style={{ width: '100%' }}>
                {status ? (
                  <Fragment>
                    {chatinit ? (
                      <InputLogin
                        className="landing-page-public-chat-inputs"
                        Chatready={Login}
                        setTypingName={setTypingName}
                      />
                    ) : null}
                    {menssageinit ? (
                      <Input
                        message={message}
                        isTypingOn={isTypingOn}
                        stopTypingOn={stopTypingOn}
                        setMessage={setMessageAndTyping}
                        sendMessage={sendMessage}
                      />
                    ) : null}
                  </Fragment>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
      <img
        src={chatIco}
        alt="chat_ico"
        id="icon-public-chat"
        className="landing-page-cursor-pointer-icon"
        onClick={e => clickEffect(e)}
      />
    </Fragment>
  );
}
