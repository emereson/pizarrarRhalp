import React from 'react';
/** @jsxImportSource @emotion/react */
import { week_days_wrapper, days_selector } from './styles';
import Days from './Days';

const WeekDays = ({ days, setdays, daysSelected, setdaysSelected }) => {
  return (
    <div css={week_days_wrapper}>
      <div css={days_selector}>
        <Days
          days={days}
          setdays={setdays}
          daysSelected={daysSelected}
          setdaysSelected={setdaysSelected}
        />
      </div>
    </div>
  );
};

export default WeekDays;
