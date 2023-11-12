import { useMutation } from '@apollo/client';
import { ONE_BLOCK_CALLING_STUDENT } from '../graphql/mutations';

export const useOneBlockCallingStudent = () => {
  const [
    StudentOneBlockCalling,
    { loading: updateStudentLoading, error: removeStudentError }
  ] = useMutation(ONE_BLOCK_CALLING_STUDENT, {
    refetchQueries: ['listStudents']
  });

  function updateStudentOneBlockCalling(id, callingOneBlock) {
    return StudentOneBlockCalling({ variables: { id, callingOneBlock } });
  }

  return { updateStudentOneBlockCalling, updateStudentLoading, removeStudentError };
};
