import { useCreateQuestion } from './useCreateQuestion';
import { useUpdateQuestion } from './useUpdateQuestion';
import { useDeleteQuestion } from './useDeleteQuestion';
import { useErrorHandler } from 'react-error-boundary';
import { S3Service } from 'services/S3.service';
import { examQuestionEditingValuesVar } from '../../typePolicies';
import { useReactiveVar } from '@apollo/client';

const s3Service = new S3Service();

export const useEditQuestion = examId => {
  const currentExamQuestionEditingValues = useReactiveVar(examQuestionEditingValuesVar);
  const { createQuestion, creatingQuestion, errorCreatingQuestion } = useCreateQuestion();
  const { deleteQuestion, deletingQuestion, errorDeletingQuestion } = useDeleteQuestion();

  const { updateQuestion, updatingQuestion, errorUpdatingQuestion } = useUpdateQuestion();
  // derived state
  useErrorHandler(errorCreatingQuestion);
  useErrorHandler(errorDeletingQuestion);
  useErrorHandler(errorUpdatingQuestion);

  /**
   * Deletes the question from Appsync
   * Deletes s3 image if it exist
   * Deletes s3 audio if it exist
   */
  function deleteQuestionRequest(question) {
    if (currentExamQuestionEditingValues.image) {
      s3Service.deleteFileByName(currentExamQuestionEditingValues.image);
    }
    if (currentExamQuestionEditingValues.audio) {
      s3Service.deleteFileByName(currentExamQuestionEditingValues.audio);
    }
    return deleteQuestion(question);
  }

  /**
   * @param {ExamQuestion} question
   * */
  async function createQuestionRequest(question) {
    createQuestion(question, examId);
  }

  /**
   * @param {ExamQuestion} question
   */
  const updateQuestionRequest = async question => {
    return updateQuestion(question);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    const newquestionValues = { ...currentExamQuestionEditingValues, [name]: value };
    examQuestionEditingValuesVar(newquestionValues);
  };

  const handleCheckBoxChange = event => {
    const { name, checked } = event.target;
    const correctOptionsValues = checked
      ? [...currentExamQuestionEditingValues.correctOptions, name]
      : currentExamQuestionEditingValues.correctOptions.filter(opt => opt !== name);
    const newquestionValues = {
      ...currentExamQuestionEditingValues,
      correctOptions: correctOptionsValues
    };
    examQuestionEditingValuesVar(newquestionValues);
  };

  function handleNeedsRecordingChange() {
    const newquestionValues = {
      ...currentExamQuestionEditingValues,
      needsRecording: !currentExamQuestionEditingValues.needsRecording
    };
    examQuestionEditingValuesVar(newquestionValues);
    updateQuestionRequest(newquestionValues);
  }

  function isOptionChecked(option) {
    return !!currentExamQuestionEditingValues.correctOptions?.find(opt => option === opt);
  }

  return {
    handleInputChange,
    handleCheckBoxChange,
    createQuestionRequest,
    deleteQuestionRequest,
    isOptionChecked,
    updateQuestionRequest,
    creatingQuestion,
    deletingQuestion,
    updatingQuestion,
    handleNeedsRecordingChange
  };
};
