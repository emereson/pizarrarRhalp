import React, { useState, useEffect } from 'react';
import { ReactComponent as Down } from 'assets/icons/down-arrow.svg';
import { ReactComponent as Up } from 'assets/icons/up.svg';
import clock from 'assets/icons/clock.svg';
import styles from './index.module.css';
import moment from 'moment';
import { back_button_p, next_button_p } from 'components/Booking/Interview/styles';
import { description_text, rounded, time_text_p } from 'components/Booking/Course/styles';
import { time_text } from '../TimePicker/styles';

const Clock = ({ handleClick, time, isSelected, settimeInterview }) => {
  return (
    <React.Fragment>
      <img
        src={clock}
        width={window.innerWidth < 560 ? '40px' : '40px'}
        alt="img"
        onClick={handleClick}
      />
      <div className="choose-hour-time-input" onClick={handleClick}>
        <p className="current-selected-time">{moment(time).format('HH')}</p>
        <p className={`${!isSelected ? styles.dots : ''} current-selected-time`}>:</p>
        <p className="current-selected-time">{moment(time).format('mm')}</p>
      </div>
      <div className={styles.arrows}>
        <Up
          style={{ marginBottom: 10 }}
          width="25px"
          fill="#fff"
          onClick={() => settimeInterview(prev => moment(prev).add(30, 'minutes'))}
        />
        <Down
          width="25px"
          fill="#fff"
          onClick={() => settimeInterview(prev => moment(prev).subtract(30, 'minutes'))}
        />
      </div>
    </React.Fragment>
  );
};

const ArrowTimePicker = ({
  time,
  responsiveMode,
  settimeInterview,
  timeInterview,
  setresponsiveStep,
  selected,
  showing
}) => {
  const [isShowing, setIsShowing] = useState(showing);
  const [isSelected, setSelected] = useState(selected);
  const [Slide, setSlide] = useState(false);
  const [ShowButton, setShowButton] = useState(false);

  const handleClick = () => {
    setIsShowing(true);
    setSelected(true);
  };

  useEffect(() => {
    setIsShowing(showing);
    setSelected(selected);
  }, [selected, showing]);

  return (
    <React.Fragment>
      {responsiveMode && (
        <div
          className={
            !ShowButton ? 'description_text time_text' : 'description_text time_text'
          }
          style={{ width: 'fit-content' }}
        >
          <span style={{ color: '#fff' }}>
            {new Date(timeInterview).getHours() > 0 ? 'hour chosen' : 'choose the hour'}{' '}
          </span>
          <div
            className="rounded"
            style={{
              visibility: new Date(timeInterview).getHours() > 0 ? 'visible' : 'hidden'
            }}
          >
            <label></label>
          </div>
        </div>
      )}
      {responsiveMode ? (
        <div
          className={
            Slide ? `${styles.container} show-clock` : `${styles.container} hide-clock`
          }
          style={{ margin: '30px 0', background: 'transparent' }}
        >
          <Clock
            handleClick={handleClick}
            time={time}
            isSelected={isSelected}
            settimeInterview={settimeInterview}
          />
        </div>
      ) : (
        <div
          className={styles.container}
          style={{ margin: '30px 0', background: 'transparent' }}
        >
          <Clock
            handleClick={handleClick}
            time={time}
            isSelected={isSelected}
            settimeInterview={settimeInterview}
          />
        </div>
      )}
      {responsiveMode && (
        <React.Fragment>
          <p className={`time_text_p`} style={{ fontSize: '16px' }}>
            Use your country time
          </p>
          <p
            className={!ShowButton ? `next_button_p` : `next_button_p`}
            style={{ bottom: '-30px' }}
            onClick={() => {
              setresponsiveStep(2);
            }}
          >
            Next
          </p>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

ArrowTimePicker.defaultProps = {
  selected: false,
  showing: false
};

export default ArrowTimePicker;
