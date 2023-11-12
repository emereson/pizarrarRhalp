import { REMOVE_TEACHER_FROM_CLASSROOM } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

export const useRemoveTeacherFromClassRoom = () => {
  const [
    removeTeacherFromClassRoomMutation,
    { loading: removeTeacherLoading, error: removeTeacherError }
  ] = useMutation(REMOVE_TEACHER_FROM_CLASSROOM, {
    refetchQueries: ['listClassRooms']
  });

  function removeTeacherFromClassRoom(teacherId, classRoomId) {
    return removeTeacherFromClassRoomMutation({ variables: { teacherId, classRoomId } });
  }

  return { removeTeacherFromClassRoom, removeTeacherLoading, removeTeacherError };
};
