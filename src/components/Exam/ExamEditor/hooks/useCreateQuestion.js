import { useEffect } from 'react';
import { CREATE_EXAM_QUESTION } from '../graphQL/mutations';
import { GET_EXAM } from '../graphQL/queries';
import { useMutation } from '@apollo/client';

export const useCreateQuestion = () => {
  const [
    createQuestionMutation,
    { loading: creatingQuestion, error: errorCreatingQuestion }
  ] = useMutation(CREATE_EXAM_QUESTION, { refetchQueries: [GET_EXAM] });

  useEffect(() => {
    if (errorCreatingQuestion) {
      console.error(errorCreatingQuestion);
    }
  }, [errorCreatingQuestion]);

  /**
   *
   * @param {ExamQuestion} question
   * @returns {function} createQuestionMutation
   * Creates a new question and update apollo cache with the newly created question
   */
  function createQuestion(question) {
    return new Promise((response, reject) => {
      createQuestionMutation({
        variables: question
      }).then(() => {
        response(question);
      });
    });
  }

  return { createQuestion, creatingQuestion, errorCreatingQuestion };
};
