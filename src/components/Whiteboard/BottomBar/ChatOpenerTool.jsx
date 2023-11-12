import React from 'react';
import { ICONS_COLORS } from '../../../enums/constants.enum';
import { ReactComponent as ChatBlack } from 'assets/whiteboard/black/chat-black.svg';
import { ReactComponent as ChatGrey } from 'assets/whiteboard/grey/chat-grey.svg';
import { ReactComponent as ChatWhite } from 'assets/whiteboard/white/chat-white.svg';

const ChatOpenerTool = ({ color, onClick }) => {
  return (
    <div onClick={onClick}>
      {color === ICONS_COLORS.BLACK && (
        <ChatBlack className="page-icon-item" style={{ marginTop: '1px' }} />
      )}
      {color === ICONS_COLORS.WHITE && (
        <ChatWhite className="page-icon-item" style={{ marginTop: '2px' }} />
      )}
      {color === ICONS_COLORS.GREY && (
        <ChatGrey className="page-icon-item" style={{ marginTop: '2px' }} />
      )}
    </div>
  );
};

export default ChatOpenerTool;
