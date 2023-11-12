import React, { Fragment, useState } from 'react';
import { ReactComponent as SendIcon } from 'assets/icons/contact/send-icon-white.svg';
//import './inputLogin.css';
import '../ChatWhiteboard.css';

const InputLogin = ({ Chatready, setTypingName, modelType }) => {
  const [send, setSend] = useState(false);

  const onSend = () => {
    setSend(true);
    setTimeout(() => setSend(false), 3000);
  };

  var text;
  const onChange = e => {
    setTypingName(e.target.value);
  };

  const handlePressEnter = e => {
    e.preventDefault();
    onSend();
    Chatready();
  };

  return (
    <Fragment>
      <div className={modelType ? 'whiteboard-exterior' : 'whiteboard-exterior-clasico'}>
        <input
          className={modelType ? 'whiteboard-textinput' : 'whiteboard-textinput-clasico'}
          type="text"
          placeholder={' Type your name'}
          value={text}
          onChange={e => onChange(e)}
          onKeyPress={event => (event.key === 'Enter' ? handlePressEnter(event) : null)}
        />
        <SendIcon
          className={send ? 'whiteboard-send-icon-message' : 'whiteboard-send-icon'}
          onClick={handlePressEnter}
        />
      </div>
    </Fragment>
  );
};

export default InputLogin;
