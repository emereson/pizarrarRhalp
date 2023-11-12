import React from 'react';
import pencilIcon from '../chat-assets/pencilportada2.svg';
import '../Chat.css';

export default function Typing(props) {
  return (
    <p className="landing-page-p_typingMsg">
      <img src={pencilIcon} alt="" /> {props.name} is typing ...
    </p>
  );
}
