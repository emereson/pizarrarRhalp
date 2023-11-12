import React from 'react';
/** @jsxImportSource @emotion/react */
import { react_time_picker } from './styles';
import TimePickerReact from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

const TimePicker = ({ time, setTime, border = true, className = '' }) => {
  return (
    <TimePickerReact
      css={react_time_picker(border)}
      value={time}
      showSecond={false}
      minuteStep={30}
      onChange={value => {
        setTime(value);
      }}
      className={className}
    />
  );
};

export default TimePicker;
