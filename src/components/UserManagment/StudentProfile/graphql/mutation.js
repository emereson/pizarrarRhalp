import { gql } from '@apollo/client';

// background
export const UPDATE_GLOBAL = gql`
  mutation changeBackground($imageUrl: String, $homeImageUrl: String) {
    updateGlobal(input: { id: "1", imageUrl: $imageUrl, homeImageUrl: $homeImageUrl }) {
      id
      imageUrl
      homeImageUrl
    }
  }
`;

// Nota de texto

export const DELETE_TEXT_NOTE = gql`
  mutation deleteTextNote($noteID: ID!) {
    deleteTextNote(input: { id: $noteID }) {
      id
    }
  }
`;

export const CREATE_TEXT_NOTE = gql`
  mutation createTextNote(
    $id: ID!
    $message: String
    $from: String
    $for: String
    $date: String
    $role: String
    $type: String
    $createBy: String
    $fontSize: Int
    $fontFamily: String
    $fontColor: String
    $deadline: String
    $typing: Boolean
  ) {
    createTextNote(
      input: {
        id: $id
        message: $message
        from: $from
        for: $for
        date: $date
        role: $role
        type: $type
        createBy: $createBy
        fontSize: $fontSize
        fontFamily: $fontFamily
        fontColor: $fontColor
        deadline: $deadline
        typing: $typing
      }
    ) {
      id
    }
  }
`;

export const UPDATE_TEXT_NOTE = gql`
  mutation updateTextNote(
    $id: ID!
    $message: String
    $type: String
    $fontSize: Int
    $fontFamily: String
    $fontColor: String
    $deadline: String
    $typing: Boolean
  ) {
    updateTextNote(
      input: {
        id: $id
        message: $message
        type: $type
        fontSize: $fontSize
        fontFamily: $fontFamily
        fontColor: $fontColor
        deadline: $deadline
        typing: $typing
      }
    ) {
      id
    }
  }
`;

export const UPDATE_BACKGROUND_NOTE = gql`
  mutation updateBackgroundNote($id: ID!, $BackgroundColor: String) {
    updateBackgroundNote(input: { id: $id, BackgroundColor: $BackgroundColor }) {
      BackgroundColor
      id
    }
  }
`;

export const CREATE_BACKGROUND_NOTE = gql`
  mutation createBackgroundNote($id: ID!, $BackgroundColor: String) {
    createBackgroundNote(input: { id: $id, BackgroundColor: $BackgroundColor }) {
      BackgroundColor
      id
    }
  }
`;
