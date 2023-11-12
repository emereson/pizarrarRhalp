import { gql } from '@apollo/client';
import { CLASSROOM_DATA_FRAGMENT } from '../../Whiteboard/graphQL/mutations';

export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      profilePicture
    }
  }
`;

export const GET_CLASSROOM = gql`
  ${CLASSROOM_DATA_FRAGMENT}
  query GetClassRoom($id: ID!) {
    getClassRoom(id: $id) {
      ...classRoomData
    }
  }
`;

export const GET_STUDENT = gql`
  query getStudent($id: ID!) {
    getStudent(id: $id) {
      id
      classRoom {
        id
      }
    }
  }
`;

export const GET_TEACHER = gql`
  query getTeacher($id: ID!) {
    getTeacher(id: $id) {
      id
      classRoom {
        id
      }
    }
  }
`;

export const EVALUATIONS_BY_STUDENTS = gql`
  query EvaluationsByStudents($studentId: ID!) {
    evaluationsByStudents(studentId: $studentId, sortDirection: DESC) {
      items {
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
      }
    }
  }
`;

// background
export const GET_GLOBALS = gql`
  query getGlobalBackground {
    getGlobal(id: "1") {
      imageUrl
      homeImageUrl
      id
    }
  }
`;
