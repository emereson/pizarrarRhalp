import { Fragment, useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {
  interview_and_footer,
  interview_container,
  interview_wrapper,
  calendar_container,
  time_container,
  user_info_container,
  footer_course,
  footer_special,
  continueButton,
  backIcon,
  description_text,
  rounded
} from './styles';
import { ReactComponent as BackIcon } from 'assets/icons/back.svg';
import { ReactComponent as NextIcon } from 'assets/icons/forward.svg';
import { useLocation, useHistory } from 'react-router-dom';
import { footer } from 'appStyles';
import CalendarComponent from 'components/common/Calendar';
import Footer from '../Footer';
import UserInfo from 'components/common/UserInfo';
import WeekDaysMobile from './WeekDaysMobile';
import { checkUserinfo } from 'utils/userUtils';
import moment from 'moment';
import { information_text } from '../Interview/styles';
import './style.css';
import SwipeableViews from 'react-swipeable-views';
import { booking_footer } from '../styles';

const Course = () => {
  let history = useHistory();
  const [clickSelect, setClickSelect] = useState('');
  const [courseStartDate, setcourseStartDate] = useState(null);
  const [ShowComponent, setShowComponent] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [ReduceSummaryText, setReduceSummaryText] = useState(false);
  const [userInfo, setuserInfo] = useState({
    name: '',
    email: '',
    tel: '',
    country: '',
    notes: '',
    requireMail: false,
    isStudent: ''
  });
  const [days, setdays] = useState({
    mon: { start: moment(0, 'HH:MM'), end: moment(0, 'HH:MM') },
    tue: { start: moment(0, 'HH:MM'), end: moment(0, 'HH:MM') },
    wed: { start: moment(0, 'HH:MM'), end: moment(0, 'HH:MM') },
    thu: { start: moment(0, 'HH:MM'), end: moment(0, 'HH:MM') },
    fri: { start: moment(0, 'HH:MM'), end: moment(0, 'HH:MM') },
    sat: { start: moment(0, 'HH:MM'), end: moment(0, 'HH:MM') },
    sun: { start: moment(0, 'HH:MM'), end: moment(0, 'HH:MM') }
  });
  const [daysSelected, setdaysSelected] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false
  });
  const location = useLocation();
  const [step, setStep] = useState(0);

  const isDaySelected = () => {
    for (let key in daysSelected) {
      if (daysSelected[key]) {
        return true;
      }
    }
  };

  useEffect(() => {
    setStep(1);
    if (window.innerWidth > 750) setShowComponent(true);
    setTimeout(() => {
      setStep(0);
    }, 60);
    setTimeout(() => {
      setShowComponent(true);
    }, 400);
  }, []);

  const goBack = () => {
    if (step === 0) {
      history.push('/');
      return;
    }
    setStep(prev => (prev <= 1 ? 0 : prev - 1));
  };

  const canContinue = () => {
    if (window.innerWidth < 750) {
      if (step === 0 && isDaySelected()) {
        return true;
      }
      if (step === 1 && courseStartDate) {
        return true;
      }
      if (step === 2) {
        //last step
        return false;
      }
    }
  };

  useEffect(() => {
    const selected = [
      daysSelected.mon,
      daysSelected.sat,
      daysSelected.sun,
      daysSelected.thu,
      daysSelected.tue,
      daysSelected.wed,
      daysSelected.fri
    ];
    const filtered = selected.filter(day => day === true);
    if (filtered.length >= 3) setReduceSummaryText(true);
    else setReduceSummaryText(false);
  }, [daysSelected]);

  return (
    <div css={interview_and_footer}>
      <div css={interview_container} style={{ marginTop: 0 }}>
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
        <BackIcon onClick={goBack} css={backIcon} width="25" height="25" />
        <div
          css={interview_wrapper}
          id="course-container"
          style={{
            opacity: ShowComponent ? 1 : 0
          }}
        >
          {window.innerWidth > 750 && (
            <Fragment>
              {(step === 0 || window.innerWidth > 750) && (
                <div css={time_container}>
                  <WeekDaysMobile
                    days={days}
                    setdays={setdays}
                    daysSelected={daysSelected}
                    setdaysSelected={setdaysSelected}
                  />
                  <div
                    css={description_text}
                    style={{ left: 5, fontSize: 14, width: 'fit-content' }}
                  >
                    <span style={{ color: 'white' }}>
                      {isDaySelected()
                        ? 'Days and hours chosen'
                        : 'Choose days and hours'}
                    </span>
                    <div
                      css={rounded}
                      style={{ visibility: isDaySelected() ? 'visible' : 'hidden' }}
                    >
                      <label></label>
                    </div>
                  </div>
                  <span
                    style={{
                      color: 'white',
                      position: 'absolute',
                      top: -20,
                      fontSize: 14,
                      right: 5
                    }}
                  >
                    Use your country time
                  </span>
                </div>
              )}
              {(step === 1 || window.innerWidth > 750) && (
                <div
                  css={calendar_container}
                  onClick={() => setClickSelect('courseCalendar')}
                  className={`${
                    clickSelect === 'courseCalendar' &&
                    location.pathname.includes('course')
                      ? 'course-select-componnent'
                      : ''
                  }
              ${
                clickSelect === 'courseCalendar' && location.pathname.includes('special')
                  ? 'special-select-componnent'
                  : ''
              }`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0 16px'
                  }}
                >
                  <CalendarComponent
                    value={courseStartDate}
                    onChange={date => setcourseStartDate(date)}
                  />
                  <div
                    className="description_text"
                    style={{ top: '-22px', left: '20px' }}
                  >
                    <span style={{ color: 'white' }}>
                      {courseStartDate ? 'day chosen' : 'choose a day to start'}
                    </span>
                    <div
                      className="rounded"
                      style={{ visibility: courseStartDate ? 'visible' : 'hidden' }}
                    >
                      <label></label>
                    </div>
                  </div>
                </div>
              )}
              {(step === 2 || window.innerWidth > 750) && (
                <div
                  css={user_info_container}
                  onClick={() => setClickSelect('courseUser')}
                  className={`${
                    clickSelect === 'courseUser' && location.pathname.includes('course')
                      ? 'course-select-componnent'
                      : ''
                  }
              ${
                clickSelect === 'courseUser' && location.pathname.includes('special')
                  ? 'special-select-componnent'
                  : ''
              }`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0 16px'
                  }}
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

                  <div className="responsive-info-title" style={{ top: '-15px' }}>
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
              )}
            </Fragment>
          )}
          {window.innerWidth < 750 && (
            <Fragment>
              <div style={{ maxWidth: '89.5vw' }}>
                <SwipeableViews
                  index={step}
                  disableLazyLoading
                  enableMouseEvents={false}
                  slideStyle={{
                    display: 'flex',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    flexDirection: 'column',
                    minHeight: step > 0 ? '50vh' : '70vh',
                    maxHeight: step > 0 ? '60vh' : '70vh',
                    overflow: 'visible',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onChangeIndex={value => setStep(value)}
                >
                  <div className="flex-c-ac-jc" style={{ width: '100%', paddingTop: 15 }}>
                    <div className="row-texts">
                      <div
                        css={description_text}
                        style={{
                          left: 5,
                          fontSize: 14,
                          width: 'fit-content',
                          position: 'relative',
                          left: '0',
                          top: '0'
                        }}
                      >
                        <span style={{ color: 'white' }}>
                          {isDaySelected()
                            ? 'Days and hours chosen'
                            : 'Choose days and hours'}
                        </span>
                        <div
                          css={rounded}
                          style={{ visibility: isDaySelected() ? 'visible' : 'hidden' }}
                        >
                          <label></label>
                        </div>
                      </div>
                      <span
                        style={{
                          color: 'white',
                          fontSize: 14
                        }}
                      >
                        Use your country time
                      </span>
                    </div>
                    <div className="week-days-responsive-container">
                      <WeekDaysMobile
                        days={days}
                        setdays={setdays}
                        daysSelected={daysSelected}
                        setdaysSelected={setdaysSelected}
                      />
                    </div>
                    <p
                      className="next_button_p"
                      style={{
                        position: 'relative',
                        bottom: '0',
                        right: '0',
                        alignSelf: 'flex-end',
                        marginTop: '0px',
                        marginRight: '10px'
                      }}
                      onClick={() => {
                        setStep(1);
                      }}
                    >
                      Next
                    </p>
                  </div>

                  <div
                    css={calendar_container}
                    onClick={() => setClickSelect('courseCalendar')}
                    className={`${
                      clickSelect === 'courseCalendar' &&
                      location.pathname.includes('course')
                        ? 'course-select-componnent'
                        : ''
                    }
                          ${
                            clickSelect === 'courseCalendar' &&
                            location.pathname.includes('special')
                              ? 'special-select-componnent'
                              : ''
                          }`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '90%'
                    }}
                  >
                    <CalendarComponent
                      value={courseStartDate}
                      onChange={date => setcourseStartDate(date)}
                    />
                    <div
                      className="description_text"
                      style={{ top: '-22px', left: '7px' }}
                    >
                      <span style={{ color: 'white' }}>
                        {courseStartDate ? 'day chosen' : 'choose a day to start'}
                      </span>
                      <div
                        className="rounded"
                        style={{ visibility: courseStartDate ? 'visible' : 'hidden' }}
                      >
                        <label></label>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        setStep(2);
                      }}
                      style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        position: 'absolute',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        bottom: '-30px'
                      }}
                    >
                      <div
                        className="twinkleText"
                        style={{ transform: 'rotateZ(180deg)', marginRight: 10 }}
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
                  </div>
                  <div className="flex-c-ac-jc" style={{ width: '100%', marginTop: 25 }}>
                    <div
                      className="flex-c-ac-jc"
                      style={{
                        width: '90%',
                        border: '1px solid #fff',
                        height: '40vh'
                      }}
                    >
                      <div
                        css={user_info_container}
                        onClick={() => setClickSelect('courseUser')}
                        className={`${
                          clickSelect === 'courseUser' &&
                          location.pathname.includes('course')
                            ? 'course-select-componnent'
                            : ''
                        }
                      ${
                        clickSelect === 'courseUser' &&
                        location.pathname.includes('special')
                          ? 'special-select-componnent'
                          : ''
                      }`}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          width: '100%'
                        }}
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
                        <div className="responsive-info-title" style={{ top: '-2px' }}>
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
                        visibility: checkUserinfo({
                          ...userInfo,
                          country: userInfo.country
                        })
                          ? 'visible'
                          : 'hidden',
                        bottom: '0',
                        right: '0',
                        alignSelf: 'flex-end',
                        marginRight: '20px',
                        marginTop: '10px'
                      }}
                      onClick={() => {
                        setStep(3);
                      }}
                    >
                      Done
                    </p>
                  </div>
                  <div className="flex-c-ac-jc" style={{ width: '100%', marginTop: 0 }}>
                    <div
                      className="flex-c-ac-jc"
                      style={{
                        width: '90%',
                        border: '1px solid #fff',
                        backgroundColor: location.pathname.includes('course')
                          ? 'rgba(61, 218, 255, 0.1)'
                          : 'rgba(125, 136, 255, 0.3)',
                        minHeight: window.innerWidth < 750 ? '40vh' : 'inherit'
                      }}
                    >
                      <div
                        css={[
                          footer,
                          location.pathname.includes('course')
                            ? footer_course
                            : footer_special
                        ]}
                        style={{ width: '100%' }}
                      >
                        {!SuccessMessage && (
                          <Footer
                            isWithUserInfo={checkUserinfo({
                              ...userInfo,
                              country: userInfo.country
                            })}
                            summaryFontSize={16}
                            specifyTextFontSize={ReduceSummaryText ? 15 : 16}
                            successFunction={e => {
                              setSuccessMessage(true);
                              setdays({
                                mon: {
                                  start: moment(0, 'HH:MM'),
                                  end: moment(0, 'HH:MM')
                                },
                                tue: {
                                  start: moment(0, 'HH:MM'),
                                  end: moment(0, 'HH:MM')
                                },
                                wed: {
                                  start: moment(0, 'HH:MM'),
                                  end: moment(0, 'HH:MM')
                                },
                                thu: {
                                  start: moment(0, 'HH:MM'),
                                  end: moment(0, 'HH:MM')
                                },
                                fri: {
                                  start: moment(0, 'HH:MM'),
                                  end: moment(0, 'HH:MM')
                                },
                                sat: {
                                  start: moment(0, 'HH:MM'),
                                  end: moment(0, 'HH:MM')
                                },
                                sun: {
                                  start: moment(0, 'HH:MM'),
                                  end: moment(0, 'HH:MM')
                                }
                              });
                              setdaysSelected({
                                mon: false,
                                tue: false,
                                wed: false,
                                thu: false,
                                fri: false,
                                sat: false,
                                sun: false
                              });
                              setuserInfo({
                                name: '',
                                email: '',
                                tel: '',
                                country: '',
                                notes: '',
                                requireMail: false,
                                isStudent: ''
                              });
                            }}
                            morePadding
                            transparent
                            userInfo={userInfo}
                            country={userInfo.country}
                            eventInfo={{
                              courseStartDate,
                              days,
                              daysSelected
                            }}
                          />
                        )}
                        {SuccessMessage && (
                          <div css={booking_footer}>
                            <div
                              className="footer-content-booking congratulationsText"
                              style={{
                                background: 'transparent',
                                flexDirection: 'column'
                              }}
                            >
                              <p
                                style={{
                                  fontSize: '1.5rem',
                                  width: '100%',
                                  textAlign: 'center'
                                }}
                              >
                                Congratulations!!
                              </p>
                              <p style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                                We will be waiting for you at the time you specified.
                                Thank you
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </SwipeableViews>
              </div>
            </Fragment>
          )}
        </div>
      </div>
      {window.innerWidth > 750 ? (
        <div className="floating-footer">
          <div
            css={[
              footer,
              location.pathname.includes('course') ? footer_course : footer_special
            ]}
          >
            <Footer
              isWithUserInfo={checkUserinfo({
                ...userInfo,
                country: userInfo.country
              })}
              userInfo={userInfo}
              summaryFontSize={12}
              reduceTextSize={ReduceSummaryText}
              country={userInfo.country}
              eventInfo={{
                courseStartDate,
                days,
                daysSelected
              }}
            />
          </div>
        </div>
      ) : (
        <div className="floating-footer">
          {step >= 1 && step < 3 && (
            <div
              css={[
                footer,
                location.pathname.includes('course') ? footer_course : footer_special
              ]}
            >
              <Footer
                isWithUserInfo={checkUserinfo({
                  ...userInfo,
                  country: userInfo.country
                })}
                summaryFontSize={12}
                reduceTextSize={ReduceSummaryText}
                userInfo={userInfo}
                country={userInfo.country}
                eventInfo={{
                  courseStartDate,
                  days,
                  daysSelected
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Course;
