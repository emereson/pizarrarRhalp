import { useMutation } from '@apollo/client';
import { BLOCK_CALLING_TEACHER } from '../graphql/mutations';

export const useBlockCallingTeacher = () => {
  const [
    teacherBlockCalling,
    { loading: updateTeacherLoading, error: removeTeacherError }
  ] = useMutation(BLOCK_CALLING_TEACHER, {
    refetchQueries: ['listTeachers']
  });

  function updateTeacherBlockCalling(id, callingBlock) {
    return teacherBlockCalling({ variables: { id, callingBlock } });
  }

  return { updateTeacherBlockCalling, updateTeacherLoading, removeTeacherError };
};
