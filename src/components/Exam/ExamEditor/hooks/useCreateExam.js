import { useEffect } from 'react';
import { CREATE_EXAM } from '../graphQL/mutations';
import { useMutation } from '@apollo/client';

export const useCreateExam = () => {
  const [createExamMutation, { loading, error }] = useMutation(CREATE_EXAM);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  /**
   *
   * @param {string} id
   * @returns {function} createExamMutation
   * Creates a new English Test
   */
  function createExam(id) {
    return new Promise((response, reject) => {
      createExamMutation({
        variables: { id }
      }).then(res => {
        response(res);
      });
    });
  }

  return { createExam, loading, error };
};
