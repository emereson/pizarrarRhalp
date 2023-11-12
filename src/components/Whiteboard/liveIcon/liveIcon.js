import React from 'react';

import LiveBlack from 'assets/whiteboard/black/live-black.svg';
import LiveGrey from 'assets/whiteboard/grey/live-grey.svg';
import LiveWhite from 'assets/whiteboard/white/live-white.svg';
import { ICONS_COLORS } from '../../../enums/constants.enum';
import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';

import './styles.css';

const LiveIcon = ({ color }) => {
  const { isCrystalTheme } = useUserClassRoom();

  return (
    <div
      className={`live-container user-select-none ${
        isCrystalTheme ? 'live-container--classic' : 'live-container--modern'
      }`}
    >
      {color === ICONS_COLORS.BLACK && (
        <p className="live-p" style={{ color: 'black' }}>
          Join class
        </p>
      )}
      {color === ICONS_COLORS.WHITE && (
        <p className="live-p" style={{ color: 'white' }}>
          Join class
        </p>
      )}
      {color === ICONS_COLORS.GREY && (
        <p className="live-p" style={{ color: 'grey' }}>
          Join class
        </p>
      )}
      <img src={LiveGrey} className="live-icon" />
    </div>
  );
};

export default LiveIcon;
