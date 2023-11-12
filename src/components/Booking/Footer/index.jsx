// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { footer_container, text, text_info, send } from './styles';
import { withRouter, useHistory } from 'react-router-dom';
import { sendEmail } from 'services/email';
import moment from 'moment';
import '../style.css';

const Footer = ({
  eventInfo,
  userInfo,
  country,
  location,
  transparent,
  successFunction,
  reduceTextSize,
  morePadding,
  specifyTextFontSize,
  summaryFontSize,
  isWithUserInfo
}) => {
  const [emailSentSuccess] = useState(false);
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();
    sendFeedback();
  };

  const formatEmailText = (eventInfo, userInfo, country) => {
    const { name, tel, email, notes, requireMail, isStudent } = userInfo;

    if (location.pathname.includes('/interview')) {
      const { timeInterview, interviewDate } = eventInfo;
      return `Interview requested. 
              Name: ${name}. 
              Tel: ${tel}. 
              Email: ${email}. 
              Country: ${country}.
              Notes: ${notes}.
              ${requireMail ? 'User Requires Mail' : "User doesn't require Mail"} 
              ${
                isStudent === 'yes'
                  ? 'User is already a student'
                  : 'User is not a student yet'
              } 
              Day: ${moment(interviewDate).format('MMMM Do YYYY')} at ${moment(
        timeInterview
      ).format('h:mm a')}. `;
    } else if (location.pathname.includes('/level-test')) {
      const { timeInterview, interviewDate } = eventInfo;
      return `Level Test requested. 
      Name: ${name}. 
      Tel: ${tel}. 
      Email: ${email}. 
      Country: ${country}.
      Notes: ${notes}.
      ${requireMail ? 'User Requires Mail' : "User doesn't require Mail"} 
      ${isStudent === 'yes' ? 'User is already a student' : 'User is not a student yet'} 
      Day: ${moment(interviewDate).format('MMMM Do YYYY')} at ${moment(
        timeInterview
      ).format('h:mm a')}. `;
    } else if (location.pathname.includes('/course')) {
      const { days, courseStartDate, daysSelected } = eventInfo;
      return `Course requested. 
              Name: ${name}. 
              Tel: ${tel}. 
              Email: ${email}. 
              Country: ${country}. 
              Notes: ${notes}.
              ${requireMail ? 'User Requires Mail' : "User doesn't require Mail"} 
              ${
                isStudent === 'yes'
                  ? 'User is already a student'
                  : 'User is not a student yet'
              } 
              At the days ${formatDays(
                days,
                daysSelected
              )}. Starting ${courseStartDate}.`;
    } else if (location.pathname.includes('/special-tutoring')) {
      const { days, courseStartDate, daysSelected } = eventInfo;
      return `Special Course requested. 
      Name: ${name}. 
      Tel: ${tel}. 
      Email: ${email}. 
      Country: ${country}. 
      Notes: ${notes}.
      ${requireMail ? 'User Requires Mail' : "User doesn't require Mail"} 
      ${isStudent === 'yes' ? 'User is already a student' : 'User is not a student yet'} 
      At the days ${formatDays(days, daysSelected)}. Starting ${courseStartDate}.`;
    }
  };

  const sendFeedback = async () => {
    const subject = 'New Branak Booking';
    const mailContent = formatEmailText(eventInfo, userInfo, country);
    try {
      await sendEmail({ type: 'booking', subject, mailContent });
      if (window.innerWidth < 750) successFunction();
      else history.push('/booking/success');
    } catch (error) {
      console.error('error sending booking email');
    }
  };

  const renderInterviewText = () => {
    return (
      <div
        className="footer-content-booking"
        style={{
          backgroundColor: transparent ? 'transparent' : 'rgba(49, 136, 223, 0.4)'
        }}
      >
        {!reduceTextSize && (
          <p
            className="summary-title"
            style={{
              top: morePadding ? '-100px' : '0',
              fontSize: summaryFontSize ? summaryFontSize : 'inherit'
            }}
          >
            Summary:
          </p>
        )}
        <p
          css={text}
          style={{
            fontSize:
              window.innerWidth < 750
                ? specifyTextFontSize
                  ? specifyTextFontSize
                  : reduceTextSize
                  ? '1.1rem'
                  : '1.5rem'
                : '1.2rem'
          }}
        >
          {`You have an interview on ${formatDate(eventInfo.interviewDate)}`}
          {formatHour(eventInfo.timeInterview) === '0:0'
            ? null
            : `, at ${formatHour(eventInfo.timeInterview)} hs.`}
        </p>
      </div>
    );
  };
  const renderLevelTestText = () => {
    return (
      <div
        className="footer-content-booking"
        style={{
          backgroundColor: transparent ? 'transparent' : 'rgba(49, 136, 223, 0.4)'
        }}
      >
        {!reduceTextSize && (
          <p
            className="summary-title"
            style={{
              top: morePadding ? '-100px' : '0',
              fontSize: summaryFontSize ? summaryFontSize : 'inherit'
            }}
          >
            Summary:
          </p>
        )}
        <p
          css={text}
          style={{
            fontSize:
              window.innerWidth < 750
                ? specifyTextFontSize
                  ? specifyTextFontSize
                  : reduceTextSize
                  ? '1.1rem'
                  : '1.5rem'
                : '1.2rem'
          }}
        >
          {`You have a level test on ${formatDate(
            eventInfo.interviewDate
          )} at ${formatHour(eventInfo.timeInterview)} hs.`}
        </p>
      </div>
    );
  };
  const renderCourseText = () => {
    const { days, courseStartDate, daysSelected } = eventInfo;
    return (
      <div
        className="footer-content-booking"
        style={{
          backgroundColor: transparent ? 'transparent' : 'rgba(49, 136, 223, 0.4)'
        }}
      >
        {!reduceTextSize && (
          <p
            className="summary-title"
            style={{
              top: morePadding ? '-100px' : '0',
              fontSize: summaryFontSize ? summaryFontSize : 'inherit'
            }}
          >
            Summary:
          </p>
        )}
        <p
          css={text}
          style={{
            fontSize:
              window.innerWidth < 750
                ? specifyTextFontSize
                  ? specifyTextFontSize
                  : reduceTextSize
                  ? '1.1rem'
                  : '1.5rem'
                : '1.2rem'
          }}
        >
          {`You have a course: `}{' '}
          {`${formatDays(days, daysSelected)}. Starting on  ${formatDate(
            courseStartDate
          )}..`}
        </p>
      </div>
    );
  };
  const renderSpecialTutoringText = () => {
    const { days, courseStartDate, daysSelected } = eventInfo;
    return (
      <div
        className="footer-content-booking"
        style={{
          backgroundColor: transparent ? 'transparent' : 'rgba(49, 136, 223, 0.4)'
        }}
      >
        {!reduceTextSize && (
          <p
            className="summary-title"
            style={{
              top: morePadding ? '-100px' : '0',
              fontSize: summaryFontSize ? summaryFontSize : 'inherit'
            }}
          >
            Summary:
          </p>
        )}
        <p
          css={text}
          style={{
            fontSize:
              window.innerWidth < 750
                ? specifyTextFontSize
                  ? specifyTextFontSize
                  : reduceTextSize
                  ? '1.1rem'
                  : '1.5rem'
                : '1.2rem'
          }}
        >
          {`You have a Special Tutoring: `}{' '}
          {`${formatDays(days, daysSelected)}. Starting on  ${formatDate(
            courseStartDate
          )}.`}
        </p>
      </div>
    );
  };

  const renderText = () => {
    if (location.pathname.includes('/interview')) {
      return renderInterviewText();
    } else if (location.pathname.includes('/level-test')) {
      return renderLevelTestText();
    } else if (location.pathname.includes('/course')) {
      return renderCourseText();
    } else if (location.pathname.includes('/special-tutoring')) {
      return renderSpecialTutoringText();
    }
  };

  const renderSend = () => {
    if (isWithUserInfo) {
      return (
        <p
          css={text}
          style={{
            fontSize: reduceTextSize ? '1rem' : '1.5rem',
            position: window.innerWidth < 750 ? 'absolute' : 'relative',
            right: window.innerWidth < 750 ? '0' : 'relative',
            bottom: window.innerWidth < 750 ? '-70px' : 'inherit'
          }}
          className="twinkleText"
          onClick={handleSubmit}
        >
          Confirm
        </p>
      );
    }
  };

  const renderSuccess = () => {
    return (
      <div css={footer_container}>
        <div css={text_info}>Booking sent successfully!</div>
      </div>
    );
  };
  if (emailSentSuccess) return renderSuccess();
  return (
    <div css={footer_container}>
      <div css={text_info}>{renderText()}</div>
      <div className="summary-send" style={{ bottom: morePadding ? '-30px' : 'initial' }}>
        {renderSend()}
      </div>
    </div>
  );
};

