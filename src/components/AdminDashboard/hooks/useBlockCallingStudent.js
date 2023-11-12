import { useMutation } from '@apollo/client';
import { BLOCK_CALLING_STUDENT } from '../graphql/mutations';

export const useBlockCallingStudent = () => {
  const [
    StudentBlockCalling,
    { loading: updateStudentLoading, error: removeStudentError }
  ] = useMutation(BLOCK_CALLING_STUDENT, {
    refetchQueries: ['listStudents']
  });

  function updateStudentBlockCalling(id, callingBlock) {
    return StudentBlockCalling({ variables: { id, callingBlock } });
  }

  return { updateStudentBlockCalling, updateStudentLoading, removeStudentError };
};
