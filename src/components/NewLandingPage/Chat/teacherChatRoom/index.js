//COMPOSE THAT SHOWS THE CHAT THAT
//IT WILL BE PRIVATE ONLY AUTHORIZED PERSONNEL...

import React, { useState, useEffect, Fragment, useRef } from 'react';
import InputLogin from '../inputLogin/inputLogin';
import Input from '../input/Input';
import '../Chat.css';
import '../containermessage/containermessage.css';
import chatIco from 'assets/icons/chat2.svg';
import Typing from '../typing';
import Containermessage from '../containermessage/containermessage';
import Changedatausers from '../containermessage/changedateusers/changedatausers';
import { useSpring, animated } from 'react-spring';
import { CloseOutlined } from '@material-ui/icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import plusIcon from 'assets/icons/plus-icon-black.svg';

//HOOKS FOR WHEN THERE IS NO CHAT ACTIVITY
import { useIdleTimer } from 'react-idle-timer';
import VisitorsInit from '../visitorsinit/visitorsinit';
import Bell from '../bell';
import Sound from '../SoundConfig.js';
import { useSocket } from 'providers/SocketProvider';

const TeacherChatRoom = ({
  activeColorChat,
  close,
  hideIcons,
  showPlus,
  hideComponent,
  hideInput,
  openChatAutomatically,
  newPositionH,
  iconClick
}) => {
  const { publicSocket: socket } = useSocket();

  const [admin, setAdmin] = useState('');

  const [admin_chatinit, setAdminChatinit] = useState(true);
  const [admin_menssageinit, setAdminMenssageinit] = useState(false);
  const [admin_status, setAdminStatus] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showVisitorsList, setshowVisitorsList] = useState(false);
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

  useEffect(() => {
    if (messages.length > 0) {
      hideIcons();
    }
  }, [messages]);

  const handleClick = () => {
    let body = document.querySelector('body');
    if (hideComponent) {
      iconClick();
      body.classList.add('locked-scroll');
    } else {
      body.classList.remove('locked-scroll');
      setAdminChangedata(false);
      close();
    }
  };

  const playSound = (audioFile, cicle = false, stop = false) => {
    if (stop) {
      audioFile.pause();
      audioFile.currentTime = 0;
    } else {
      audioFile.loop = cicle;
      audioFile.play();
    }
  };

  const getAllMessages = client_room_id => {
    //we broadcast the room to opt for messages
    socket.emit('chat:messages', client_room_id);
    //let's choose all available messages from the room
    socket.on('chat:messages', messages => {
      setMessages(messages);
      if (hideComponent) {
        openChatAutomatically();
        if (
          window.innerWidth < 600 &&
          messages.messages[messages.messages.length - 1].autor.name === admin.name
        ) {
          setshowVisitorsList(!showVisitorsList);
        }
      }
    });
  };

  //inactivity test configuration
  const sinActividad = event => {
    activeColorChat(false);
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
    if (admin_status) {
      activeColorChat(true);
      setAdminMenssageinit(!admin_menssageinit);
      close();
    } else if (!admin_status) {
      activeColorChat(false);
    }
  };

  //socket connection test
  useEffect(() => {
    socket.on('reconnection', function () {
      console.log('reconectado');
      if (userSelected) {
        socket.emit('join', userSelected);
      } else {
        socket.emit('join', admin);
      }
    });
  }, [admin, socket, userSelected]);

  //enable upload of connected chat users
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
          if (hideComponent) {
            openChatAutomatically();
            if (window.innerWidth < 600) {
              setshowVisitorsList(!showVisitorsList);
            }
          }
        }

        setUsersConectToChat({ ...usersConectToChat, users: data.users });
        //WE CHECK IF THERE IS A NEW USER TO ACTIVATE THE EVENT OF MINIMUM AND MAXIMUM WIDTH OF ICONS
        if (data.users.length > 1) {
          newPositionH(true);
        } else {
          newPositionH(false);
          activeColorChat(false);
        }
      });
    }
  }, []);

  //GLOBAL EVENTS
  useEffect(() => {
    socket.on('bellNotificationChange', status => {
      playSound(Sound.Nice_Msg_Tone_audio);
      //WE TURN OFF OTHER NOTIFICATION EVENTS
      setAdminChangedata(false);
      setIsTyping(false);
      setbell(status);
      setTimeout(() => {
        setbell(false);
      }, 3000);
    });

    socket.on('isTyping', data => {
      //WE TURN OFF ALL OTHER NOTIFICATION EVENTS
      setbell(false);
      setAdminChangedata(false);
      setIsTyping(true);
      setIsTypingName(data.name);
    });

    socket.on('stopTyping', data => {
      setIsTyping(false);
      //setIsTypingName(data.name);
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

    //WHEN YOU RECEIVE CUSTOMER MESSAGES IN THE CHAT ROOM....
    socket.on('chat:new:message', data => {
      playSound(Sound.messageSound_audio);
      getAllMessages(data.roomid);
    });

    //WHEN MESSAGE IS SENT TO THE CHAT ROOM...
    socket.on('chat:send:message:admin', data => {
      getAllMessages(data.roomid);
    });

    //RESPONSE WHEN A USER IS DELETED
    socket.on('chat:delete', data => {
      console.log('DELETE USUARIO');
      setUserSelected('');
      setMessages([]);
      setAdminStatus(false);
    });
  }, []);

  //EVENT TO OPT USER CHAT
  useEffect(() => {
    if (!userSelected == '') {
      socket.on('chat:room:messages', data => {
        setAdminMenssageinit(true);
        setAdminStatus(true);
        setMessages(data);
        if (hideComponent) {
          openChatAutomatically();
          if (window.innerWidth < 600) {
            setshowVisitorsList(!showVisitorsList);
          }
        }
      });

      playSound(Sound.first_message_audio, false, true);
    }
  }, [userSelected]);

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
      //WE TURN OFF OTHER NOTIFICATION EVENTS
      setbell(false);
      setIsTyping(false);
      setAdminChangedata(!admin_changedata);
    }
  };

  const showMessages = (roomid, e) => {
    e.preventDefault();
    activeColorChat(true);
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

    if (color === 'white') {
      socket.emit('changeColor', {
        roomid: userSelected,
        color: color
      });
      setTextColor('white');
    }
  };

  let root = document.documentElement;
  root.style.setProperty('--vh', window.innerHeight + 'px');
  window.addEventListener('resize', function (event) {
    root.style.setProperty('--vh', window.innerHeight + 'px');
  });

  const scrollDiv = useRef(null);

  /* const scrollToBottom = () => {
    scrollDiv.current.scrollIntoView({ behavior: 'smooth' });
  }; */

  /* useEffect(() => {
    scrollToBottom();
  }, [usersConectToChat.users]); */

  return (
    <Fragment>
      {!hideComponent && (
        <div className="landing-page-teacher-chat-container">
          <div className="landing-page-close-button">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Cerrar</Tooltip>}
            >
              <CloseOutlined
                className="landing-page-close-icon"
                onClick={handleClick}
                style={{ cursor: 'pointer', margin: '8px 10px', fontSize: 30 }}
                color="disabled"
              />
            </OverlayTrigger>
          </div>
          <div className="landing-page-private-chat">
            <div
              id="newvisitor"
              className={
                hideComponent
                  ? 'landing-page-teacher-chat-new-visitors -opacity'
                  : 'landing-page-teacher-chat-new-visitors'
              }
            >
              <div style={{ paddingTop: '120px' }}></div>
              <div className="landing-page-teacher-chat-visitor-list">
                {usersConectToChat
                  ? usersConectToChat.users
                      .filter(u => u.isUser === true)
                      .map((user, i) => (
                        <VisitorsInit
                          className="landing-page-VisitorsInit"
                          key={i}
                          user={user}
                          select={userSelected}
                          showMessages={showMessages}
                          updateUserInfo={updateUserInfo}
                          deleteToDataBase={deleteToDataBase}
                        />
                      ))
                  : null}
                <div ref={scrollDiv}></div>
              </div>
            </div>

            <div className="landing-page-teacher-container-messages">
              <div
                className="landing-page-dinamic-teacher-chat-container"
                style={{ flexDirection: showVisitorsList ? 'row' : 'column' }}
              >
                {showVisitorsList && (
                  <div
                    id="newvisitor"
                    className={
                      hideComponent
                        ? 'landing-page-teacher-chat-new-visitors-responsive -opacity'
                        : 'landing-page-teacher-chat-new-visitors-responsive'
                    }
                  >
                    <div style={{ paddingTop: '150px' }}></div>
                    <div id="landing-page-teacher-chat-teacher-chat-new-visitor">
                      {usersConectToChat ? (
                        <>
                          {usersConectToChat.users
                            .filter(u => u.isUser === true)
                            .map((user, i) => (
                              <VisitorsInit
                                className="landing-page-VisitorsInit"
                                key={i}
                                user={user}
                                select={userSelected}
                                showMessages={showMessages}
                                updateUserInfo={updateUserInfo}
                                deleteToDataBase={deleteToDataBase}
                              />
                            ))}
                        </>
                      ) : null}
                    </div>
                  </div>
                )}
                <div
                  className={
                    hideComponent
                      ? 'landing-pages-teacher-chat-messages admin-messages -opacity'
                      : 'landing-pages-teacher-chat-messages admin-messages'
                  }
                  style={{
                    boxSizing: 'border-box',
                    //width: showVisitorsList ? '65%' : '100%',
                    width: '100%'
                  }}
                >
                  {admin_status ? (
                    admin_menssageinit ? (
                      <Containermessage
                        className="landing-page-teacher-chat-container-messages"
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
              </div>

              <div
                className={
                  hideComponent
                    ? 'landing-page-teacher-chat-div-typing -opacity'
                    : 'landing-page-teacher-chat-div-typing'
                }
              >
                {isTyping && <Typing name={isTypingName} />}
                {bell && <Bell />}
                {admin_changedata && (
                  <animated.div
                    style={{ ...props, marginTop: 0, marginRight: 0 }}
                    className="landing-page-chat-teacher-chagendata"
                  >
                    <Changedatausers
                      changeTextColor={changeTextColor}
                      avatarStatus={avatarStatus}
                      setImageurl={setImageurl}
                      ownerMode={ownerMode}
                      setChangedata={setAdminChangedata}
                    />
                  </animated.div>
                )}
              </div>
            </div>
          </div>
          <div className="controls">
            {window.innerWidth < 600 && (
              <div
                className="landing-page-teacher-input-and-send"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src={plusIcon}
                  alt="plusIcon"
                  className={
                    showPlus
                      ? 'landing-page-chat-teacher-plusIcon -opacity'
                      : 'landing-page-chat-teacher-plusIcon'
                  }
                  onClick={() => setshowVisitorsList(!showVisitorsList)}
                />
              </div>
            )}
            <div className="landing-page-teacher-chat-ct">
              {admin_chatinit ? <InputLogin className="inputs" /> : null}
              {admin_menssageinit ? (
                <Input
                  message={message}
                  isTypingOn={isTypingOn}
                  stopTypingOn={stopTypingOn}
                  hide={hideInput}
                  setMessage={setMessageAndTyping}
                  sendMessage={sendMessage}
                />
              ) : (
                <span className="chat-selection-alert">Select a chat!</span>
              )}
            </div>
          </div>
        </div>
      )}
      <img
        src={chatIco}
        alt="chat_ico"
        id="teacher_chat_icon"
        className="landing-page-teacher-cursorPointer"
        onClick={handleClick}
      />
    </Fragment>
  );
};

export default TeacherChatRoom;
