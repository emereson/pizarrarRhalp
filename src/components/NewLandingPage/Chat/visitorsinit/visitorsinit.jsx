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
    styleClass = 'landing-page-visitorSelect';
  } else {
    if (user.statusMessage === false) {
      styleClass = 'landing-page-unselected-conversation';
    } else {
      styleClass = 'landing-page-newMessage';
    }
  }

  return (
    <div
      className="landing-page-VisitorsInit "
      onClick={e => {
        showMessages(user.roomid, e);
        updateUserInfo(user._id);
      }}
    >
      <div
        className={styleClass}
        onDoubleClick={e => deleteToDataBase(user._id, user.roomid, e)}
      ></div>
      <div className="landing-page-nameVisitor">{user.name}</div>
    </div>
  );
};

export default VisitorsInit;
