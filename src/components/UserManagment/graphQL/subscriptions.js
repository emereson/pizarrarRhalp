import { gql } from '@apollo/client';

export const ON_USER_UPDATED = gql`
  subscription OnUserUpdated($id: ID!) {
    onUserUpdated(id: $id) {
      id
      name
      email
      profilePicture
    }
  }
`;

export const ON_UPDATE_STUDENT = gql`
  subscription OnStudentUpdated($id: ID!) {
    onStudentUpdated(id: $id) {
      id
      classRoomId
    }
  }
`;

export const ON_UPDATE_TEACHER = gql`
  subscription onTeacherUpdated($id: ID!) {
    onTeacherUpdated(id: $id) {
      id
      classRoomId
    }
  }
`;
