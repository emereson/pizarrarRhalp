import React from 'react';
import { ReactComponent as LockIconBlack } from 'assets/whiteboard/black/black-lock.svg';
import { ReactComponent as LockIconGrey } from 'assets/whiteboard/grey/lock-grey.svg';
import { ReactComponent as LockIconWhite } from 'assets/whiteboard/white/lock-white.svg';
import { ReactComponent as LockOpenBlack } from 'assets/whiteboard/black/open-lock-black.svg';
import { ReactComponent as LockOpenGrey } from 'assets/whiteboard/grey/open-lock-grey.svg';
import { ReactComponent as LockOpenWhite } from 'assets/whiteboard/white/open-lock-white.svg';
import { ICONS_COLORS } from '../../../enums/constants.enum';
import { useToggleClassRoomState } from '../hooks/useToggleClassRoom';
import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useUserRole } from '../../../services/cognito.service';
import { USER_ROLES } from '../../../enums/constants.enum';

const BlockTool = ({ color }) => {
  const { setClassRoomState, loading } = useToggleClassRoomState();
  const { assignedClassRoom, isDisabled, isCrystalTheme } = useUserClassRoom();
  const userRole = useUserRole();

  const toggleBlockTool = () => {
    setClassRoomState(assignedClassRoom.classRoomId, !isDisabled);
  };

  if (![USER_ROLES.ADMINS, USER_ROLES.TEACHERS].includes(userRole)) {
    return null;
  }

  if (loading) {
    return <LoadingSpinner customClasses={isCrystalTheme ? 'text-light' : null} />;
  }

  return (
    <div onClick={toggleBlockTool}>
      {color === ICONS_COLORS.BLACK &&
        (isDisabled ? (
          <LockIconBlack className="page-icon-item" />
        ) : (
          <LockOpenBlack className="page-icon-item" />
        ))}
      {color === ICONS_COLORS.WHITE &&
        (isDisabled ? (
          <LockIconWhite className="page-icon-item" />
        ) : (
          <LockOpenWhite className="page-icon-item" />
        ))}
      {color === ICONS_COLORS.GREY &&
        (isDisabled ? (
          <LockIconGrey className="page-icon-item" />
        ) : (
          <LockOpenGrey className="page-icon-item" />
        ))}
    </div>
  );
};

export default BlockTool;
