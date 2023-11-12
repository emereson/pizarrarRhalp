import { useLoadExam } from 'components/Exam/hooks/useLoadExam';
import { useCallback, useEffect, useState } from 'react';
import { useCreateExam } from './useCreateExam';
import { useCreateExamSection } from './useCreateExamSection';
import { useCreateQuestion } from './useCreateQuestion';
import { useEditQuestion } from './useEditQuestion';
import { useUpdateExam } from './useUpdateExam';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'core-js/fn/promise';
import { Storage } from 'aws-amplify';

export const useDuplicateExam = oldExam => {
  const [loading, setloading] = useState(false);
  const { createExam, error } = useCreateExam();
  const { updateExam, updatingExam } = useUpdateExam();
  const { createExamSectionRequest, creatingExamSection, errorCreatingExamSection } =
    useCreateExamSection();
  const { createQuestion, creatingQuestion, errorCreatingQuestion } = useCreateQuestion();
  const { updateQuestionRequest } = useEditQuestion();
  const { examData } = useLoadExam(oldExam);
  const { examSections } = examData;

  const receiveData = (values, color, newExamName, testing) => {
    setloading(true);
    return new Promise(async (response, reject) => {
      if (values) {
        const data = {
          id: newExamName,
          minScore: values.score.min,
          maxSCore: values.score.max,
          scoreFeedback: values.score.feedback,
          correctAnswers: values.correct.correctList,
          correctAnswersFeedback: values.correct.feedback,
          inCorrectAnswers: values.incorrect.incorrectList,
          inCorrectAnswersFeedback: values.incorrect.feedback,
          ranks: JSON.stringify(values.ranks),
          selectedEvaluations: [...values.selectedEvaluations],
          examColorScheme: color
        };
        setloading(false);
        handleExecuteDuplicate(data)
          .then(res => {
            response(newExamName);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  };

  const duplicateSectionsAndQuestions = async DuplicatingData =>
    new Promise(async (response, reject) => {
      try {
        if (Array.isArray(examSections.items)) {
          for await (const section of examSections.items) {
            console.log('duplication-started');
            const sectionId = await createExamSectionRequest(DuplicatingData.id, true);
            console.log('section-created-for->', DuplicatingData.id);
            for await (const question of section.questions.items) {
              console.log('async-function-started');
              const result = await createQuestion({
                id: uuidv4(),
                examSectionId: sectionId
              });
              if (question.image)
                await Storage.copy(
                  { key: question.image },
                  { key: DuplicatingData.id + question.image }
                ).key;
              if (question.audio)
                await Storage.copy(
                  { key: question.audio },
                  { key: DuplicatingData.id + question.audio }
                ).key;
              if (result) console.log('async-function-at-middle');
              const questionUpdateResult = await updateQuestionRequest({
                ...question,
                ...result,
                image: question.image
                  ? DuplicatingData.id + question.image
                  : question.image,
                audio: question.audio
                  ? DuplicatingData.id + question.audio
                  : question.audio
              });
              if (questionUpdateResult) {
                console.log('resolved...');
                response(
                  'resolved-question-(' +
                    question.statement +
                    ')-in-section-' +
                    sectionId +
                    '-in-exam-' +
                    DuplicatingData.id
                );
              }
            }
            console.log('resolved all section', sectionId);
          }
        }
      } catch (error) {
        reject(error);
      }
    });

  const handleExecuteDuplicate = useCallback(
    DuplicatingData =>
      new Promise((response, reject) => {
        console.log('received values, proceed duplicating');

        if (DuplicatingData) {
          if (examSections.items.length >= 0) {
            try {
              createExam(DuplicatingData?.id)
                .then(result => {
                  updateExam(DuplicatingData)
                    .then(() => {
                      console.log('exam-duplicated-with-id->', DuplicatingData.id);
                      duplicateSectionsAndQuestions(DuplicatingData)
                        .then(res => {
                          console.log('aqui respuesta', res);
                          response(res);
                        })
                        .catch(err => {
                          reject('error-duplicating-questions', err);
                        });
                    })
                    .catch(err => {
                      reject('error-duplicating-exam', err);
                    });
                })
                .catch(err => {
                  reject('error-duplicating-exam', err);
                });
            } catch (error) {
              reject('error-duplicating-exam', error);
            }
          }
        }
      }),
    [examSections]
  );

  return {
    loading,
    receiveData
  };
};
