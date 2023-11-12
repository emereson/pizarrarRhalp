import React, { useState } from 'react';
import styles from './Day.module.css';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Down } from 'assets/icons/down-arrow.svg';
import { ReactComponent as Up } from 'assets/icons/up.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash-white.svg';
import moment from 'moment';
import ArrowIcon from '../../assets/up arrow clock.svg';

const Day = ({ title, day, setdays, setdaysSelected, abrev, ...props }) => {
  const [dayState, setDayState] = useState('initial');
  // this can have Component has 3 state "initial, setting and done"

  const location = useLocation();

  const background =
    dayState !== 'initial' &&
    (location.pathname.includes('course')
      ? 'rgba(61,218,255,0.15)'
      : 'rgba(125,136,255,0.15)');

  const handleClick = () => {
    if (dayState === 'initial') {
      setDayState('setting');
    }
    if (dayState === 'done') {
      setDayState('setting');
    }
  };

  const onStartChange = time => {
    setdays(prev => {
      let newdays = { ...prev };
      newdays[abrev]['start'] = time;
      return newdays;
    });
  };

  const onEndChange = time => {
    setdays(prev => {
      let newdays = { ...prev };
      newdays[abrev]['end'] = time;
      return newdays;
    });
  };

  const back = () => {
    setDayState('initial');
  };

  const raiseOnStartTime = () => {
    const time = moment(day.start).add(30, 'minutes');
    onStartChange(time);
  };
  const raiseOnEndTime = () => {
    const time = moment(day.end).add(30, 'minutes');
    onEndChange(time);
  };

  const lowerOnStartTime = () => {
    const time = moment(day.start).subtract(30, 'minutes');
    onStartChange(time);
  };
  const lowerOnEndTime = () => {
    const time = moment(day.end).subtract(30, 'minutes');
    onEndChange(time);
  };

  const finish = () => {
    setDayState('done');
    setdaysSelected(prev => {
      return {
        ...prev,
        [abrev]: !prev[abrev]
      };
    });
  };

  return (
    <div
      className={styles.container}
      {...props}
      onClick={handleClick}
      style={{
        backgroundColor: background,
        boxSizing: 'border-box',
        maxHeight: window.innerWidth < 750 ? '60px' : null,
        minHeight: window.innerWidth < 750 ? '60px' : null,
        width: '100%'
      }}
    >
      {dayState === 'initial' && <span style={{ margin: 7, fontSize: 15 }}>{title}</span>}
      {dayState === 'setting' && (
        <div className={styles.settings}>
          <TrashIcon
            onClick={back}
            width="17"
            height="17"
            style={{ marginLeft: '5px' }}
          />
          <div className={styles.input}>
            <span style={{ fontSize: 15 }} className={`roboto-family`}>
              FROM:
            </span>
            <span
              className={`roboto-family`}
              style={{ fontSize: 18, marginTop: 2, marginLeft: 5 }}
            >
              {`${moment(day?.start).format('HH')}:${moment(day?.start).format('mm')}`}
            </span>
            <div className={styles.icons} style={{ margin: '0 10px' }}>
              <img
                src={ArrowIcon}
                alt="arrow_up_icon"
                width={20}
                height={20}
                onClick={raiseOnStartTime}
                className={`${styles.icon} ${styles.upArrow}`}
              />
              <img
                src={ArrowIcon}
                alt="arrow_up_icon"
                width={20}
                height={20}
                style={{ transform: 'rotateZ(180deg)' }}
                className={styles.icon}
                onClick={lowerOnStartTime}
              />
            </div>
          </div>
          <div className={styles.input}>
            <span style={{ fontSize: 15 }} className={`roboto-family`}>
              TO:
            </span>
            <span
              className={`roboto-family`}
              style={{ fontSize: 18, marginTop: 2, marginLeft: 5, paddingRight: '7.5px' }}
            >
              {`${moment(day?.end).format('HH')}:${moment(day?.end).format('mm')}`}
            </span>
            <div className={styles.icons} style={{ margin: '0 10px' }}>
              <img
                src={ArrowIcon}
                alt="arrow_up_icon"
                width={20}
                height={20}
                className={`${styles.icon} ${styles.upArrow}`}
                onClick={raiseOnEndTime}
              />
              <img
                src={ArrowIcon}
                alt="arrow_up_icon"
                width={20}
                height={20}
                style={{ transform: 'rotateZ(180deg)' }}
                className={styles.icon}
                onClick={lowerOnEndTime}
              />
            </div>
          </div>
          <div
            onClick={finish}
            style={{ fontSize: 15, marginRight: '10px' }}
            className={`roboto-family`}
          >
            OK
          </div>
        </div>
      )}
      {dayState === 'done' && (
        <div
          className={styles.container}
          style={{
            maxHeight: window.innerWidth < 750 ? '60px' : null,
            minHeight: window.innerWidth < 750 ? '60px' : null
          }}
          onClick={handleClick}
        >
          <span style={{ margin: 2, fontSize: 15 }}>{title}</span>
          <div style={{ position: 'absolute', right: '10px', fontSize: 16 }}>
            <span>{`${moment(day?.start, 'hmm').format('HH:mm')}-${moment(
              day?.end,
              'hmm'
            ).format('HH:mm')}
            `}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Day;
