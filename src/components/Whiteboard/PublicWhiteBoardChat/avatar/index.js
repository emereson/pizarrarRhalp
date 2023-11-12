import { USER_ROLES } from 'enums/constants.enum';
import React from 'react';
import { useUserRole } from 'services/cognito.service';
import '../PublicChat.css';

const isAdminRender = props => {
  if (props.avatarStatus && props.avatar !== '') {
    if (props.userId === window.sessionStorage.getItem('user_Id')) {
      return (
        <img
          className="image"
          src={props.avatar}
          alt="avatar"
          onClick={e => props.setChangedata(e)}
        />
      );
    } else {
      return (
        <img
          className="image"
          src={props.avatar}
          alt="avatar"
          onDoubleClick={() => props.bellNotification(props.userId)}
        />
      );
    }
  } else {
    if (props.userId === window.sessionStorage.getItem('user_Id')) {
      return (
        <div
          style={{
            display: 'fixed',
            margin: 'auto',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            borderRadius: '50%',
            background: props.color
          }}
          onClick={e => props.setChangedata(e)}
        ></div>
      );
    } else {
      return (
        <div
          style={{
            display: 'fixed',
            margin: 'auto',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            borderRadius: '50%',
            background: props.color
          }}
          onDoubleClick={() => props.bellNotification(props.userId)}
        ></div>
      );
    }
  }
};

const handleClick = (props, e) => {
  if (props.userId === window.sessionStorage.getItem('user_Id')) props.setChangedata(e);
};

const handleDoubleClick = props => {
  if (props.userId !== window.sessionStorage.getItem('user_Id'))
    props.bellNotification(props.userId);
};

const isUserRender = props => {
  if (props.avatarStatus && props.avatar !== '') {
    return (
      <img
        className="image"
        src={props.avatar}
        alt="avatar"
        onClick={e => handleClick(props, e)}
        onDoubleClick={() => handleDoubleClick(props)}
      />
    );
  } else {
    return (
      <div
        id="colorAvatar"
        style={{
          display: 'fixed',
          margin: 'auto',
          width: '30px',
          height: '30px',
          cursor: 'pointer',
          borderRadius: '50%',
          background: props.color
        }}
        onClick={e => handleClick(props, e)}
        onDoubleClick={() => handleDoubleClick(props)}
      ></div>
    );
  }
};

export default function Avatar(props) {
  const role = useUserRole();
  return (
    <div className="avatar-container">
      {props.isModeAdmin ? isAdminRender(props) : isUserRender({ ...props, role })}
    </div>
  );
}
