import React from 'react';
import { ICONS_COLORS, USER_ROLES } from '../../../enums/constants.enum';
import { ReactComponent as ClassicStyleBlack } from 'assets/whiteboard/black/classic-style-black.svg';
import { ReactComponent as ModernStyleBlack } from 'assets/whiteboard/black/modern-style-black.svg';
import { ReactComponent as ClassicStyleGrey } from 'assets/whiteboard/grey/classic-style-grey.svg';
import { ReactComponent as ModernStyleGrey } from 'assets/whiteboard/grey/modern-style-grey.svg';
import { ReactComponent as ClassicStyleWhite } from 'assets/whiteboard/white/classic-style-white.svg';
import { ReactComponent as ModernStyleWhite } from 'assets/whiteboard/white/modern-style-white.svg';
import { useUpdateWhiteBoardTheme } from '../hooks/useUpdateWhiteBoardTheme';
import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useUserRole } from '../../../services/cognito.service';

const WhiteBoardThemeTool = ({ color }) => {
  const { loading, setWhiteBoardTheme } = useUpdateWhiteBoardTheme();
  const userRole = useUserRole();
  const { isCrystalTheme } = useUserClassRoom();

  const updateWhiteBoardTheme = theme => {
    setWhiteBoardTheme(theme);
  };

  if (loading) {
    return <LoadingSpinner customClasses={isCrystalTheme ? 'text-light' : null} />;
  }

  if (![USER_ROLES.ADMINS, USER_ROLES.TEACHERS].includes(userRole)) {
    return null;
  }

  if (isCrystalTheme) {
    return (
      <div onClick={() => updateWhiteBoardTheme(false)}>
        {color === ICONS_COLORS.BLACK && <ClassicStyleBlack className="page-icon-item" />}
        {color === ICONS_COLORS.WHITE && <ClassicStyleWhite className="page-icon-item" />}
        {color === ICONS_COLORS.GREY && <ClassicStyleGrey className="page-icon-item" />}
      </div>
    );
  } else {
    return (
      <div onClick={() => updateWhiteBoardTheme(true)}>
        {color === ICONS_COLORS.BLACK && <ModernStyleBlack className="page-icon-item" />}
        {color === ICONS_COLORS.WHITE && <ModernStyleWhite className="page-icon-item" />}
        {color === ICONS_COLORS.GREY && <ModernStyleGrey className="page-icon-item" />}
      </div>
    );
  }
};

export default WhiteBoardThemeTool;
