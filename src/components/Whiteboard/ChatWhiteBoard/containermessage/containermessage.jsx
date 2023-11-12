import React, { Fragment, useEffect, useRef } from 'react';
import Message from '../message/message';
import Notification from '../notification';
import '../ChatWhiteboard.css';

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

    //return () => scrollDiv.removeEventListener("scroll", scrollToBottom);
  }, [visitors]);

  return (
    <Fragment>
      <ScrollToBottom className="container-messages">
        <div className="sctopmessage"></div>

        {Array.isArray(visitors.messages)
          ? visitors.messages.map((message, i) => (
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
            ))
          : null}

        {notification ? <Notification /> : null}

        <div ref={scrollDiv} className="scmessage"></div>
      </ScrollToBottom>
    </Fragment>
  );
};

export default Containermessage;
