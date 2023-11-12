import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ReactComponent as MaterialEstudioBlack } from 'assets/learningContent/iconsBlack/material-estudio-black.svg';
import { ReactComponent as MaterialEstudioGrey } from 'assets/learningContent/iconsGrey/material estudio grey.svg';
import { ReactComponent as MaterialEstudioWhite } from 'assets/learningContent/iconsWhite/material estudio white.svg';
import { ICONS_COLORS } from '../../../enums/constants.enum';

const DigitalBookAccess = ({ color, history }) => {
  const handleClick = () => {
    history.replace('/learning-content');
  };

  return (
    <div onClick={handleClick}>
      <Link to={'learning-content'}>
        {color === ICONS_COLORS.BLACK && (
          <MaterialEstudioBlack className="page-icon-item" />
        )}
        {color === ICONS_COLORS.GREY && (
          <MaterialEstudioGrey className="page-icon-item" />
        )}
        {color === ICONS_COLORS.WHITE && (
          <MaterialEstudioWhite className="page-icon-item" />
        )}
      </Link>
    </div>
  );
};

export default withRouter(DigitalBookAccess);
