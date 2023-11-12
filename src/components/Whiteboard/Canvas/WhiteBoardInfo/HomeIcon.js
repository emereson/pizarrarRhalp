import React from 'react';

//import de icons
import homeIconBlack from 'assets/whiteboard/black/home-black.svg';
import homeIconGrey from 'assets/whiteboard/grey/home-grey.svg';
import homeIconWhite from 'assets/whiteboard/white/home-white.svg';

const HomeIcon = ({ color }) => {
  if (color === 'black') {
    return <img src={homeIconBlack} />;
  } else if (color === 'grey') {
    return <img src={homeIconGrey} />;
  } else {
    return <img src={homeIconWhite} />;
  }
};

export default HomeIcon;
