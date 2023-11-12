import { REMOVE_STUDENT_FROM_CLASSROOM } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

export const useRemoveStudentFromClassRoom = () => {
  const [
    removeStudentFromClassRoomMutation,
    { loading: removeStudentLoading, error: removeStudentError }
  ] = useMutation(REMOVE_STUDENT_FROM_CLASSROOM, {
    refetchQueries: ['listClassRooms']
  });

  function removeStudentFromClassRoom(studentId, classRoomId) {
    return removeStudentFromClassRoomMutation({ variables: { studentId, classRoomId } });
  }

  return { removeStudentFromClassRoom, removeStudentLoading, removeStudentError };
};