const formatDays = (days, daysSelected) => {
  const { mon, tue, wed, thu, fri, sat, sun } = days;
  let output = '';
  if (mon.start && daysSelected['mon']) {
    output += `Mon: ${formatHour(mon.start)} to ${formatHour(mon.end)}, `;
  }
  if (tue.start && daysSelected['tue']) {
    output += `Tue: ${formatHour(tue.start)} to ${formatHour(tue.end)}, `;
  }
  if (mon.start && daysSelected['wed']) {
    output += `Wed: ${formatHour(wed.start)} to ${formatHour(wed.end)}, `;
  }
  if (mon.start && daysSelected['thu']) {
    output += `Thu: ${formatHour(thu.start)} to ${formatHour(thu.end)}, `;
  }
  if (mon.start && daysSelected['fri']) {
    output += `Fri: ${formatHour(fri.start)} to ${formatHour(fri.end)}, `;
  }
  if (mon.start && daysSelected['sat']) {
    output += `Sat: ${formatHour(sat.start)} to ${formatHour(sat.end)}, `;
  }
  if (mon.start && daysSelected['sun']) {
    output += `Sun: ${formatHour(sun.start)} to ${formatHour(sun.end)}, `;
  }
  return output;
};

const formatDate = date => {
  if (!date) return '-';
  return date.toDateString();
};

const formatHour = hour => {
  return `${hour.hours()}:${hour.minutes()}`;
};

export default withRouter(Footer);
