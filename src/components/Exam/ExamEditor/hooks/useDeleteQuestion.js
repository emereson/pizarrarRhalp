import { useEffect } from 'react';
import { DELETE_EXAM_QUESTION } from '../graphQL/mutations';
import { GET_EXAM } from '../graphQL/queries';
import { useMutation } from '@apollo/client';

export const useDeleteQuestion = () => {
  const [
    deleteQuestionMutation,
    { loading: deletingQuestion, error: errorDeletingQuestion }
  ] = useMutation(DELETE_EXAM_QUESTION, { refetchQueries: [GET_EXAM] });

  useEffect(() => {
    if (errorDeletingQuestion) {
      console.error(errorDeletingQuestion);
    }
  }, [errorDeletingQuestion]);

  /**
   *
   * @param {ExamQuestion} question
   * @returns {function} deleteQuestionMutation
   * Deletes a question identified by id
   */
  function deleteQuestion(question, examId) {
    if (deletingQuestion) return;
    return deleteQuestionMutation({
      variables: { id: question.id }
    });
  }

  return { deleteQuestion, deletingQuestion, errorDeletingQuestion };
};
