import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EXAM } from '../ExamEditor/graphQL/queries';
import { useErrorHandler } from 'react-error-boundary';
import { useCreateExamSection } from '../ExamEditor/hooks/useCreateExamSection';

const DEFAULT_EXAM_DATA = {
  currentExamSection: {},
  currentExamQuestion: {},
  results: {},
  totalSections: 0,
  totalQuestionsInCurrentSection: 0,
  totalQuestions: 0,
  currentExamQuestionRelativeNumber: 0
};

export const useLoadExam = examId => {
  const {
    loading: loadingExam,
    error: errorLoadingExam,
    data: examData
  } = useQuery(GET_EXAM, {
    variables: { id: examId }
  });
  useErrorHandler(errorLoadingExam);
  const handleError = useErrorHandler();
  const { createExamSectionRequest, creatingExamSection } = useCreateExamSection();

  useEffect(() => {
    if (examData) {
      if (!examData.getExam) {
        handleError(
          new Error(`English test with id ${examId} does not exist, seed the database`)
        );
      } else {
        if (!examData.getExam.examSections.items.length) {
          handleError(new Error(`create at least one ExamSection, seed the database `));
        }
        if (!examData.getExam.examSections.items[0]?.questions?.items.length) {
          handleError(new Error(`create at least one ExamQuestion, seed the database `));
        }
      }
    }
  }, [examData, examId, handleError]);

  return {
    examData: examData?.getExam ? examData.getExam : DEFAULT_EXAM_DATA,
    loadingExam,
    errorLoadingExam
  };
};
