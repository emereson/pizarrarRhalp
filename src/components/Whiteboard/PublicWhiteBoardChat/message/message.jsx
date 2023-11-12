import React from 'react';
import Avatar from '../avatar';
import '../PublicChat.css';

import moment from 'moment';
import { useUser } from 'components/UserManagment/UserProvider';

const Message = ({
  name,
  message,
  data,
  setChangedata,
  avatar,
  avatarStatus,
  textColor,
  isModeAdmin,
  isAdmin,
  ownerMode,
  color,
  bellNotification,
  userId,
  setUserMessagePrivate,
  privat,
  recipient
}) => {
  let msText;
  let msTextA;
  let bulbuja = 'message-privat';
  let timetext;

  if (textColor == 'alternado') {
    msTextA = 'changeColorToBlue';
    msText = 'changeColorToViolet';
  } else if (textColor === 'grey') {
    msText = 'changeColorToGrey';
    msTextA = 'changeColorToGrey';
  } else {
    msText = 'changeColorTowhite';
    msTextA = 'changeColorTowhite';
  }

  const isPrivateDiv = () => {
    if (
      recipient === window.sessionStorage.getItem('user_Id') ||
      userId === window.sessionStorage.getItem('user_Id')
    ) {
      return (
        <div
          className="message-private"
          onDoubleClick={() =>
            recipient === window.sessionStorage.getItem('user_Id')
              ? setUserMessagePrivate(userId, name)
              : null
          }
        >
          <Avatar
            avatar={avatar}
            setChangedata={setChangedata}
            isAdmin={isAdmin}
            avatarStatus={avatarStatus}
            ownerMode={ownerMode}
            bellNotification={bellNotification}
            userId={userId}
            color={color}
            isModeAdmin={isModeAdmin}
          />

          <div
            className={
              !isAdmin ? msText + ' message-privat' : msTextA + ' message-privat'
            }
          >
            <h5
              className={!isAdmin ? msText : msTextA}
              onDoubleClick={() => setUserMessagePrivate(userId, name)}
              style={{ cursor: 'pointer', textTransform: 'capitalize' }}
            >
              {recipient === window.sessionStorage.getItem('user_Id')
                ? 'Private message from ' + name
                : name}
            </h5>
            <p
              id="tal"
              className={!isAdmin ? msText : msTextA}
              style={{ wordWrap: 'break-word', whiteSpace: '-moz-pre-wrap' }}
            >
              {message}
              <span className={!isAdmin ? `${msText} timeD` : `${msTextA} timeD`}>
                {moment(data).format('hh:mm:A')}
              </span>
            </p>
          </div>
        </div>
      );
    }
  };

  const isPublicDiv = () => {
    return (
      <div
        className="message"
        style={{ maxWidth: window.innerWidth <= 600 ? '60%' : '100%' }}
      >
        <Avatar
          avatar={avatar}
          setChangedata={setChangedata}
          isAdmin={isAdmin}
          avatarStatus={avatarStatus}
          ownerMode={ownerMode}
          bellNotification={bellNotification}
          userId={userId}
          color={color}
          isModeAdmin={isModeAdmin}
        />

        <div
          className={!isAdmin ? msText : msTextA}
          style={{ boxSizing: 'border-box', maxWidth: '100%', background: 'transparent' }}
        >
          <h5
            className={!isAdmin ? msText : msTextA}
            onDoubleClick={() => setUserMessagePrivate(userId, name)}
            style={{ cursor: 'pointer', textTransform: 'capitalize' }}
          >
            {name}
          </h5>
          <p
            className={!isAdmin ? msText : msTextA}
            style={{ wordWrap: 'break-word', whiteSpace: '-moz-pre-wrap' }}
          >
            {message}
            <span className={!isAdmin ? `${msText} timeD` : `${msTextA} timeD`}>
              {moment(data).format('hh:mm:A')}
            </span>
          </p>
        </div>
      </div>
    );
  };

  return <React.Fragment>{privat ? isPrivateDiv() : isPublicDiv()}</React.Fragment>;
};

export default Message;
