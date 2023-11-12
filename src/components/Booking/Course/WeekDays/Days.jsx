// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react';
/** @jsxImportSource @emotion/react */
import {
  single_day,
  day_clock,
  click_ico,
  from_container,
  to_container,
  from_to_container,
  time_picker_wrapper,
  top_bar
} from './styles';
import { useLocation } from 'react-router-dom';
import clock from 'assets/icons/clock.svg';
import TimePicker from 'components/common/TimePicker';

const Days = ({ days, setdaysSelected, daysSelected, setdays, from_to_text }) => {
  const location = useLocation();
  const isSelected = option => {
    return isWithAllValuesSetted(days[option]) || daysSelected[option];
  };

  const isWithAllValuesSetted = values => {
    const { start, end, country } = values;
    return start && end && country;
  };

  const handleSelectDay = day => {
    let newDaySelected = { ...daysSelected };
    newDaySelected[day] = !newDaySelected[day];
    setdaysSelected(newDaySelected);
  };

  const changeStart = option => time => {
    let newdays = { ...days };
    newdays[option]['start'] = time;
    setdays(newdays);
  };
  const changeEnd = option => time => {
    let newdays = { ...days };
    newdays[option]['end'] = time;
    setdays(newdays);
  };

  const getBGColor = () => {
    if (location.pathname.includes('course')) {
      return 'rgba(61,218,255,0.4)';
    } else {
      return 'rgba(125,136,255,0.4)';
    }
  };

  const renderTimeInput = option => {
    return (
      <div css={time_picker_wrapper}>
        <img src={clock} alt="clock" css={click_ico} />
        {daysSelected[option] && (
          <>
            <TimePicker time={days[option].start} setTime={changeStart(option)} />
            <TimePicker time={days[option].end} setTime={changeEnd(option)} />
          </>
        )}
      </div>
    );
  };

  return (
    <Fragment>
      <div css={from_to_container}>
        <div css={top_bar} />
        <div style={{ height: 30 }} />
        <div css={from_container}>
          <p css={from_to_text}>F</p>
        </div>
        <div css={to_container}>
          <p css={from_to_text}>T</p>
        </div>
      </div>
      <div css={day_clock}>
        <p
          css={single_day(isSelected('sun'), getBGColor())}
          onClick={() => {
            handleSelectDay('sun');
          }}
        >
          Sun
        </p>
        {renderTimeInput('sun')}
      </div>
      <div css={day_clock}>
        <p
          css={single_day(isSelected('mon'), getBGColor())}
          onClick={() => {
            handleSelectDay('mon');
          }}
        >
          Mon
        </p>
        {renderTimeInput('mon')}
      </div>

      <div css={day_clock}>
        <p
          css={single_day(isSelected('tue'), getBGColor())}
          onClick={() => {
            handleSelectDay('tue');
          }}
        >
          Tue
        </p>
        {renderTimeInput('tue')}
      </div>

      <div css={day_clock}>
        <p
          css={single_day(isSelected('wed'), getBGColor())}
          onClick={() => {
            handleSelectDay('wed');
          }}
        >
          Wed
        </p>
        {renderTimeInput('wed')}
      </div>

      <div css={day_clock}>
        <p
          css={single_day(isSelected('thu'), getBGColor())}
          onClick={() => {
            handleSelectDay('thu');
          }}
        >
          Thu
        </p>
        {renderTimeInput('thu')}
      </div>

      <div css={day_clock}>
        <p
          css={single_day(isSelected('fri'), getBGColor())}
          onClick={() => {
            handleSelectDay('fri');
          }}
        >
          Fri
        </p>
        {renderTimeInput('fri')}
      </div>

      <div css={day_clock}>
        <p
          css={single_day(isSelected('sat'), getBGColor())}
          onClick={() => {
            handleSelectDay('sat');
          }}
        >
          Sat
        </p>
        {renderTimeInput('sat')}
      </div>
    </Fragment>
  );
};

export default Days;
