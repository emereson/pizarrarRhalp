import { makeVar } from '@apollo/client';

export const examSectionNumberVar = makeVar(0);
export const examQuestionNumberVar = makeVar(0);
export const examQuestionEditingValuesVar = makeVar({});
export const feedbackEditingValuesVar = makeVar({});
export const questionValuesVar = makeVar(null);
export const selectedAnswersVar = makeVar({}); //{'questionId' : ['A', 'B']} means A and B options are selected

export const ExamPolicy = {
  Exam: {
    fields: {
      currentExamSection: {
        read(_, { readField }) {
          const sections = readField('examSections') || { items: [] };
          const currentSectionRef = sections.items[examSectionNumberVar()];
          if (!currentSectionRef) return { questions: [] };
          const id = readField('id', currentSectionRef);
          const command = readField('command', currentSectionRef) || '';
          const questionsRefs = readField('questions', currentSectionRef) || {
            items: []
          };
          const questions = questionsRefs.items.map(questionRef => {
            const questionData = readQuestion(questionRef, readField);
            const data = {
              examSectionId: id,
              command,
              ...questionData
            };
            return data;
          });
          return {
            id,
            command,
            questions
          };
        }
      },
      results: {
        read(_, { readField }) {
          const allQuestions = getAllQuestions(readField);
          const selectedAnswers = selectedAnswersVar();
          const results = allQuestions.reduce((result, question, index) => {
            const correctOptions = question.correctOptions || [];
            const correctOptionsSorted = [...correctOptions].sort();
            const questionAnswers = selectedAnswers[question.id] || [];
            const questionAnswersSorted = [...questionAnswers].sort();
            const isCorrect =
              correctOptionsSorted.length > 0 &&
              JSON.stringify(correctOptionsSorted) ===
                JSON.stringify(questionAnswersSorted);
            result[question.id] = {
              questionNumber: index + 1,
              selectedAnwers: questionAnswersSorted,
              correctOptions: correctOptionsSorted,
              isCorrect
            };
            return result;
          }, {});
          return results;
        }
      },
      totalSections: {
        read(_, { readField }) {
          const sections = readField('examSections') || { items: [] };
          const totalSections = sections?.items.length;
          return totalSections;
        }
      },
      currentExamQuestion: {
        read(_, { readField }) {
          const currentSection = readField('currentExamSection');
          const currentQuestion = currentSection?.questions?.[
            examQuestionNumberVar()
          ] || {
            command: currentSection.command,
            examSectionId: currentSection.id,
            statement: '',
            image: null,
            audio: '',
            needsRecording: false,
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            correctOptions: []
          };
          return currentQuestion;
        }
      },
      currentExamQuestionRelativeNumber: {
        read(_, { readField }) {
          const currentExamQuestion = readField('currentExamQuestion');
          const allQuestions = getAllQuestions(readField);
          const questionIndex = allQuestions.findIndex(
            question => question.id === currentExamQuestion.id
          );
          return questionIndex;
        }
      },
      totalQuestionsInCurrentSection: {
        read(_, { readField }) {
          const currentSection = readField('currentExamSection');
          const totalQuestions = currentSection?.questions.length;
          return totalQuestions;
        }
      },
      totalQuestions: {
        read(_, { readField }) {
          const allQuestions = getAllQuestions(readField);
          return allQuestions.length;
        }
      }
    }
  }
};

function getAllQuestions(readField) {
  const sections = readField('examSections') ?? { items: [] };
  const allQuestions = sections.items
    .map(sectionRef => readField('questions', sectionRef)?.items ?? [])
    .flat()
    .map(questionRef => readQuestion(questionRef, readField));
  return allQuestions;
}

function readQuestion(questionRef, readField) {
  return {
    id: readField('id', questionRef),
    statement: readField('statement', questionRef) || '',
    image: readField('image', questionRef),
    audio: readField('audio', questionRef),
    needsRecording: readField('needsRecording', questionRef),
    optionA: readField('optionA', questionRef) || '',
    optionB: readField('optionB', questionRef) || '',
    optionC: readField('optionC', questionRef) || '',
    optionD: readField('optionD', questionRef) || '',
    correctOptions: readField('correctOptions', questionRef) || []
  };
}
