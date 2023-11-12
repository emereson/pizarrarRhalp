import React, { useContext } from 'react';

import LiveBlack from 'assets/whiteboard/black/live-black.svg';
import LiveGrey from 'assets/whiteboard/grey/live-grey.svg';
import LiveWhite from 'assets/whiteboard/white/live-white.svg';

import './styles.css';

const LiveIcon = ({ color, animation }) => {
  if (color === 'black') {
    return (
      <div
        className={animation ? 'live-container cbutton--effect-jagoda' : 'live-container'}
      >
        <p className="live-p" style={{ color: 'black' }}>
          {' '}
        </p>

        <img
          src={LiveBlack}
          className={animation ? 'live-icon cbutton--effect-jagoda' : 'live-icon'}
        />
      </div>
    );
  }

  if (color === 'grey') {
    return (
      <div className="live-container">
        <p className="live-p" style={{ color: 'grey' }}>
          {' '}
        </p>
        <img src={LiveGrey} className="live-icon" />
      </div>
    );
  }

  if (color === 'white') {
    return (
      <div className="live-container">
        <p className="live-p" style={{ color: 'white' }}>
          {' '}
        </p>
        <img src={LiveWhite} className="live-icon" />
      </div>
    );
  }
};

export default LiveIcon;
