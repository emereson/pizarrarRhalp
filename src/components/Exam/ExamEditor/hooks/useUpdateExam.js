import { useEffect } from 'react';
import { UPDATE_EXAM } from '../graphQL/mutations';
import { useMutation } from '@apollo/client';
import { useErrorHandler } from 'react-error-boundary';

export const useUpdateExam = () => {
  const [updateExamMutation, { loading: updatingExam, error: errorUpdatingExam }] =
    useMutation(UPDATE_EXAM);
  useErrorHandler(errorUpdatingExam);

  useEffect(() => {
    if (errorUpdatingExam) {
      console.error(errorUpdatingExam);
    }
  }, [errorUpdatingExam]);

  /**
   *
   * @param {Exam} exam
   * @returns
   */
  function updateExam(exam) {
    return updateExamMutation({ variables: exam });
  }

  return { updateExam, updatingExam, errorUpdatingExam };
};
