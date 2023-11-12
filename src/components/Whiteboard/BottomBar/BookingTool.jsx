import React from 'react';
import { ICONS_COLORS } from '../../../enums/constants.enum';
import { ReactComponent as BookingBlack } from 'assets/whiteboard/black/study-black.svg';
import { ReactComponent as BookingGrey } from 'assets/whiteboard/grey/study-grey.svg';
import { ReactComponent as BookingWhite } from 'assets/whiteboard/white/study-white.svg';

const BookingTool = ({ color, onClick }) => {
  return (
    <div onClick={onClick}>
      {color === ICONS_COLORS.BLACK && <BookingBlack className="page-icon-item" />}
      {color === ICONS_COLORS.WHITE && <BookingWhite className="page-icon-item" />}
      {color === ICONS_COLORS.GREY && <BookingGrey className="page-icon-item" />}
    </div>
  );
};

export default BookingTool;
