import { gql } from '@apollo/client';

export const CLASSROOM_DATA_FRAGMENT = gql`
  fragment classRoomData on ClassRoom {
    id
    iconsColor
    blur
    isDisabled
    backgroundImageUrl
    page
    name
    isCrystalTheme
  }
`;

export const UPDATE_CLASSROOM_ICONS_COLOR = gql`
  ${CLASSROOM_DATA_FRAGMENT}
  mutation updateClassRoomIconsColor($classRoomId: ID!, $iconsColor: String) {
    updateClassRoom(input: { id: $classRoomId, iconsColor: $iconsColor }) {
      ...classRoomData
    }
  }
`;
export const UPDATE_CLASSROOM_BLUR = gql`
  ${CLASSROOM_DATA_FRAGMENT}
  mutation updateClassRoomBlur($classRoomId: ID!, $blur: Int) {
    updateClassRoom(input: { id: $classRoomId, blur: $blur }) {
      ...classRoomData
    }
  }
`;

export const UPDATE_WHITEBOARD_THEME = gql`
  ${CLASSROOM_DATA_FRAGMENT}
  mutation updateClassRoomIconsColor($classRoomId: ID!, $isCrystalTheme: Boolean) {
    updateClassRoom(input: { id: $classRoomId, isCrystalTheme: $isCrystalTheme }) {
      ...classRoomData
    }
  }
`;

export const UPDATE_CLASSROOM_BACKGROUND = gql`
  ${CLASSROOM_DATA_FRAGMENT}
  mutation updateClassRoomBackground($classRoomId: ID!, $backgroundImageUrl: String) {
    updateClassRoom(
      input: { id: $classRoomId, backgroundImageUrl: $backgroundImageUrl }
    ) {
      ...classRoomData
    }
  }
`;

export const TOGGLE_CLASSROOM_STATE = gql`
  ${CLASSROOM_DATA_FRAGMENT}
  mutation toggleClassRoomState($classRoomId: ID!, $isDisabled: Boolean!) {
    updateClassRoom(input: { id: $classRoomId, isDisabled: $isDisabled }) {
      ...classRoomData
    }
  }
`;

export const CREATE_FILE = gql`
  mutation CreateFile(
    $userId: ID!
    $name: String!
    $url: String!
    $mode: String!
    $currentFolder: String!
  ) {
    createFile(
      input: {
        userId: $userId
        name: $name
        url: $url
        mode: $mode
        currentFolder: $currentFolder
      }
    ) {
      id
      userId
      name
      url
      mode
      currentFolder
    }
  }
`;

export const UPDATE_FILE = gql`
  mutation UpdateFile(
    $id: ID!
    $name: String!
    $url: String!
    $mode: String!
    $currentFolder: String!
  ) {
    updateFile(
      input: {
        id: $id
        name: $name
        url: $url
        mode: $mode
        currentFolder: $currentFolder
      }
    ) {
      id
    }
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile($id: ID!) {
    deleteFile(input: { id: $id }) {
      id
    }
  }
`;

export const CREATE_EVALUATION = gql`
  mutation CreateEvaluation(
    $fileId: ID!
    $studentId: ID!
    $no: String!
    $name: String
    $process: String
    $score: Int
    $skills: SkillsInput
    $date: String!
  ) {
    createEvaluation(
      input: {
        fileId: $fileId
        studentId: $studentId
        no: $no
        name: $name
        process: $process
        score: $score
        skills: $skills
        date: $date
      }
    ) {
      id
    }
  }
`;

export const UPDATE_EVALUATION = gql`
  mutation UpdateEvaluation(
    $id: ID!
    $fileId: ID
    $studentId: ID
    $no: String!
    $name: String
    $process: String
    $score: Int
    $skills: SkillsInput
    $date: String!
  ) {
    updateEvaluation(
      input: {
        id: $id
        fileId: $fileId
        studentId: $studentId
        no: $no
        name: $name
        process: $process
        score: $score
        skills: $skills
        date: $date
      }
    ) {
      id
    }
  }
`;
