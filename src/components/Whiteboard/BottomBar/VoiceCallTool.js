import React, { useContext } from 'react';
import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';
import { ReactComponent as MicroBlack } from 'assets/whiteboard/black/mic-black.svg';
import { ReactComponent as MicroGrey } from 'assets/whiteboard/grey/mic-grey.svg';
import { ReactComponent as MicroWhite } from 'assets/whiteboard/white/mic-white.svg';
import { ReactComponent as ExitCallIcon } from 'assets/voice-call/exit-call.svg';
import { ICONS_COLORS } from '../../../enums/constants.enum';
import { VoiceContext } from 'components/VoiceCall/VoiceProvider';
import { useUser } from 'components/UserManagment/UserProvider';
import { useStateCallingTeacher } from 'components/AdminDashboard/hooks/useStateCallingTeacher';
import { useStateCallingStudent } from 'components/AdminDashboard/hooks/useStateCallingStudent';
import { useUserRole } from 'services/cognito.service';

const VoiceCallTool = ({ color }) => {
  const { isDisabled } = useUserClassRoom();
  const { state, initiateCall, dispatch } = useContext(VoiceContext);
  const { updateTeacherStateCalling } = useStateCallingTeacher();
  const { updateStudentStateCalling } = useStateCallingStudent();
  const { user } = useUser();
  let userRole = useUserRole();
  const { token, exitCall } = state;

  const handleExit = () => {
    dispatch({ type: 'EXIT_CALL', playload: !exitCall });
    switch (userRole) {
      case 'TEACHER':
        updateTeacherStateCalling(user.attributes.sub, 'onblackboard');
        break;
      case 'STUDENT':
        updateStudentStateCalling(user.attributes.sub, 'onblackboard');
        break;
    }
  };

  return (
    <div>
      {token ? (
        <ExitCallIcon className="page-icon-item" onClick={() => handleExit()} />
      ) : (
        <>
          {color === ICONS_COLORS.BLACK &&
            (isDisabled ? (
              <MicroBlack className="page-icon-item" onClick={() => initiateCall()} />
            ) : (
              <MicroBlack className="page-icon-item" onClick={() => initiateCall()} />
            ))}
          {color === ICONS_COLORS.WHITE &&
            (isDisabled ? (
              <MicroWhite className="page-icon-item" onClick={() => initiateCall()} />
            ) : (
              <MicroWhite className="page-icon-item" onClick={() => initiateCall()} />
            ))}
          {color === ICONS_COLORS.GREY &&
            (isDisabled ? (
              <MicroGrey className="page-icon-item" onClick={() => initiateCall()} />
            ) : (
              <MicroGrey className="page-icon-item" onClick={() => initiateCall()} />
            ))}
        </>
      )}
    </div>
  );
};

export default VoiceCallTool;
