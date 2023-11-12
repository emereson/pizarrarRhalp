import {
  UPDATE_EXAM_QUESTION,
  UPDATE_EXAM_QUESTION_AUDIO,
  UPDATE_EXAM_QUESTION_IMAGE
} from '../graphQL/mutations';
import { GET_EXAM } from '../graphQL/queries';
import { useMutation } from '@apollo/client';

export const useUpdateQuestion = () => {
  const [
    updateExamQuestionMutation,
    { loading: updatingExamQuestion, error: errorUpdatingExamQuestion }
  ] = useMutation(UPDATE_EXAM_QUESTION);

  const [updateQuestionImage, { loading: updatingImage, error: errorUpdatingImage }] =
    useMutation(UPDATE_EXAM_QUESTION_IMAGE);

  const [updateQuestionAudio, { loading: updatingAudio, error: errorUpdatingAudio }] =
    useMutation(UPDATE_EXAM_QUESTION_AUDIO);

  /**
   *
   * @param {ExamQuestion} question
   */
  function updateQuestion(question) {
    return updateExamQuestionMutation({ variables: question });
  }

  return {
    updateQuestion,
    updatingExamQuestion,
    errorUpdatingExamQuestion,
    updateQuestionImage,
    updatingImage,
    errorUpdatingImage,
    updateQuestionAudio,
    updatingAudio,
    errorUpdatingAudio
  };
};
