import { gql } from '@apollo/client';

export const ASSIGN_STUDENT_TO_CLASSROOM = gql`
  mutation assignStudentToClassRoom($classRoomId: ID!, $studentId: ID!) {
    updateStudent(input: { id: $studentId, classRoomId: $classRoomId }) {
      id
      classRoomId
      classRoom {
        name
      }
    }
  }
`;

export const ASSIGN_TEACHER_TO_CLASSROOM = gql`
  mutation assignTeacherToClassRoom($teacherId: ID!, $classRoomId: ID!) {
    updateTeacher(input: { id: $teacherId, classRoomId: $classRoomId }) {
      id
      classRoomId
      classRoom {
        name
      }
    }
  }
`;

export const BLOCK_CALLING_TEACHER = gql`
  mutation updateTeacher($id: ID!, $callingBlock: String) {
    updateTeacher(input: { id: $id, callingBlock: $callingBlock }) {
      id
      callingBlock
    }
  }
`;

export const ONE_BLOCK_CALLING_TEACHER = gql`
  mutation updateTeacher($id: ID!, $callingOneBlock: String) {
    updateTeacher(input: { id: $id, callingOneBlock: $callingOneBlock }) {
      id
      callingOneBlock
    }
  }
`;

export const BLOCK_CALLING_STUDENT = gql`
  mutation updateStudent($id: ID!, $callingBlock: String) {
    updateStudent(input: { id: $id, callingBlock: $callingBlock }) {
      id
      callingBlock
    }
  }
`;

export const ONE_BLOCK_CALLING_STUDENT = gql`
  mutation updateStudent($id: ID!, $callingOneBlock: String) {
    updateStudent(input: { id: $id, callingOneBlock: $callingOneBlock }) {
      id
      callingOneBlock
    }
  }
`;

export const INIT_CALLING_TEACHER = gql`
  mutation updateTeacher($id: ID!, $callingInit: String) {
    updateTeacher(input: { id: $id, callingInit: $callingInit }) {
      id
      callingInit
    }
  }
`;

export const INIT_CALLING_STUDENT = gql`
  mutation updateStudent($id: ID!, $callingInit: String) {
    updateStudent(input: { id: $id, callingInit: $callingInit }) {
      id
      callingInit
    }
  }
`;

export const UPDATE_CALLING_TEACHER = gql`
  mutation updateTeacher($id: ID!, $callingState: String) {
    updateTeacher(input: { id: $id, callingState: $callingState }) {
      id
      callingState
    }
  }
`;

export const UPDATE_CALLING_STUDENT = gql`
  mutation updateStudent($id: ID!, $callingState: String) {
    updateStudent(input: { id: $id, callingState: $callingState }) {
      id
      callingState
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(input: { id: $userId }) {
      id
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation deleteStudent($studentId: ID!) {
    deleteStudent(input: { id: $studentId }) {
      id
    }
  }
`;

export const DELETE_TEACHER = gql`
  mutation deleteTeacher($teacherId: ID!) {
    deleteTeacher(input: { id: $teacherId }) {
      id
    }
  }
`;

export const REMOVE_TEACHER_FROM_CLASSROOM = gql`
  mutation removeTeacherFromClassRoom($teacherId: ID!, $classRoomId: ID!) {
    updateTeacher(input: { id: $teacherId, classRoomId: $classRoomId }) {
      id
      classRoomId
      classRoom {
        id
        name
      }
    }
  }
`;

export const REMOVE_STUDENT_FROM_CLASSROOM = gql`
  mutation removeStudentFromClassRoom($studentId: ID!, $classRoomId: ID!) {
    updateStudent(input: { id: $studentId, classRoomId: $classRoomId }) {
      id
      classRoomId
      classRoom {
        id
        name
      }
    }
  }
`;
