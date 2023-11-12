import { useEffect } from 'react';
import { useUser } from 'components/UserManagment/UserProvider';
import { useLocation, useParams } from 'react-router-dom';
import { useUserRole } from 'services/cognito.service';
import { useStateCallingTeacher } from 'components/AdminDashboard/hooks/useStateCallingTeacher';
import { useStateCallingStudent } from 'components/AdminDashboard/hooks/useStateCallingStudent';
import { useInitCallingTeacher } from 'components/AdminDashboard/hooks/useInitCallingTeacher';
import { useInitCallingStudent } from 'components/AdminDashboard/hooks/useInitCallingStudent';
import { useOneBlockCallingStudent } from 'components/AdminDashboard/hooks/useOneBlockCallingStudent';
import { useOneBlockCallingTeacher } from 'components/AdminDashboard/hooks/useOneBlockCallingTeacher';

export const RouteInterceptor = () => {
  const location = useLocation();
  const { classRoomId } = useParams();

  const { updateTeacherStateCalling } = useStateCallingTeacher();
  const { updateStudentStateCalling } = useStateCallingStudent();

  // active or InActive
  const { updateTeacherInitCalling } = useInitCallingTeacher();
  const { updateStudentInitCalling } = useInitCallingStudent();

  // OneBlock
  const { updateTeacherOneBlockCalling } = useOneBlockCallingTeacher();
  const { updateStudentOneBlockCalling } = useOneBlockCallingStudent();

  let change = location.pathname.startsWith(`/whiteBoard/${classRoomId}`);
  const { user } = useUser();
  let userRole = useUserRole();

  useEffect(() => {
    switch (userRole) {
      case 'TEACHER':
        if (user) {
          updateTeacherStateCalling(
            user?.attributes?.sub,
            change ? 'onblackboard' : 'none'
          );

          // active or InActive
          updateTeacherInitCalling(user?.attributes?.sub, change ? 'active' : 'InActive');

          // onBlock
          updateTeacherOneBlockCalling(user?.attributes?.sub, 'none');
        }
        break;
      case 'STUDENT':
        if (user) {
          updateStudentStateCalling(
            user?.attributes?.sub,
            change ? 'onblackboard' : 'none'
          );

          // active or InActive
          updateStudentInitCalling(user?.attributes?.sub, change ? 'active' : 'InActive');

          // onBlock
          updateStudentOneBlockCalling(user?.attributes?.sub, 'none');
        }
        break;
    }
  }, [change, userRole, user?.attributes?.sub]);

  return null;
};
