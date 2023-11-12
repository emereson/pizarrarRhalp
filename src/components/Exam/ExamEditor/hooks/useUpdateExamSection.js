import { useEffect } from 'react';
import { UPDATE_EXAM_SECTION } from '../graphQL/mutations';
import { useMutation } from '@apollo/client';
import { useErrorHandler } from 'react-error-boundary';

export const useUpdateExamSection = () => {
  const [
    updateExamSectionMutation,
    { loading: updatingExamSection, error: errorUpdatingExamSection }
  ] = useMutation(UPDATE_EXAM_SECTION);
  useErrorHandler(errorUpdatingExamSection);

  useEffect(() => {
    if (errorUpdatingExamSection) {
      console.error(errorUpdatingExamSection);
    }
  }, [errorUpdatingExamSection]);

  /**
   *
   * @param {ExamSection} examSection
   * @returns
   */
  function updateExamSectionRequest(examSection) {
    return updateExamSectionMutation({ variables: examSection });
  }

  return { updateExamSectionRequest, updatingExamSection, errorUpdatingExamSection };
};
