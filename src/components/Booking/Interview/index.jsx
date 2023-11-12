// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment, useContext, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { useLocation, useHistory } from 'react-router-dom';
import {
  interview_and_footer,
  interview_container,
  interview_wrapper,
  calendar_container,
  time_container,
  time_text_p,
  user_info_container,
  time_component,
  interview_footer,
  test_footer,
  description_text,
  continueButton,
  backIcon,
  calender_text,
  time_text,
  information_text,
  rounded
} from './styles';
import { ReactComponent as BackIcon } from 'assets/icons/back.svg';
import { ReactComponent as NextIcon } from 'assets/icons/forward.svg';
import { footer } from 'appStyles';
import CalendarComponent from 'components/common/Calendar';
import Footer from '../Footer';
import UserInfo from 'components/common/UserInfo';
import { checkUserinfo } from 'utils/userUtils';
import moment from 'moment';
import ArrowTimePicker from 'components/common/ArrowTimePicker';
import './style.css';
import { booking_footer } from '../styles';
import SwipeableViews from 'react-swipeable-views';
import { footer_course, footer_special } from '../Course/styles';

const Interview = () => {
  let history = useHistory();
  const [step, setStep] = useState(0);
  const [responsiveStep, setresponsiveStep] = useState(0);
  const [clickSelect, setClickSelect] = useState('');
  const [interviewDate, setinterviewDate] = useState(null);
  const [timeInterview, settimeInterview] = useState(moment(0, 'HH:MM'));
  const [ShowComponent, setShowComponent] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [userInfo, setuserInfo] = useState({
    name: '',
    email: '',
    tel: '',
    country: '',
    notes: '',
    requireMail: false,
    isStudent: ''
  });

  const location = useLocation();

  const canContinue = () => {
    if (window.screen.width < 600) {
      const date = new Date(timeInterview);
      if (date.getHours() > 0 && interviewDate && step < 1) {
        return true;
      }
    }
  };

  const goBack = () => {
    if (step === 0) {
      history.push('/');
      return;
    }
    setStep(prev => (prev <= 1 ? 0 : prev - 1));
  };

  const goBackResponsive = () => {
    if (responsiveStep === 0) goBack();
    if (responsiveStep === 1) setresponsiveStep(0);
    if (responsiveStep === 2) setresponsiveStep(1);
    if (responsiveStep === 3) setresponsiveStep(2);
  };

  useEffect(() => {
    setresponsiveStep(1);
    if (window.innerWidth > 750) setShowComponent(true);
    setTimeout(() => {
      setresponsiveStep(0);
    }, 60);
    setTimeout(() => {
      setShowComponent(true);
    }, 400);
  }, []);

  const isSelectedArrow =
    clickSelect === 'interviewArrow' &&
    (location.pathname.includes('level') || location.pathname.includes('interview'));

  return (
    <div css={interview_and_footer} style={{ overflowY: 'auto', width: '100%' }}>
      <div
        css={interview_container}
        style={{ marginTop: window.innerWidth > 750 ? '30px' : '0px' }}
      >
        <NextIcon
          onClick={() => setStep(prev => prev + 1)}
          css={continueButton}
          width="25"
          height="25"
          style={{
            display: canContinue() ? 'block' : 'none',
            position: 'absolute',
            top: 0,
            right: 5
          }}
        />
        <BackIcon
          onClick={window.innerWidth < 750 ? goBackResponsive : goBack}
          css={backIcon}
          width="25"
          height="25"
        />
        <div css={interview_wrapper} id="interview-wrapper">
          {step === 0 && (
            <Fragment>
              <div
                css={calendar_container}
                onClick={() => setClickSelect('interviewCalendar')}
                className={`${
                  clickSelect === 'interviewCalendar' &&
                  location.pathname.includes('interview')
                    ? 'interview-select-componnent'
                    : ''
                }
                ${
                  clickSelect === 'interviewCalendar' &&
                  location.pathname.includes('level')
                    ? 'level-select-componnent'
                    : ''
                }`}
              >
                <CalendarComponent
                  value={interviewDate}
                  onChange={date => setinterviewDate(date)}
                />
                <div css={[description_text, calender_text]}>
                  <span style={{ color: '#fff' }}>
                    {interviewDate ? 'day chosen' : 'choose a day'}
                  </span>
                  <div
                    css={rounded}
                    style={{ visibility: interviewDate ? 'visible' : 'hidden' }}
                  >
                    <label></label>
                  </div>
                </div>
              </div>
              <div css={time_container} className="time-container">
                <div
                  css={time_component}
                  onClick={() => setClickSelect('interviewArrow')}
                  className={`${
                    clickSelect === 'interviewArrow' &&
                    location.pathname.includes('interview')
                      ? 'interview-select-componnent'
                      : ''
                  }
                  ${
                    clickSelect === 'interviewArrow' &&
                    location.pathname.includes('level')
                      ? 'level-select-componnent'
                      : ''
                  }`}
                >
                  <ArrowTimePicker
                    time={timeInterview}
                    settimeInterview={settimeInterview}
                    selected={isSelectedArrow}
                    showing={isSelectedArrow}
                  />
                  <p css={time_text_p}>Use your country time</p>
                </div>
                <div css={[description_text, time_text]}>
                  <span style={{ color: '#fff' }}>
                    {new Date(timeInterview).getHours() > 0
                      ? 'hour chosen'
                      : 'choose the hour'}{' '}
                  </span>
                  <div
                    css={rounded}
                    style={{
                      visibility:
                        new Date(timeInterview).getHours() > 0 ? 'visible' : 'hidden'
                    }}
                  >
                    <label></label>
                  </div>
                </div>
              </div>
            </Fragment>
          )}

          {(step > 0 || window.screen.width > 567) && (
            <div
              css={user_info_container}
              onClick={() => setClickSelect('interviewUser')}
              className={`${
                clickSelect === 'interviewUser' && location.pathname.includes('interview')
                  ? 'interview-select-componnent'
                  : ''
              }
              ${
                clickSelect === 'interviewUser' && location.pathname.includes('level')
                  ? 'level-select-componnent'
                  : ''
              }`}
            >
              <UserInfo
                userInfo={userInfo}
                fullWidth
                onChange={e => {
                  e.persist();
                  if (e.target.type === 'checkbox') {
                    console.log('hey');
                    setuserInfo(prevState => {
                      return {
                        ...prevState,
                        [e.target.name]: e.target.checked
                      };
                    });
                    return;
                  }

                  setuserInfo(prevState => {
                    return { ...prevState, [e.target.name]: e.target.value };
                  });
                }}
              />
              <div css={[description_text, information_text]}>
                <span style={{ color: '#fff' }}>your information</span>
                <div
                  css={rounded}
                  style={{
                    visibility: checkUserinfo({
                      ...userInfo,
                      country: userInfo.country
                    })
                      ? 'visible'
                      : 'hidden'
                  }}
                >
                  <label></label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          css={interview_wrapper}
          style={{ maxHeight: '60vh', opacity: ShowComponent ? 1 : 0 }}
          id="interview-wrapper-responsive"
        >
          <SwipeableViews
            index={responsiveStep}
            disabled={false}
            enableMouseEvents
            disableLazyLoading
            slideStyle={{
              display: 'flex',
              minHeight: '60vh',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingBottom: '75px',
              alignItems: 'center'
            }}
            onChangeIndex={value => setresponsiveStep(value)}
          >
            <div style={{ width: '100%' }} className="flex-c-ac">
              <div
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: '5px',
                  marginBottom: '5px',
                  width: '90%',
                  alignSelf: 'center'
                }}
              >
                <span
                  className={!interviewDate ? 'twinkleText' : null}
                  style={{ color: '#fff', fontSize: '14px' }}
                >
                  {interviewDate ? 'day chosen' : 'choose a day'}
                </span>
                <div
                  css={rounded}
                  style={{ visibility: interviewDate ? 'visible' : 'hidden' }}
                >
                  <label></label>
                </div>
              </div>
              <div
                css={calendar_container}
                onClick={() => {
                  setClickSelect('interviewCalendar');
                }}
                style={{
                  width: window.innerWidth < 750 ? '90%' : 'inherit',
                  alignSelf: window.innerWidth < 750 ? 'center' : 'inherit',
                  padding: window.innerWidth < 750 ? '0px' : 'inherit'
                }}
                className={`${
                  clickSelect === 'interviewCalendar' &&
                  location.pathname.includes('interview')
                    ? 'interview-select-componnent'
                    : ''
                }
                            ${
                              clickSelect === 'interviewCalendar' &&
                              location.pathname.includes('level')
                                ? 'level-select-componnent'
                                : ''
                            }`}
              >
                <CalendarComponent
                  value={interviewDate}
                  onChange={date => setinterviewDate(date)}
                />

                {interviewDate && (
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      flexDirection: 'row',
                      position: 'absolute',
                      justifyContent: 'flex-end',
                      bottom: '-30px',
                      alignItems: 'center'
                    }}
                  >
                    <p
                      className="next_button_p"
                      style={{ position: 'relative' }}
                      onClick={() => {
                        setresponsiveStep(1);
                      }}
                    >
                      choose hour
                    </p>
                    <div
                      className="arrowNextAnimation"
                      style={{ transform: 'rotateZ(180deg)' }}
                      onClick={() => {
                        setresponsiveStep(1);
                      }}
                    >
                      <svg
                        width="25.208px"
                        height="8.538px"
                        viewBox="0 0 22.208 6.538"
                        enableBackground="new 0 0 22.208 6.538"
                      >
                        <line
                          fill="none"
                          stroke={false ? '#2605FB' : 'white'}
                          strokeWidth="1.1962"
                          strokeMiterlimit="10"
                          x1="6.508"
                          y1="3.294"
                          x2="22.208"
                          y2="3.294"
                        />
                        <polygon
                          fill={false ? '#2605FB' : 'white'}
                          points="6.674,6.538 0.208,3.443 6.692,0 "
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              css={time_container}
              className="time-container"
              style={{
                width: window.innerWidth < 750 ? '90%' : 'inherit',
                marginTop: window.innerWidth < 750 ? '25px' : 'inherit',
                minHeight: '37vh',
                alignSelf: window.innerWidth < 750 ? 'center' : 'inherit',
                border: '1px solid #fff'
              }}
            >
              <div
                css={time_component}
                onClick={() => setClickSelect('interviewArrow')}
                className={`${
                  clickSelect === 'interviewArrow' &&
                  location.pathname.includes('interview')
                    ? 'interview-select-componnent'
                    : ''
                }
                      ${
                        clickSelect === 'interviewArrow' &&
                        location.pathname.includes('level')
                          ? 'level-select-componnent'
                          : ''
                      }`}
              >
                <ArrowTimePicker
                  time={timeInterview}
                  settimeInterview={settimeInterview}
                  selected={isSelectedArrow}
                  showing={isSelectedArrow}
                  timeInterview={timeInterview}
                  responsiveMode
                  setresponsiveStep={e => setresponsiveStep(e)}
                />
              </div>
            </div>

            <div style={{ width: '100%', marginTop: 27 }} className="flex-c-ac-jc">
              <div
                className="flex-c-ac-jc"
                style={{
                  width: '90%',
                  marginTop: window.innerWidth < 750 ? '25px' : 'inherit',
                  minHeight: window.innerWidth < 750 ? '37vh' : 'inherit',
                  border: '1px solid #fff'
                }}
              >
                <div
                  css={user_info_container}
                  style={{
                    paddingTop: 0,
                    width: window.innerWidth < 750 ? '100%' : 'inherit',
                    alignSelf: window.innerWidth < 750 ? 'center' : 'inherit'
                  }}
                  onClick={() => setClickSelect('interviewUser')}
                  className={`${
                    clickSelect === 'interviewUser' &&
                    location.pathname.includes('interview')
                      ? 'interview-select-componnent'
                      : ''
                  }
                    ${
                      clickSelect === 'interviewUser' &&
                      location.pathname.includes('level')
                        ? 'level-select-componnent'
                        : ''
                    }`}
                >
                  <UserInfo
                    userInfo={userInfo}
                    fullWidth
                    onChange={e => {
                      e.persist();
                      if (e.target.type === 'checkbox') {
                        setuserInfo(prevState => {
                          return {
                            ...prevState,
                            [e.target.name]: e.target.checked
                          };
                        });
                        return;
                      }

                      setuserInfo(prevState => {
                        return { ...prevState, [e.target.name]: e.target.value };
                      });
                    }}
                  />
                  <div className="responsive-info-title">
                    <p style={{ color: '#fff', marginBottom: 0, fontSize: 17 }}>
                      your information
                    </p>
                    <div
                      className="rounded"
                      style={{
                        visibility: checkUserinfo({
                          ...userInfo,
                          country: userInfo.country
                        })
                          ? 'visible'
                          : 'hidden'
                      }}
                    >
                      <label
                        style={{
                          margin: 'auto 0 auto 5px',
                          marginBottom: 0,
                          position: 'relative',
                          top: 1,
                          right: 0
                        }}
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <p
                className="next_button_p"
                style={{
                  position: 'relative',
                  bottom: '0',
                  right: '0',
                  alignSelf: 'flex-end',
                  visibility: checkUserinfo({
                    ...userInfo,
                    country: userInfo.country
                  })
                    ? 'visible'
                    : 'hidden',
                  marginRight: '20px',
                  marginTop: '10px'
                }}
                onClick={() => {
                  setresponsiveStep(3);
                }}
              >
                Done
              </p>
            </div>
            <div
              className="flex-c-ac-jc interview-select-componnent"
              style={{
                width: '90%',
                border: '1px solid #fff',
                marginTop: '25px',
                backgroundColor: location.pathname.includes('interview')
                  ? 'rgba(49, 136, 223, 0.2)'
                  : 'rgba(195, 136, 255, 0.2)',
                minHeight: window.innerWidth < 750 ? '37vh' : 'inherit'
              }}
            >
              <div
                css={[
                  footer,
                  location.pathname.includes('course') ? footer_course : footer_special
                ]}
                style={{ width: '100%' }}
              >
                {!SuccessMessage ? (
                  <React.Fragment>
                    {interviewDate ? (
                      <Footer
                        isEvent
                        userInfo={userInfo}
                        transparent
                        summaryFontSize={18}
                        morePadding
                        country={userInfo.country}
                        successFunction={() => setSuccessMessage(true)}
                        isWithUserInfo={checkUserinfo({
                          ...userInfo,
                          country: userInfo.country
                        })}
                        event={'interview'}
                        eventInfo={{
                          timeInterview,
                          interviewDate
                        }}
                      />
                    ) : (
                      <div css={booking_footer}>
                        <div
                          className="footer-content-booking"
                          style={{ background: 'transparent' }}
                        >
                          <p
                            style={{ fontSize: 17, marginBottom: 0, marginRight: '15px' }}
                          >
                            Summary:
                          </p>
                          <p style={{ fontSize: 17, marginBottom: 0 }}> 0 Class booked</p>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ) : (
                  <div css={booking_footer}>
                    <div
                      className="footer-content-booking congratulationsText"
                      style={{ background: 'transparent', flexDirection: 'column' }}
                    >
                      <p
                        style={{ fontSize: '1.5rem', width: '100%', textAlign: 'center' }}
                      >
                        Congratulations!!
                      </p>
                      <p style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                        We will be waiting for you at the time you specified. Thank you
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SwipeableViews>
        </div>
      </div>

      {interviewDate ? (
        <Fragment>
          {responsiveStep < 3 && (
            <Footer
              isEvent
              userInfo={userInfo}
              summaryFontSize={12}
              country={userInfo.country}
              successFunction={() => setSuccessMessage(true)}
              isWithUserInfo={checkUserinfo({
                ...userInfo,
                country: userInfo.country
              })}
              event={'interview'}
              eventInfo={{
                timeInterview,
                interviewDate
              }}
            />
          )}
        </Fragment>
      ) : (
        <Fragment>
          {responsiveStep < 3 && (
            <div className="floating-footer">
              <div
                className="footer-content-booking"
                style={{ marginBottom: window.innerWidth > 750 ? '8px' : '0' }}
              >
                <p
                  style={{
                    marginBottom: 0,
                    fontSize: window.innerWidth < 750 ? '18px' : '19px',
                    marginRight: '15px'
                  }}
                >
                  Summary:
                </p>
                <p
                  style={{
                    marginBottom: 0,
                    fontSize: window.innerWidth < 750 ? '18px' : '19px'
                  }}
                >
                  {' '}
                  0 Class booked
                </p>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Interview;
