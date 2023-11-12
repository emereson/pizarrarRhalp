import { gql } from '@apollo/client';
import { QUESTION_FRAGMENT } from './fragments';

/** EXAM */

export const CREATE_EXAM = gql`
  mutation createExam($id: ID!) {
    createExam(input: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_EXAM = gql`
  mutation updateExam(
    $id: ID!
    $minScore: Int
    $maxSCore: Int
    $scoreFeedback: String
    $correctAnswers: String
    $correctAnswersFeedback: String
    $inCorrectAnswers: String
    $inCorrectAnswersFeedback: String
    $ranks: AWSJSON
    $selectedEvaluations: [String]
    $examColorScheme: String
  ) {
    updateExam(
      input: {
        id: $id
        minScore: $minScore
        maxSCore: $maxSCore
        scoreFeedback: $scoreFeedback
        correctAnswers: $correctAnswers
        correctAnswersFeedback: $correctAnswersFeedback
        inCorrectAnswers: $inCorrectAnswers
        inCorrectAnswersFeedback: $inCorrectAnswersFeedback
        ranks: $ranks
        selectedEvaluations: $selectedEvaluations
        examColorScheme: $examColorScheme
      }
    ) {
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
      examColorScheme
    }
  }
`;

/** EXAM Section  */

export const CREATE_EXAM_SECTION = gql`
  mutation createExamSection($id: ID!, $examId: ID!) {
    createExamSection(input: { id: $id, examId: $examId }) {
      id
    }
  }
`;

export const DELETE_EXAM_SECTION = gql`
  mutation deleteExamSection($id: ID!) {
    deleteExamSection(input: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_EXAM_SECTION = gql`
  mutation updateExamSection($id: ID!, $command: String!) {
    updateExamSection(input: { id: $id, command: $command }) {
      id
      command
    }
  }
`;

/** EXAM Question */

export const CREATE_EXAM_QUESTION = gql`
  mutation createExamQuestion(
    $id: ID!
    $examSectionId: ID!
    $statement: String
    $optionA: String
    $optionB: String
    $optionC: String
    $optionD: String
    $correctOptions: [String!]
    $image: String
    $audio: String
    $needsRecording: Boolean
  ) {
    createExamQuestion(
      input: {
        id: $id
        examSectionId: $examSectionId
        statement: $statement
        optionA: $optionA
        optionB: $optionB
        optionC: $optionC
        optionD: $optionD
        correctOptions: $correctOptions
        image: $image
        audio: $audio
        needsRecording: $needsRecording
      }
    ) {
      id
    }
  }
`;

export const DELETE_EXAM_QUESTION = gql`
  mutation deleteExamQuestion($id: ID!) {
    deleteExamQuestion(input: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_EXAM_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  mutation updateExamQuestion(
    $id: ID!
    $examSectionId: ID!
    $statement: String
    $optionA: String
    $optionB: String
    $optionC: String
    $optionD: String
    $correctOptions: [String!]
    $image: String
    $audio: String
    $needsRecording: Boolean
  ) {
    updateExamQuestion(
      input: {
        id: $id
        examSectionId: $examSectionId
        statement: $statement
        optionA: $optionA
        optionB: $optionB
        optionC: $optionC
        optionD: $optionD
        correctOptions: $correctOptions
        image: $image
        audio: $audio
        needsRecording: $needsRecording
      }
    ) {
      ...questionData
    }
  }
`;

export const UPDATE_EXAM_QUESTION_IMAGE = gql`
  ${QUESTION_FRAGMENT}
  mutation updateExamQuestion($id: ID!, $image: String!) {
    updateExamQuestion(input: { id: $id, image: $image }) {
      ...questionData
    }
  }
`;

export const UPDATE_EXAM_QUESTION_AUDIO = gql`
  ${QUESTION_FRAGMENT}
  mutation updateExamQuestion($id: ID!, $audio: String!) {
    updateExamQuestion(input: { id: $id, audio: $audio }) {
      ...questionData
    }
  }
`;
