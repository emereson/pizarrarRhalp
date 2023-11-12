import React, { Fragment, useState, useEffect } from 'react';
import { ReactComponent as SendIcon } from 'assets/icons/contact/send-icon-white.svg';
import '../Chat.css';

import { Delay } from '../helpFuncion';

//import {Animated} from "react-animated-css";

const Input = ({ setMessage, sendMessage, hide, message, isTypingOn, stopTypingOn }) => {
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
        className={hide ? 'exterior admin-exterior -opacity' : 'exterior admin-exterior'}
        style={{ width: '100%', position: 'relative', justifyContent: 'flex-start' }}
      >
        <input
          className="textinput"
          type="text"
          placeholder={'type your message...'}
          value={message}
          style={{ width: '80%' }}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={event => (event.which == 13 ? sMessage(event) : null)}
          onKeyDown={event => isTypingOn(event)}
          onKeyUp={event => stopTypingOn(event)}
        />
        {/* <Animated  animationIn="fadeInRight" animationOut="fadeOutRight" animationInDuration={1000}
                animationOutDuration={3000} isVisible={true}>*/}
        <div style={{ width: '45px', height: 'auto', position: 'absolute', right: 20 }}>
          <SendIcon
            className={send ? 'send-icon-message' : 'send-icon admin-send-icon'}
            onClick={e => {
              sendMessage(e);
              onSend();
            }}
          />
        </div>
        {/*</Animated>*/}
      </div>
    </Fragment>
  );
};

export default Input;
