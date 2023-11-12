import { useMutation } from '@apollo/client';
import { INIT_CALLING_STUDENT } from '../graphql/mutations';

export const useInitCallingStudent = () => {
  const [
    StudentInitCalling,
    { loading: updateStudentLoading, error: removeStudentError }
  ] = useMutation(INIT_CALLING_STUDENT, {
    refetchQueries: ['listStudents']
  });

  function updateStudentInitCalling(id, callingInit) {
    return StudentInitCalling({ variables: { id, callingInit } });
  }

  return { updateStudentInitCalling, updateStudentLoading, removeStudentError };
};
