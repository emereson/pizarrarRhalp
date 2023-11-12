import React from 'react';
import { ICONS_COLORS } from '../../../enums/constants.enum';
import { ReactComponent as ScreenSplitBlack } from 'assets/whiteboard/black/screen-split-black.svg';
import { ReactComponent as ScreenSplitGrey } from 'assets/whiteboard/grey/screen-split-grey.svg';
import { ReactComponent as ScreenSplitWhite } from 'assets/whiteboard/white/screen-split-white.svg';

const SplitScreenTool = ({ color, onClick }) => {
  return (
    <div onClick={onClick}>
      {color === ICONS_COLORS.BLACK && <ScreenSplitBlack className="page-icon-item" />}
      {color === ICONS_COLORS.WHITE && <ScreenSplitWhite className="page-icon-item" />}
      {color === ICONS_COLORS.GREY && <ScreenSplitGrey className="page-icon-item" />}
    </div>
  );
};

export default SplitScreenTool;
