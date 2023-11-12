import React, { Fragment, useEffect, useRef } from 'react';
import Message from '../message/message';
import Notification from '../notification';
import '../Chat.css';

import ScrollToBottom from 'react-scroll-to-bottom';

const Containermessage = ({
  visitors,
  setChangedata,
  avatarStatus,
  statusAvatar,
  changedata,
  setImageurl,
  ownerMode,
  bellNotification,
  bell,
  changeTextColor,
  textColor,
  containermessage,
  notification
}) => {
  const scrollDiv = useRef(null);

  const scrollToBottom = () => {
    scrollDiv.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visitors]);

  return (
    <Fragment>
      <div className="container-messages" style={{ scrollbarWidth: 'none' }}>
        <div className="sctopmessage"></div>

        {Array.isArray(visitors.messages)
          ? visitors.messages.map((message, i) => {
              if (message.autor) {
                return (
                  <Message
                    key={i}
                    message={message.message}
                    setChangedata={setChangedata}
                    name={message.autor.name}
                    data={message.createdAt}
                    isUser={message.autor.isUser}
                    avatarStatus={message.autor.avatarStatus}
                    avatar={message.autor.avatar}
                    textColor={textColor}
                    bellNotification={bellNotification}
                    ownerMode={ownerMode}
                  />
                );
              } else {
                window.sessionStorage.clear();
                window.location.reload(false);
              }
            })
          : null}

        {notification ? <Notification /> : null}

        <div ref={scrollDiv} className="landing-page-scmessage"></div>
      </div>
    </Fragment>
  );
};

export default Containermessage;
