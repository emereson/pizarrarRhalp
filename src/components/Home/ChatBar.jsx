import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import chatIco from 'assets/icons/chat2.svg';
import { userSelector } from 'selectors/UserSelectors';
import { createChatUser } from 'store/actions/UserActions';
import {
  createConversation,
  conversationReceived,
  addMessage,
  removeAttendedConversationBySomeoneElse,
  closeConversation
} from 'store/actions/ConversationActions';
import { conversationSelector, conversationsSelector } from 'selectors/ConvSelectors';
import { bindActionCreators } from 'redux';
import alertSound from 'assets/sounds/Nice_Msg_Tone.mp3';
import newConvoSound from 'assets/sounds/firts_message.mp3';
import chatOpenedSound from 'assets/sounds/good-morning.mp3';
import chatToggleSound from 'assets/sounds/chat_hidden.mp3';
import Sound from 'react-sound';
import Input from './Chat/Input';
import { useSocket } from '../../providers/SocketProvider';

let prevCount = 0;

const ChatBar = ({
  loggedUser,
  createConv,
  conversation,
  createChatUser,
  onConversationReceived,
  conversations,
  addMessage,
  removeAttendedConversationBySomeoneElse,
  closeConversation,
  removeBuzzers,
  showChat,
  setShowChat
}) => {
  const { publicSocket: socket } = useSocket();
  const [insertName, setInsertName] = useState(false);
  const [userName, setuserName] = useState('');
  const [alertPlaying, setAlertPlaying] = useState(Sound.status.STOPPED);
  const [newConvoPlaying, setNewConvoPlaying] = useState(Sound.status.STOPPED);
  const [chatOpenedPlaying, setChatOpenedPlaying] = useState(Sound.status.STOPPED);
  const [chatTogglePlaying, setChatTogglePlaying] = useState(Sound.status.STOPPED);

  const handleEnteredUserName = () => {
    createChatUser({ userName }, ({ loggedUser }) => {
      createConv(loggedUser.id, conv => {
        setInsertName(false);
        setShowChat(true);
        socket.emit('conversation:create', { conversationId: conv.id });
      });
    });
  };

  useEffect(() => {
    socket.on('message:new', ({ text, author, conversation }) => {
      addMessage({ text, author }, conversation);
    });
    socket.on(`conversation:attended`, ({ conversation }) => {
      removeAttendedConversationBySomeoneElse(conversation);
      setNewConvoPlaying(Sound.status.STOPPED);
    });
    socket.on(`conversation:closed`, ({ conversation }) =>
      closeConversation(conversation)
    );

    socket.on(`conversation:buzz`, ({ conversation }) => {
      addMessage({ buzzer: true }, conversation);
      setAlertPlaying(Sound.status.PLAYING);
      setTimeout(() => {
        removeBuzzers(conversation);
      }, 2100);
    });

    socket.on(`chat:opened`, () => {
      setChatOpenedPlaying(Sound.status.PLAYING);
    });

    prevCount = 0;
  }, [
    addMessage,
    closeConversation,
    removeAttendedConversationBySomeoneElse,
    removeBuzzers,
    socket
  ]);

  useEffect(() => {
    if (prevCount !== 0 && prevCount < conversations.length) {
      setNewConvoPlaying(Sound.status.PLAYING);
    }
    prevCount = conversations.length;
  }, [conversations.length]);

  const handleChatClick = () => {
    setChatTogglePlaying(Sound.status.PLAYING);
    if (!loggedUser) {
      setInsertName(!insertName);
      socket.emit('chat:opened');
    } else if (loggedUser.isStudent) {
      socket.emit('chat:opened');
      setuserName(`${loggedUser.firstName} ${loggedUser.lastName}`);
      createConv(loggedUser.id, () => {
        socket.emit(
          'conversation:create',
          { user: loggedUser },
          { conversationId: conversation.id }
        );
        setInsertName(false);
        setShowChat(true);
      });
    } else {
      socket.emit('lobby:join', { user: loggedUser });
      socket.on('conversation:new', ({ conversation, conversationRoom }) => {
        onConversationReceived(conversation, conversationRoom, loggedUser);
      });
      setShowChat(true);
    }
  };

  const handlePressEnter = input => e => {
    if (input === 'name' && e.key === 'Enter') {
      handleEnteredUserName();
    }
  };

  const ChatIcon = () => (
    <img
      src={chatIco}
      alt="chat_ico"
      className="chat-icon"
      onClick={() => handleChatClick()}
    />
  );

  const WeAreOnlineText = () => (
    <div className="chat-banner">
      <p style={{ color: 'white' }}>We are online, chat with us</p>
    </div>
  );

  return (
    <>
      <Sound
        url={alertSound}
        playStatus={alertPlaying}
        onFinishedPlaying={() => setAlertPlaying(Sound.status.STOPPED)}
        autoLoad
      />
      <Sound
        url={chatOpenedSound}
        playStatus={chatOpenedPlaying}
        onFinishedPlaying={() => setChatOpenedPlaying(Sound.status.STOPPED)}
        autoLoad
      />
      <Sound
        url={chatToggleSound}
        playStatus={chatTogglePlaying}
        onFinishedPlaying={() => setChatTogglePlaying(Sound.status.STOPPED)}
        autoLoad
      />
      <Sound url={newConvoSound} playStatus={newConvoPlaying} autoLoad loop />
      <div className="chat-footer">
        {showChat && (
          <Chat
            conversation={conversation}
            conversations={conversations}
            hideChat={() => setShowChat(false)}
            setNewConvoPlaying={setNewConvoPlaying}
          />
        )}
        {insertName && (
          <Input
            onSendMessage={setuserName}
            placeHolder="Insert your name"
            disabled={false}
          />
        )}
        {!showChat && !insertName && <WeAreOnlineText />}
        <ChatIcon />
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  conversation: conversationSelector(state),
  conversations: conversationsSelector(state),
  loggedUser: userSelector(state),
  showChat: state.conversation.showChat
});

const mapDispatchToProps = dispatch => ({
  createConv: (visitorId, callback) =>
    dispatch(createConversation({ visitorId }, callback)),
  createChatUser: (body, callback) => dispatch(createChatUser(body, callback)),
  onConversationReceived: (conversation, conversationRoom, user) =>
    dispatch(conversationReceived(conversation, conversationRoom, user)),
  addMessage: bindActionCreators(addMessage, dispatch),
  removeAttendedConversationBySomeoneElse: bindActionCreators(
    removeAttendedConversationBySomeoneElse,
    dispatch
  ),
  closeConversation: bindActionCreators(closeConversation, dispatch),
  removeBuzzers: conversation => dispatch({ type: 'REMOVE_BUZZERS', conversation }),
  setShowChat: showChat => dispatch({ type: 'TOGGLE_CHAT', showChat })
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBar);
