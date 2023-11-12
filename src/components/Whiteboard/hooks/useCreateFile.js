import { useEffect } from 'react';
import { CREATE_FILE } from '../graphQL/mutations';
import { useMutation } from '@apollo/client';

/**
 * creates a new file and refetches all files to update the cache
 *
 */
export const useCreateFile = () => {
  const [createFile, { loading, error }] = useMutation(CREATE_FILE, {
    refetchQueries: ['FilesByUsers']
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return { createFile, loading, error };
};
