import { gql } from '@apollo/client';
import { QUESTION_FRAGMENT } from './fragments';

export const GET_EXAM = gql`
  ${QUESTION_FRAGMENT}
  query getExam($id: ID!) {
    getExam(id: $id) {
      id
      minScore
      maxSCore
      scoreFeedback
      correctAnswers
      correctAnswersFeedback
      inCorrectAnswers
      inCorrectAnswersFeedback
      ranks
      selectedEvaluations
      currentExamSection @client
      currentExamQuestion @client
      results @client
      currentExamQuestionRelativeNumber @client
      totalSections @client
      totalQuestionsInCurrentSection @client
      totalQuestions @client
      examSections {
        items {
          id
          command
          questions {
            items {
              ...questionData
            }
          }
        }
      }
      examColorScheme
    }
  }
`;
