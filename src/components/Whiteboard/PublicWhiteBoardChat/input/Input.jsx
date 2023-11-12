import React, { Fragment, useState, useEffect } from 'react';
import { ReactComponent as SendIcon } from 'assets/icons/contact/send-icon-white.svg';
import '../PublicChat.css';
import { useWhiteBoard } from 'components/Whiteboard/WhiteBoardProvider';

//simport { Delay } from '../helpFuncion';

//import {Animated} from "react-animated-css";

const Input = ({
  setMessage,
  sendMessage,
  message,
  isTypingOn,
  stopTypingOn,
  modelType,
  name,
  onPrivate
}) => {
  // const delayt = Delay(2000);//function de ayuda....
  const [send, setSend] = useState(false);
  const { reloadChatCountDown } = useWhiteBoard();

  const onSend = () => {
    setSend(true);

    setTimeout(() => setSend(false), 1000);
  };
  const sMessage = event => {
    sendMessage(event);
    onSend();
  };

  const onChangeInput = ({ target: { value } }) => {
    setMessage(value);
    reloadChatCountDown();
  };

  const onKeyPress = event => {
    reloadChatCountDown();
    return event.which == 13 ? sMessage(event) : null;
  };

  return (
    <Fragment>
      <div
        className={
          onPrivate
            ? ' input-message-private whiteboard-exterior '
            : modelType
            ? 'whiteboard-exterior '
            : 'whiteboard-exterior-clasico '
        }
      >
        <input
          className={
            modelType ? 'whiteboard-public-textinput' : 'whiteboard-textinput-clasico'
          }
          type="text"
          placeholder={
            name && onPrivate ? 'Type private message to ' + name : 'Type your message...'
          }
          value={message}
          onChange={onChangeInput}
          onKeyPress={onKeyPress}
          // onKeyDown={ (event) => isTypingOn(event)}
          // onKeyUp={ (event) => stopTypingOn(event)}
        />
        {/* <Animated  animationIn="fadeInRight" animationOut="fadeOutRight" animationInDuration={1000}
                animationOutDuration={3000} isVisible={true}>*/}
        <SendIcon
          className={
            send ? 'whiteboard-send-icon-message' : 'whiteboard-send-icon admin-send-icon'
          }
          onClick={e => {
            sendMessage(e);
            onSend();
          }}
        />
        {/*</Animated>*/}
      </div>
    </Fragment>
  );
};

export default Input;
