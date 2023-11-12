import { useMutation } from '@apollo/client';
import { INIT_CALLING_TEACHER } from '../graphql/mutations';

export const useInitCallingTeacher = () => {
  const [
    teacherInitCalling,
    { loading: updateTeacherLoading, error: removeTeacherError }
  ] = useMutation(INIT_CALLING_TEACHER, {
    refetchQueries: ['listTeachers']
  });

  function updateTeacherInitCalling(id, callingInit) {
    return teacherInitCalling({ variables: { id, callingInit } });
  }

  return { updateTeacherInitCalling, updateTeacherLoading, removeTeacherError };
};
