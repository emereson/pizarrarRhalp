// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { week_days_wrapper, days_selector } from './styles';
import Day from './Day';

const WeekDays = ({ days, setdays, setdaysSelected }) => {
  return (
    <div id="week-days" className="week-days-wrapper">
      <div css={days_selector}>
        <Day
          day={days['mon']}
          abrev="mon"
          title="MONDAYS"
          setdays={setdays}
          setdaysSelected={setdaysSelected}
        />
        <Day
          day={days['tue']}
          abrev="tue"
          title="TUESDAYS"
          setdays={setdays}
          setdaysSelected={setdaysSelected}
        />
        <Day
          day={days['wed']}
          abrev="wed"
          title="WEDNESDAYS"
          setdays={setdays}
          setdaysSelected={setdaysSelected}
        />
        <Day
          day={days['thu']}
          abrev="thu"
          title="THURSDAYS"
          setdays={setdays}
          setdaysSelected={setdaysSelected}
        />
        <Day
          day={days['fri']}
          abrev="fri"
          title="FRIDAYS"
          setdays={setdays}
          setdaysSelected={setdaysSelected}
        />
        <Day
          day={days['sat']}
          abrev="sat"
          title="SATURDAYS"
          setdays={setdays}
          setdaysSelected={setdaysSelected}
        />
        <Day
          day={days['sun']}
          abrev="sun"
          title="SUNDAYS"
          setdays={setdays}
          setdaysSelected={setdaysSelected}
        />
      </div>
    </div>
  );
};

export default WeekDays;
