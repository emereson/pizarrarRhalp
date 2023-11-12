import React from 'react';
import pencilIcon from '../chat-assets/pencilportada1.svg';
import '../ChatWhiteboard.css';

export default function Typing(props) {
  return (
    <p className="p_typingMsg">
      <img src={pencilIcon} alt="" /> {props.name} is typing ...
    </p>
  );
}
