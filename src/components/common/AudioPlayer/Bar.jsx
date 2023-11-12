import React from 'react';
import moment from 'moment';
import 'moment-duration-format';

export default function Bar(props) {
  const { duration, curTime, onTimeUpdate } = props;

  const curPercentage = (curTime / duration) * 100;

  function formatDuration(duration) {
    return moment.duration(duration, 'seconds').format('mm:ss', { trim: false });
  }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector('.bar__progress');
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = eMove => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener('mousemove', updateTimeOnMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', updateTimeOnMove);
    });
  }

  return (
    <div className="bar">
      <span className="bar__time">{formatDuration(curTime)}</span>
      <div className="bar__click-zone" onMouseDown={e => handleTimeDrag(e)}>
        {props.usePlayerColor ? (
          <div
            className="bar__progress"
            style={{
              background: `linear-gradient(to right, var(--player-color) ${curPercentage}%, var(--player-color) 0)`
            }}
          >
            <span className="bar__progress__knob" style={{ left: `${curPercentage}%` }} />
          </div>
        ) : (
          <div
            className="bar__progress"
            style={{
              background:
                props.colorScheme == 'dark'
                  ? `linear-gradient(to right, currentcolor ${curPercentage}%, var(--player-color) 0)`
                  : `linear-gradient(to right, currentcolor ${curPercentage}%, var(--color-light-contrast) 0)`
            }}
          >
            <span className="bar__progress__knob" style={{ left: `${curPercentage}%` }} />
          </div>
        )}
      </div>
      <span className="bar__time">{formatDuration(duration)}</span>
    </div>
  );
}
