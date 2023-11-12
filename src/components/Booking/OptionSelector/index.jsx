// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { option_icon_container, option_icon, title } from './styles';

import online_interview from 'assets/icons/online_interview_icon.svg';
import online_interview_with_bg from 'assets/icons/online_interview_icon_with_bg.svg';
import online_course from 'assets/icons/regular_class_icon.svg';
import online_course_with_bg from 'assets/icons/regular_class_icon_with_bg.svg';
import level_test from 'assets/icons/level_test_icon.svg';
import level_test_with_bg from 'assets/icons/level_test_icon_with_bg.svg';
import special_tutoring from 'assets/icons/special_course_icon.svg';
import special_tutoring_with_bg from 'assets/icons/special_course_icon_with_bg.svg';

const OptionSelector = ({ history, match, location }) => {
  const isThisRoute = route => {
    if (location.pathname.includes(route)) {
      return true;
    }

    return false;
  };

  return (
    <Fragment>
      <div
        className="booking-buttons"
        style={{ width: window.innerWidth < 750 ? '26.5%' : '25%' }}
        onClick={() => history.push(`${match.path}/interview`)}
      >
        <img
          alt="icon"
          src={isThisRoute('/interview') ? online_interview_with_bg : online_interview}
          css={option_icon}
        />
        <p css={title}>interview </p>
      </div>
      <div
        className="booking-buttons"
        onClick={() => history.push(`${match.path}/course`)}
      >
        <img
          src={isThisRoute('/course') ? online_course_with_bg : online_course}
          alt="icon"
          css={option_icon}
        />
        <p css={title}>regular class </p>
      </div>
      <div
        className="booking-buttons"
        onClick={() => history.push(`${match.path}/level-test`)}
      >
        <img
          src={isThisRoute('/level-test') ? level_test_with_bg : level_test}
          alt="icon"
          css={option_icon}
        />
        <p css={title}>level test </p>
      </div>
      <div
        className="booking-buttons"
        onClick={() => history.push(`${match.path}/special-tutoring`)}
      >
        <img
          src={
            isThisRoute('/special-tutoring') ? special_tutoring_with_bg : special_tutoring
          }
          alt="icon"
          css={option_icon}
        />
        <p css={title}>special course </p>
      </div>
    </Fragment>
  );
};

export default withRouter(OptionSelector);
