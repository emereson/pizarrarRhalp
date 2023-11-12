import { useEffect } from 'react';
import { DELETE_EXAM_SECTION } from '../graphQL/mutations';
import { GET_EXAM } from '../graphQL/queries';
import { useMutation } from '@apollo/client';

export const useDeleteExamSection = () => {
  const [
    deleteExamSectionMutation,
    { loading: deletingExamSection, error: errorDeletingExamSection }
  ] = useMutation(DELETE_EXAM_SECTION, { refetchQueries: [GET_EXAM] });

  useEffect(() => {
    if (errorDeletingExamSection) {
      console.error(errorDeletingExamSection);
    }
  }, [errorDeletingExamSection]);

  /**
   *
   * @param {string} id
   * @returns {function} deleteQuestionMutation
   * Deletes a ExamSection identified by id
   */
  function deleteExamSectionRequest(id, examId) {
    if (deletingExamSection) return;
    return deleteExamSectionMutation({
      variables: { id, examId }
    });
  }

  return { deleteExamSectionRequest, deletingExamSection, errorDeletingExamSection };
};
