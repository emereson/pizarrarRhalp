import { useMutation } from '@apollo/client';
import { UPDATE_CALLING_TEACHER } from '../graphql/mutations';

export const useStateCallingTeacher = () => {
  const [
    teacherStateCalling,
    { loading: updateTeacherLoading, error: removeTeacherError }
  ] = useMutation(UPDATE_CALLING_TEACHER, {
    refetchQueries: ['listTeachers']
  });

  function updateTeacherStateCalling(id, callingState) {
    return teacherStateCalling({ variables: { id, callingState } });
  }

  return { updateTeacherStateCalling, updateTeacherLoading, removeTeacherError };
};
