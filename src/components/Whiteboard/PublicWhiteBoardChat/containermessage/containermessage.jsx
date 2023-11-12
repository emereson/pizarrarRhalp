import React, { Fragment, useEffect, useRef } from 'react';
import Message from '../message/message';

import '../PublicChat.css';

import ScrollToBottom from 'react-scroll-to-bottom';
import { useUser } from 'components/UserManagment/UserProvider';
import { useUserRole } from 'services/cognito.service';
import { USER_ROLES } from 'enums/constants.enum';

const Containermessage = ({
  visitors,
  setChangedata,
  ownerMode,
  bellNotification,
  textColor,
  statusAvatar,
  setUserMessagePrivate,
  isModeAdmin
}) => {
  const scrollDiv = useRef(null);

  const scrollToBottom = () => {
    scrollDiv.current.scrollIntoView({ behavior: 'smooth' });
  };

  const { user } = useUser();

  useEffect(() => {
    scrollToBottom();

    //return () => scrollDiv.removeEventListener("scroll", scrollToBottom);
  }, [visitors]);

  const sinEfe = () => null;

  const userRole = useUserRole();

  const isTeacher = [USER_ROLES.TEACHERS].includes(userRole);

  return (
    <Fragment>
      <ScrollToBottom className="container-messages-wp">
        <div className="sctopmessage"></div>

        {Array.isArray(visitors.messages)
          ? visitors.messages.map((message, i) => {
              return (
                <Message
                  key={i}
                  message={message.message}
                  setChangedata={
                    message.autorid === window.sessionStorage.getItem('user_Id')
                      ? setChangedata
                      : sinEfe
                  }
                  name={message.name}
                  data={message.createdAt}
                  avatarStatus={
                    message.autorid === window.sessionStorage.getItem('user_Id')
                      ? statusAvatar
                      : message.avatarStatus
                  }
                  avatar={message.avatar}
                  textColor={textColor}
                  bellNotification={bellNotification}
                  ownerMode={ownerMode}
                  color={message.color}
                  isModeAdmin={isModeAdmin}
                  isAdmin={message.isAdmin}
                  userId={message.autorid}
                  privat={message.private}
                  recipient={message.recipient}
                  setUserMessagePrivate={setUserMessagePrivate}
                />
              );
            })
          : null}

        <div ref={scrollDiv} className="scmessage"></div>
      </ScrollToBottom>
    </Fragment>
  );
};

export default Containermessage;
