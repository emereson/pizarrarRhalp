import { gql } from '@apollo/client';

export const EVALUATIONS_BY_STUDENTS = gql`
  query EvaluationsByStudents($studentId: ID!) {
    evaluationsByStudents(studentId: $studentId) {
      items {
        id
        no
        name
        process
        score
        skills {
          listenning
          speaking
          writting
          reading
        }
        date
        file {
          id
        }
      }
    }
  }
`;

export const FILES_BY_USERS = gql`
  query FilesByUsers($userId: ID!, $sort: ModelSortDirection = ASC) {
    filesByUsers(userId: $userId, sortDirection: $sort) {
      items {
        id
        userId
        name
        url
        mode
        currentFolder
      }
    }
  }
`;

export const FILES_IDS = gql`
  query FilesIds($userId: ID!) {
    filesByUsers(userId: $userId) {
      items {
        id
      }
    }
  }
`;

export const CLASSROOM_STUDENTS = gql`
  query getClassRoomStudents($id: ID!) {
    getClassRoom(id: $id) {
      students {
        items {
          user {
            id
            name
            email
          }
        }
      }
    }
  }
`;
