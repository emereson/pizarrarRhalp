import { gql } from '@apollo/client';

export const CREATE_LEVEL = gql`
  mutation createALevel($levelID: ID!) {
    createNewLevel(input: { levelId: $levelID }) {
      id
      levelId
    }
  }
`;

export const CREATE_USER_PROGRESS = gql`
  mutation createUserProgress(
    $lastSlideID: String
    $level: String
    $name: String!
    $owner: String!
  ) {
    createUserStudyProgress(
      input: {
        lastSlideID: $lastSlideID
        level: $level
        name: $name
        owner: $owner
        progress: 0
      }
    ) {
      id
    }
  }
`;

export const UPDATE_USER_LEVEL_PROGRESS = gql`
  mutation updateUserLevel($id: ID!, $level: String!, $owner: String!) {
    updateUserStudyProgress(
      input: { level: $level, id: $id }
      condition: { owner: { eq: $owner } }
    ) {
      id
    }
  }
`;

// slides functionality

// create
export const CREATE_SLIDE_IMAGE = gql`
  mutation creatingAnImageForSlide(
    $slideId: ID!
    $height: String
    $width: String
    $x: String
    $y: String
    $imageUrl: String
    $styles: String
  ) {
    createSlideImage(
      input: {
        height: $height
        imageUrl: $imageUrl
        learningContentSlideImagesId: $slideId
        width: $width
        x: $x
        y: $y
        styles: $styles
      }
    ) {
      id
      imageUrl
    }
  }
`;

export const CREATE_SLIDE_TEXT = gql`
  mutation creatingATextForSlide(
    $slideId: ID!
    $height: String
    $width: String
    $x: String
    $y: String
    $text: String
    $styles: String
  ) {
    createSlideText(
      input: {
        learningContentSlideTextsId: $slideId
        height: $height
        text: $text
        width: $width
        x: $x
        y: $y
        styles: $styles
      }
    ) {
      id
    }
  }
`;

export const CREATE_SLIDE = gql`
  mutation creatingSlideForLevel(
    $id: ID
    $minCalif: Int
    $realCalif: Int
    $numberToSort: Int
    $studentLevelReffered: ID!
    $exportedImage: String
  ) {
    createLearningContentSlide(
      input: {
        id: $id
        exportedImage: $exportedImage
        minCalification: $minCalif
        realCalification: $realCalif
        numberToSort: $numberToSort
        studentsLevelsSlidesId: $studentLevelReffered
      }
    ) {
      id
      createdAt
    }
  }
`;

// update
export const UPDATE_SLIDE_IMAGE = gql`
  mutation updatingSlideImage(
    $slideImageId: ID!
    $slideId: ID!
    $height: String
    $width: String
    $x: String
    $y: String
    $imageUrl: String
    $styles: String
  ) {
    updateSlideImage(
      input: {
        id: $slideImageId
        imageUrl: $imageUrl
        learningContentSlideImagesId: $slideId
        width: $width
        x: $x
        y: $y
        height: $height
        styles: $styles
      }
    ) {
      id
    }
  }
`;

export const UPDATE_SLIDE_TEXT = gql`
  mutation updatingSlideText(
    $slideTextId: ID!
    $slideId: ID!
    $height: String
    $width: String
    $x: String
    $y: String
    $text: String
    $styles: String
  ) {
    updateSlideText(
      input: {
        id: $slideTextId
        height: $height
        learningContentSlideTextsId: $slideId
        text: $text
        width: $width
        x: $x
        y: $y
        styles: $styles
      }
    ) {
      id
    }
  }
`;

export const UPDATE_SLIDE_POSITION = gql`
  mutation updatingSlidePosition($slideId: ID!, $newPosition: Int) {
    updateLearningContentSlide(input: { id: $slideId, numberToSort: $newPosition }) {
      id
    }
  }
`;

export const UPDATE_SLIDE = gql`
  mutation updatingSlide(
    $id: ID!
    $exportedImage: String
    $minCalif: Int
    $numberToSort: Int
    $realCalif: Int
    $studentLevelReffered: ID!
  ) {
    updateLearningContentSlide(
      input: {
        id: $id
        exportedImage: $exportedImage
        minCalification: $minCalif
        numberToSort: $numberToSort
        realCalification: $realCalif
        studentsLevelsSlidesId: $studentLevelReffered
      }
    ) {
      id
    }
  }
`;

// deleting components and slides
export const DELETE_SLIDE_IMAGE = gql`
  mutation deletingSlideImage($id: ID!) {
    deleteSlideImage(input: { id: $id }) {
      id
    }
  }
`;

export const DELETE_SLIDE_TEXT = gql`
  mutation deletingSlideText($id: ID!) {
    deleteSlideText(input: { id: $id }) {
      id
    }
  }
`;

export const DELETE_SLIDE = gql`
  mutation deletingSlide($id: ID!) {
    deleteLearningContentSlide(input: { id: $id }) {
      id
    }
  }
`;
