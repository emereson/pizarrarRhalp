import Tachometer from 'components/common/Tachometer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './img/branak-logo-l.png';
import styles from './NewLandingPage.module.scss';
import { landingConstants } from './constants';
import MailerForm from './components/MailerForm';
import { Add, Minimize } from '@material-ui/icons';
import { ReactComponent as PauseIcon } from 'assets/img/pause-icon.svg';
import VisitorChatRoom from './Chat/visitorChatRoom';
import TeacherChatRoom from './Chat/teacherChatRoom';
import { playSound } from 'helpers/PlaySound';
import SoundConfig from 'components/Chat/SoundConfig';

export default function NewLandingPage({ isAdmin }) {
  const history = useHistory();
  const [Playing, setPlaying] = useState(false);
  const [HideButton, setHideButton] = useState(false);
  const video = useRef();
  const [OpenTestimonies, setOpenTestimonies] = useState([]);
  const [floating, setfloating] = useState(false);
  const [heightBody, setHeightBody] = useState('');
  const [Menus, setMenus] = useState({
    chatList: false,
    icons: true
  });
  const handleRedirect = () => {
    history.push('/take-exam/joinBranakTest');
  };

  useEffect(() => {
    if (Playing) {
      setTimeout(() => {
        setHideButton(true);
      }, 3000);
    }
  }, [Playing]);

  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
  }, []);

  const playVideo = () => {
    if (video.current.paused) {
      video.current.play();
    } else {
      video.current.pause();
    }
  };

  const openTestimony = id => {
    if (OpenTestimonies.includes(id)) {
      setOpenTestimonies(OpenTestimonies.filter(d => d !== id));
    } else {
      setOpenTestimonies(OpenTestimonies.concat([id]));
    }
  };

  const mouseOver = useCallback(() => {
    setHideButton(false);
  }, [Playing]);

  const mouseLeave = useCallback(() => {
    setTimeout(() => {
      if (Playing) setHideButton(true);
    }, 3000);
  }, [Playing]);

  return (
    <div className={styles.landingPageContainer}>
      <div className={styles.initialView}>
        <div className={styles.logoAndForm}>
          <img className={styles.logoImage} src={logo} alt="logoIcon" />
          <div className={styles.mailer}>
            <div className={styles.mailerForm}>
              <MailerForm />
            </div>
          </div>
        </div>
        <div className={styles.landingBottomBanner}>
          <p>Las clases de Inglés más personalizadas de toda la red</p>
        </div>
      </div>
      <div className={styles.initialViewResponsive}>
        <div className={styles.containers__image}>
          <img className={styles.logoImage} src={logo} alt="logoIcon" />
          <div className={styles.landingBottomBanner}>
            <p>Las clases de Inglés más personalizadas de toda la red</p>
          </div>
        </div>
        <div className={styles.containers}>
          <div className={styles.mailerForm}>
            <MailerForm floating={floating} setfloating={setfloating} />
          </div>
        </div>
      </div>
      <div className={styles.videoAndTachometer}>
        <div className={styles.videoContainer}>
          <video
            ref={video}
            className={styles.video}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            src="https://branak-files225457-dev.s3.amazonaws.com/cartoon_ad.mp4"
            type="video/mp4"
            onClick={playVideo}
            onMouseOver={mouseOver}
            onMouseLeave={mouseLeave}
          />
          {Playing ? (
            <PauseIcon
              onClick={playVideo}
              onMouseOver={mouseOver}
              className={HideButton ? styles.pauseIcon__hide : styles.pauseIcon}
            />
          ) : (
            <div onClick={playVideo} className={styles.arrowRight} />
          )}
        </div>
        <div onClick={handleRedirect} className={styles.tachometerInLanding}>
          <Tachometer
            landingPageLink={window.location.href + '/take-exam/joinBranakTest'}
            title="Prueba tu nivel"
            defaultDimentions={{ width: 370, height: 200 }}
            forceBackgroundColor={'yellow'}
            archText="TEST YOUR ENGLISH"
          />
          <div className={styles.btnStartTest}>START</div>
        </div>
      </div>
      <div className={styles.links}>
        <p className={styles.text}>Pulsa para contactar a un profesor</p>
        <div className={styles.links__links}>
          {landingConstants.links.map((item, index) => {
            return (
              <a
                key={index}
                href={item.link}
                className={styles.linkButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={item.icon} alt="link-icon" />
              </a>
            );
          })}
        </div>
      </div>
      <div className={styles.features1}>
        {landingConstants.features1.map((item, index) => {
          return (
            <div className={styles.items} key={index}>
              <img
                key={index}
                className={styles.itemsImage}
                src={item.icon}
                style={{ width: index === 2 ? 90 : 50, maxWidth: index === 2 ? 90 : 50 }}
                alt="entrevista"
              />
              <h2 className={styles.itemText}> {item.text} </h2>
            </div>
          );
        })}
      </div>
      <div className={styles.features1} style={{ background: '#c0e700' }}>
        {landingConstants.features2.map((item, index) => {
          return (
            <div className={styles.items} key={index}>
              <img
                className={index ? styles.itemsImageSpecificWidth : styles.itemsImage}
                src={item.icon}
                alt="entrevista"
              />
              <h2 className={styles.itemText}> {item.text} </h2>
            </div>
          );
        })}
      </div>
      <div className={styles.listsContainer}>
        <p className={styles.title}>¿Quieres más?</p>
        <div className={styles.lists}>
          <div className={styles.list}>
            {landingConstants.wantMore.list1.map((item, index) => {
              return <React.Fragment key={index}>{item}</React.Fragment>;
            })}
          </div>
          <div className={styles.list}>
            {landingConstants.wantMore.list2.map((item, index) => {
              return <React.Fragment key={index}>{item}</React.Fragment>;
            })}
          </div>
        </div>
      </div>
      {landingConstants.testimonies.map((item, index) => {
        return (
          <div
            className={styles.testimony}
            style={{
              padding: item.steps ? '20px 0 10px 0' : '10px 0',
              justifyContent: item.steps ? 'space-between' : 'flex-start',
              background: item.steps ? '#ffc710' : '#459aff'
            }}
            key={index}
          >
            <div className={styles.testimonyHeader}>
              {/* <img /> */}
              <p
                className={styles.testimonyTitle}
                style={{ color: item.steps ? '#354458' : '#fff' }}
              >
                {item.owner}
              </p>
            </div>
            {item.text && (
              <>
                <p
                  className={
                    OpenTestimonies.includes(index)
                      ? styles.testimonyText__allText
                      : styles.testimonyText
                  }
                >
                  {item.text}
                </p>

                <p className={styles.testimonyOwnerName}>{item.name}</p>
              </>
            )}

            {!item.steps && (
              <>
                {!OpenTestimonies.includes(index) ? (
                  <Add
                    onClick={() => openTestimony(index)}
                    className={styles.testimonyArrow}
                    style={{ fontSize: '30' }}
                  />
                ) : (
                  <Minimize
                    onClick={() => openTestimony(index)}
                    className={styles.testimonyArrow__upsideDown}
                    style={{ fontSize: '30' }}
                  />
                )}
              </>
            )}

            {item.steps && (
              <div className={styles.itemsContainer}>
                {item.steps &&
                  item.steps.map((step, i) => {
                    return (
                      <div className={styles.items} key={i}>
                        <img
                          className={styles.itemsImage}
                          src={step.icon}
                          alt="entrevista"
                        />
                        <p className={styles.itemsText} style={{ color: '#000' }}>
                          {' '}
                          {step.text}{' '}
                        </p>
                      </div>
                    );
                  })}
              </div>
            )}

            {item.steps && <div style={{ height: '50px' }}></div>}
          </div>
        );
      })}
      <div className={styles.links}>
        <p className={styles.text}>Pulsa para contactar a un profesor</p>
        <div className={styles.links__links}>
          {landingConstants.links.map((item, index) => {
            return (
              <a
                key={index}
                href={item.link}
                className={styles.linkButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={item.icon} alt="link-icon" />
              </a>
            );
          })}
        </div>
        {!isAdmin && <VisitorChatRoom />}
        {isAdmin && (
          <TeacherChatRoom
            heightBody={heightBody}
            hideIcons={() => setMenus({ ...Menus, icons: false })}
            close={() => {
              setTimeout(() => {
                setMenus({ icons: true, chatList: false });
              }, 500);
            }}
            iconClick={() => {
              playSound(SoundConfig.chat_hidden_audio);
              setMenus({ icons: false, chatList: true });
            }}
            openChatAutomatically={() => {
              setMenus({ icons: false, chatList: true });
            }}
            hideComponent={!Menus.chatList}
            hideInput={Menus.icons}
            showPlus={Menus.icons}
            newPositionH={() => {}}
            activeColorChat={() => {}}
          />
        )}
      </div>
    </div>
  );
}
