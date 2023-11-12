import { useMutation } from '@apollo/client';
import { UPDATE_CALLING_STUDENT } from '../graphql/mutations';

export const useStateCallingStudent = () => {
  const [
    StudentStateCalling,
    { loading: updateStudentLoading, error: removeStudentError }
  ] = useMutation(UPDATE_CALLING_STUDENT, {
    refetchQueries: ['listStudents']
  });

  function updateStudentStateCalling(id, callingState) {
    return StudentStateCalling({ variables: { id, callingState } });
  }

  return { updateStudentStateCalling, updateStudentLoading, removeStudentError };
};
