import React from 'react';
import '../Chat.css';

const isAdminRender = props => {
  if (props.avatarStatus && props.avatar !== '') {
    if (props.isUser) {
      return (
        <img
          className="image"
          onClick={e => props.bellNotification(e)}
          src={props.avatar}
          alt="avatar"
        />
      );
    } else {
      return (
        <img
          className="image"
          onClick={e => props.setChangedata(e)}
          src={props.avatar}
          alt="avatar"
        />
      );
    }
  } else {
    if (props.isUser) {
      return <div className="avatarUser" onClick={e => props.bellNotification(e)}></div>;
    } else {
      return <div className="avatar" onClick={e => props.setChangedata(e)}></div>;
    }
  }
};

const isUserRender = props => {
  if (props.avatarStatus && props.avatar !== '') {
    if (props.isUser) {
      return (
        <img
          className="image"
          onClick={e => props.setChangedata(e)}
          src={props.avatar}
          alt="avatar"
        />
      );
    } else {
      return <img className="image" src={props.avatar} alt="avatar" />;
    }
  } else {
    if (props.isUser) {
      return <div className="avatarUser" onClick={e => props.setChangedata(e)}></div>;
    } else {
      return <div className="avatar"></div>;
    }
  }
};

export default function Avatar(props) {
  return (
    <div className="avatar-container">
      {props.ownerMode ? isAdminRender(props) : isUserRender(props)}
    </div>
  );
}
