import React, { Fragment, useState, useEffect } from 'react';
import { ReactComponent as SendIcon } from 'assets/icons/contact/send-icon-white.svg';
import '../ChatWhiteboard.css';

import { Delay } from '../helpFuncion';

//import {Animated} from "react-animated-css";

const Input = ({
  setMessage,
  sendMessage,
  message,
  isTypingOn,
  stopTypingOn,
  modelType
}) => {
  const delayt = Delay(2000); //function de ayuda....
  const [send, setSend] = useState(false);

  const onSend = () => {
    setSend(true);

    setTimeout(() => setSend(false), 1000);
  };
  const sMessage = event => {
    sendMessage(event);
    onSend();
  };

  return (
    <Fragment>
      <div
        className={
          modelType ? 'whiteboard-admin-exterior' : 'whiteboard-admin-exterior-clasico'
        }
      >
        <input
          className={
            modelType
              ? 'whiteboard-admin-textinput'
              : 'whiteboard-admin-textinput-clasico'
          }
          type="text"
          placeholder={'type your message...'}
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={event => (event.which == 13 ? sMessage(event) : null)}
          onKeyDown={event => isTypingOn(event)}
          onKeyUp={event => stopTypingOn(event)}
        />
        {/* <Animated  animationIn="fadeInRight" animationOut="fadeOutRight" animationInDuration={1000}
                animationOutDuration={3000} isVisible={true}>*/}
        <SendIcon
          className={
            send ? 'whiteboard-admin-send-icon-message' : 'whiteboard-admin-send-icon'
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
