import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { CREATE_USER_PROGRESS, UPDATE_USER_LEVEL_PROGRESS } from '../graphQL/mutations';

export default function useCreateStudyProgress() {
  const [createProgress, { loading, error }] = useMutation(CREATE_USER_PROGRESS);
  const [updateLevelProgress] = useMutation(UPDATE_USER_LEVEL_PROGRESS);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return {
    loading,
    error,
    createProgress,
    updateLevelProgress
  };
}
