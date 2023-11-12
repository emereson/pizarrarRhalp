import React from 'react';
import './styles.css';

const chatIcon = ({ event, ico }) => {
  return <img src={ico} alt="chat_ico" className="chat-icon" onClick={event} />;
};

export default chatIcon;
