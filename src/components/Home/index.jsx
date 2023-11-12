import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import HomeIcon from './HomeIcon';
import StaticHomeIcons from './StaticHomeIcons';
import { navigation } from 'utils/homeNavigation';
import VisitorChatRoom from '../Chat/visitorChatRoom';
import './styles.css';
import Login from 'components/UserManagment/Login';
import IconPaths from './IconPaths';

const Icons = ({ ChatStatus, Width }) => {
  const [HideIcons, setHideIcons] = useState(false);
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const Home = ({ activeColorChat }) => {
  const [ChatStatus, setChatStatus] = useState(false);
  return (
    <div className="home-container">
      <div className="home-header">
        <p className="home-header-title">Live Language Classes Online</p>
        <p className="home-header-subtitle">
          Best site on the web to learn the language you love
        </p>
      </div>
      <div
        className={
          !ChatStatus ? 'chat-icons-container small' : `chat-icons-container visible`
        }
      >
        {!ChatStatus && <Icons ChatStatus={ChatStatus} />}
        {ChatStatus &&
          navigation.map((navigate, index) => (
            <StaticHomeIcons
              key={index}
              img={navigate.img}
              route={navigate.route}
              text={navigate.text}
              alt={navigate.alt}
            />
          ))}
      </div>
      <VisitorChatRoom
        activeColorChat={value => {
          activeColorChat(value);
          setChatStatus(value);
        }}
      />
    </div>
  );
};

export default Home;
