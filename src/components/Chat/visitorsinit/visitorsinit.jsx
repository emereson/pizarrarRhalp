import React from 'react';

import '../Chat.css';

const VisitorsInit = ({
  user,
  showMessages,
  deleteToDataBase,
  updateUserInfo,
  select
}) => {
  let styleClass = '';

  if (select === user.roomid) {
    styleClass = 'visitorSelect';
    //sty= "newMessage";
  } else {
    if (user.statusMessage === false) {
      styleClass = 'unselected-conversation';
    } else {
      styleClass = 'newMessage';
    }
  }

  return (
    <div
      className="VisitorsInit "
      onClick={e => {
        showMessages(user.roomid, e);
        updateUserInfo(user._id);
      }}
    >
      <div
        className={styleClass}
        onDoubleClick={e => deleteToDataBase(user._id, user.roomid, e)}
      ></div>
      <div className="nameVisitor">{user.name}</div>
    </div>
  );
};

export default VisitorsInit;
