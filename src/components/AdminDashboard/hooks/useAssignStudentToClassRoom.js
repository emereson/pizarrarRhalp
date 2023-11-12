import { ASSIGN_STUDENT_TO_CLASSROOM } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

export const useAssignStudentToClassRoom = () => {
  const [
    assignStudentToClassRoom,
    { loading: assignStudentLoading, error: assignStudentError }
  ] = useMutation(ASSIGN_STUDENT_TO_CLASSROOM, {
    refetchQueries: ['listClassRooms']
  });

  return { assignStudentToClassRoom, assignStudentLoading, assignStudentError };
};
