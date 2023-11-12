import { gql } from '@apollo/client';

export const LEVEL_LISTS = gql`
  query ListLevels {
    listLevels {
      items {
        id
      }
    }
  }
`;

export const SLIDES_LIST_BY_LEVELS = gql`
  query GetLevel($id: ID!) {
    getLevel(id: $id) {
      id
      orderArray
      studyDocumentSlides {
        items {
          id
          levelId
          studyDocumentElements {
            items {
              id
              pageId
              type
              value
            }
          }
        }
      }
    }
  }
`;

export const GET_SLIDE_ELEMENTS = gql`
  query GetSlideElements($id: ID!) {
    getStudyDocumentSlide(id: $id) {
      id
      levelId
      studyDocumentElements {
        items {
          id
          pageId
          type
          value
        }
      }
    }
  }
`;

export const GET_LEVEL = gql`
  query GetLevel($id: ID!) {
    getLevel(id: $id) {
      studyDocumentSlides(sortDirection: ASC) {
        items {
          id
          studyDocumentElements {
            items {
              value
              type
              pageId
              id
            }
          }
        }
      }
    }
  }
`;
