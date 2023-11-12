import React, { Fragment, useState } from 'react';
import { Route } from 'react-router-dom';
import SoundConfig from 'components/Chat/SoundConfig';
import IconPaths from 'components/Home/IconPaths';
import Login from 'components/UserManagment/Login';
import { navigation } from 'utils/homeNavigation';
import { playSound } from 'helpers/PlaySound';
import HomeIcon from './HomeIcon';
import StaticHomeIcon from './StaticHomeIcon';
import TeacherChatRoom from '../Chat/teacherChatRoom';
import { BackgroundTool } from 'components/UserManagment/StudentProfile/components/StudentCard/components/BackgroundTool';
import { useUserRole } from 'services/cognito.service';
import { USER_ROLES } from 'enums/constants.enum';
import './styles.css';

const Icons = ({ ChatStatus, Width }) => {
  const [HideIcons, setHideIcons] = useState(false);
  return (
    <>
      {!HideIcons && <IconPaths></IconPaths>}
      {!HideIcons && (
        <HomeIcon
          status={ChatStatus}
          hideIcons={() => setHideIcons(false)}
          Width={Width}
        ></HomeIcon>
      )}
      <Route path="/login">
        <Login
          unhideIcons={() => setHideIcons(false)}
          hideIcons={() => setHideIcons(true)}
        ></Login>
      </Route>
    </>
  );
};

const TeacherDashboard = ({ activeColorChat }) => {
  const userRole = useUserRole();
  const [newPosition, setNewPositon] = useState(false);
  const [ChatStatus, setChatStatus] = useState(false);
  const [Menus, setMenus] = useState({
    chatList: false,
    icons: true
  });
  const [Animated, setAnimated] = useState(false);

  let iconsWidth = newPosition ? '50%' : '100%';

  const newPositionH = value => setNewPositon(value);

  return (
    <Fragment>
      <div className="teacher-header">
        <p className="teacher-header-title">Live Language Classes Online</p>
        <p className="teacher-header-subtitle">
          Best site on the web to learn the language you love
        </p>
      </div>
      <div className="teacher-root-container">
        {!ChatStatus && <Icons ChatStatus={ChatStatus} />}
        {ChatStatus && (
          <div
            id="teacher-chat-icons-container"
            className={
              !Menus.chatList
                ? 'teacher-chat-icons-container -small'
                : 'teacher-chat-icons-container'
            }
          >
            {navigation.map((navigate, index) => (
              <StaticHomeIcon
                key={index}
                img={navigate.img}
                route={navigate.route}
                text={navigate.text}
                alt={navigate.alt}
              />
            ))}
          </div>
        )}
        {ChatStatus && Menus.icons && (
          <div id="teacher-icons-responsive">
            {navigation.map((navigate, index) => (
              <StaticHomeIcon
                key={index}
                img={navigate.img}
                route={navigate.route}
                text={navigate.text}
                alt={navigate.alt}
              />
            ))}
          </div>
        )}
        <TeacherChatRoom
          hideIcons={() => setMenus({ ...Menus, icons: false })}
          close={() => {
            setAnimated(false);
            setTimeout(() => {
              setMenus({ icons: true, chatList: false });
            }, 500);
          }}
          iconClick={() => {
            playSound(SoundConfig.chat_hidden_audio);
            setMenus({ icons: false, chatList: true });
            setTimeout(() => {
              setAnimated(true);
            }, 1000);
          }}
          openChatAutomatically={() => {
            setMenus({ icons: false, chatList: true });
            setTimeout(() => {
              setAnimated(true);
            }, 1000);
          }}
          hideComponent={!Menus.chatList}
          hideInput={Menus.icons}
          showPlus={Menus.icons}
          activeColorChat={activeColorChat}
          setChatStatus={setChatStatus}
          newPositionH={newPositionH}
        />
      </div>
      {userRole === USER_ROLES.ADMINS && (
        <div
          style={{
            // Esto es temporal, mientras se define donde colocar el boton
            position: 'absolute',
            top: 0
          }}
        >
          <BackgroundTool address="homeImageUrl" storage="homeFileUrl" />
        </div>
      )}
    </Fragment>
  );
};

export default TeacherDashboard;
