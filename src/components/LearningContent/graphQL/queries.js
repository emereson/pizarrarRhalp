import { gql } from '@apollo/client';

export const GET_ENGLISH_LEVELS = gql`
  query gettingLevels {
    listStudentsLevels {
      items {
        content
        id
      }
    }
  }
`;

export const GET_USER_STUDY_PROGRESS = gql`
  query gettingLevels($email: String!) {
    listUserStudyProgresses(filter: { owner: { eq: $email } }) {
      items {
        id
        lastSlideID
        level
        name
        owner
        progress
      }
    }
  }
`;

// slides functionality

export const GET_SLIDES_BY_LEVEL = gql`
  query gettingSlideByLevel($id: ID!) {
    listStudentsLevels(id: $id) {
      items {
        id
        slides {
          items {
            id
            exportedImage
            minCalification
            realCalification
            studentsLevelsSlidesId
            numberToSort
            createdAt
            updatedAt
            texts {
              items {
                text
                y
                x
                width
                updatedAt
                learningContentSlideTextsId
                id
                height
                createdAt
                styles
              }
            }
            images {
              items {
                imageUrl
                y
                x
                width
                learningContentSlideImagesId
                id
                height
                updatedAt
                createdAt
                styles
              }
            }
          }
        }
      }
    }
  }
`;
