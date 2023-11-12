// eslint-disable-next-line no-unused-vars
import React, { useRef, Fragment, useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { calendar } from './styles';
import Calendar from 'react-calendar';

const CalendarComponent = ({ value, onChange }) => {
  const [cont, setCont] = useState(0);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const borderFunction = ({ action }) => {
    if (action == 'next') {
      let tmp = cont - 1;
      setCont(tmp);
    }
    if (action == 'prev') {
      let tmp = cont + 1;
      setCont(tmp);
    }
    var element = document.querySelector('.react-calendar__month-view__days');
    var childNode = element.querySelectorAll('abbr');
    const pastMonth = new Date();
    pastMonth.setMonth(pastMonth.getMonth() - (1 + cont));
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + (1 - cont));
    const lastDay = new Date(pastMonth.getFullYear(), pastMonth.getMonth() + 1, 0);
    childNode.forEach(value => {
      let month = value.getAttribute('aria-label');
      if (month.includes(monthNames[pastMonth.getMonth()])) {
        let parent = value.parentElement;
        parent.disabled = true;
        parent.style.backgroundColor = 'transparent';
        parent.style.borderRight = 'none';
        value.style.display = 'none';
      } else {
        let parent = value.parentElement;
        parent.disabled = false;
        parent.style.borderRight = '0.5px solid white';
        value.style.display = 'block';
      }
      if (month.includes(monthNames[nextMonth.getMonth()])) {
        let parent = value.parentElement;
        parent.style.visibility = 'hidden';
      } else {
        let parent = value.parentElement;
        parent.style.visibility = 'visible';
      }
      if (month.includes(`${monthNames[pastMonth.getMonth()]} ${lastDay.getDate()}`)) {
        let parent = value.parentElement;
        parent.style.borderRight = '0.5px solid white';
      }
    });
  };
  useEffect(() => {
    borderFunction({ action: '' });
  }, [cont]);
  return (
    <Fragment>
      <Calendar
        locale="en"
        css={calendar}
        onChange={onChange}
        onActiveStartDateChange={borderFunction}
        value={value}
        navigationLabel={({ label }) => `${label.toUpperCase()}`}
        minDetail={'month'}
      />
    </Fragment>
  );
};

export default CalendarComponent;
