import { gql } from '@apollo/client';

export const QUESTION_FRAGMENT = gql`
  fragment questionData on ExamQuestion {
    id
    examSectionId
    statement
    image
    audio
    needsRecording
    optionA
    optionB
    optionC
    optionD
    correctOptions
  }
`;
