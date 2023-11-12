import { gql } from '@apollo/client';

export const CREATE_SLIDE = gql`
  mutation CreateSlide($levelId: ID!) {
    createStudyDocumentSlide(input: { levelId: $levelId }) {
      id
      levelId
    }
  }
`;

export const UPDATE_ORDER_SLIDE = gql`
  mutation updateLevel($id: ID!, $orderArray: AWSJSON!) {
    updateLevel(input: { id: $id, orderArray: $orderArray }) {
      orderArray
      id
    }
  }
`;

export const CREATE_STUDY_DOCUMENT_ELEMENT = gql`
  mutation createStudyDocumentElement(
    $type: ElementType!
    $pageId: ID!
    $value: AWSJSON!
  ) {
    createStudyDocumentElement(input: { type: $type, pageId: $pageId, value: $value }) {
      type
      value
      pageId
    }
  }
`;

export const UPDATE_STUDY_DOCUMENT_ELEMENT = gql`
  mutation updateStudyDocumentElement($id: ID!, $type: ElementType!, $value: AWSJSON!) {
    updateStudyDocumentElement(input: { id: $id, type: $type, value: $value }) {
      type
      value
      id
    }
  }
`;

export const DELETE_SLIDE = gql`
  mutation DeleteStudyDocumentSlide($id: ID!) {
    deleteStudyDocumentSlide(input: { id: $id }) {
      id
    }
  }
`;

export const DELETE_STUDY_DOCUMENT_ELEMENT = gql`
  mutation DeleteStudyDocumentElement($id: ID!) {
    deleteStudyDocumentElement(input: { id: $id }) {
      id
    }
  }
`;
