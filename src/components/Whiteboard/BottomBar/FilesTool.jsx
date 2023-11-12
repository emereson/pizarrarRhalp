import React from 'react';
import { ICONS_COLORS } from '../../../enums/constants.enum';
import { ReactComponent as FilesBlack } from 'assets/whiteboard/black/files-black.svg';
import { ReactComponent as FilesGrey } from 'assets/whiteboard/grey/files-grey.svg';
import { ReactComponent as FilesWhite } from 'assets/whiteboard/white/files-white.svg';

const FilesTool = ({ color, onClick }) => {
  return (
    <div onClick={onClick}>
      {color === ICONS_COLORS.BLACK && <FilesBlack className="page-icon-item" />}
      {color === ICONS_COLORS.WHITE && <FilesWhite className="page-icon-item" />}
      {color === ICONS_COLORS.GREY && <FilesGrey className="page-icon-item" />}
    </div>
  );
};

export default FilesTool;
