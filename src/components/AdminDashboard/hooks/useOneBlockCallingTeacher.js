import { useMutation } from '@apollo/client';
import { ONE_BLOCK_CALLING_TEACHER } from '../graphql/mutations';

export const useOneBlockCallingTeacher = () => {
  const [
    teacherOneBlockCalling,
    { loading: updateTeacherLoading, error: removeTeacherError }
  ] = useMutation(ONE_BLOCK_CALLING_TEACHER, {
    refetchQueries: ['listTeachers']
  });

  function updateTeacherOneBlockCalling(id, callingOneBlock) {
    return teacherOneBlockCalling({ variables: { id, callingOneBlock } });
  }

  return { updateTeacherOneBlockCalling, updateTeacherLoading, removeTeacherError };
};
