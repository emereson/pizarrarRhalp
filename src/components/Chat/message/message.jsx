import React from 'react';
import Avatar from '../avatar';
import '../Chat.css';
//const Date = require("simple-datetime-formater")

import moment from 'moment';

const Message = ({
  name,
  message,
  data,
  setChangedata,
  avatar,
  avatarStatus,
  textColor,
  isUser,
  ownerMode,
  bellNotification
}) => {
  let msText;
  let msTextA;
  let avatarUserColor = 'avatar';
  let timetext;

  if (textColor == 'alternado') {
    msTextA = 'changeColorToBlue';
    msText = 'changeColorToViolet';
  } else {
    msText = 'changeColorTowhite';
    msTextA = 'changeColorTowhite';
  }
  /*
    if(isUser == true){
      avatarUserColor = "avatarUser";
      msText = 'changeColorToViolet';
    }else{
      avatarUserColor = "avatarUser";
      msText = 'changeColorTowhite';
    }
  */

  let fullmsgChangeColor = `messageDoc ${msText}`;

  return (
    <div className="message" style={{ width: '100%' }}>
      <Avatar
        avatar={avatar}
        setChangedata={setChangedata}
        isUser={isUser}
        avatarStatus={avatarStatus}
        ownerMode={ownerMode}
        bellNotification={bellNotification}
      />

      <div className={isUser ? msText : msTextA}>
        <h5 className={isUser ? msText : msTextA}>{name}</h5>
        <p className={isUser ? msText : msTextA} style={{ wordWrap: 'break-word' }}>
          {message}
          <span className={isUser ? `${msText} timeD` : `${msTextA} timeD`}>
            {moment(data).format('hh:mm:A')}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Message;
