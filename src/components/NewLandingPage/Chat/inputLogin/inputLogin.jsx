import React, { Fragment, useState } from 'react';
import { ReactComponent as SendIcon } from 'assets/icons/contact/send-icon-black.svg';
import '../Chat.css';

const InputLogin = ({ Chatready, setTypingName }) => {
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
      <div
        className="landing-page-exterior admin-exterior"
        style={{ position: 'relative', justifyContent: 'flex-start' }}
      >
        <input
          className="landing-page-textinput"
          type="text"
          placeholder={' Type your name'}
          value={text}
          onChange={e => onChange(e)}
          onKeyPress={event => (event.key === 'Enter' ? handlePressEnter(event) : null)}
        />
        <div style={{ width: '45px', height: 'auto', position: 'absolute', right: 6 }}>
          <SendIcon
            className={send ? 'send-icon-message' : 'send-icon'}
            style={{ width: '50px', height: 'auto' }}
            onClick={handlePressEnter}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default InputLogin;
