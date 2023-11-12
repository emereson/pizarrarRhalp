import React from 'react';
import { ICONS_COLORS, USER_ROLES } from '../../../enums/constants.enum';
import { ReactComponent as RecolorDropBlack } from 'assets/whiteboard/black/recolor-drop-black.svg';
import { ReactComponent as RecolorDropGrey } from 'assets/whiteboard/grey/recolor-drop-grey.svg';
import { ReactComponent as RecolorDropWhite } from 'assets/whiteboard/white/recolor-drop-white.svg';
import { useUpdateClassRoomIconsColor } from '../hooks/useUpdateIconsColor';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';
import { useUserRole } from 'services/cognito.service';
const IconsColorTool = ({ color }) => {
  const { loading, applyToAllChangeIconsColors } = useUpdateClassRoomIconsColor();
  const { isCrystalTheme } = useUserClassRoom();
  const userRole = useUserRole();
  //chager color mode
  const changeModeColor = () => {
    if (color === ICONS_COLORS.BLACK) {
      applyToAllChangeIconsColors(ICONS_COLORS.GREY);
    } else if (color === ICONS_COLORS.GREY) {
      applyToAllChangeIconsColors(ICONS_COLORS.WHITE);
    } else {
      applyToAllChangeIconsColors(ICONS_COLORS.BLACK);
    }
  };

  if (![USER_ROLES.ADMINS, USER_ROLES.TEACHERS].includes(userRole)) {
    return null;
  }

  if (loading) {
    return <LoadingSpinner customClasses={isCrystalTheme ? 'text-light' : null} />;
  }

  return (
    <div onClick={changeModeColor}>
      {color === ICONS_COLORS.BLACK && <RecolorDropBlack className="page-icon-item" />}
      {color === ICONS_COLORS.WHITE && <RecolorDropWhite className="page-icon-item" />}
      {color === ICONS_COLORS.GREY && <RecolorDropGrey className="page-icon-item" />}
    </div>
  );
};

export default IconsColorTool;
