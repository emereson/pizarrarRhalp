import { gql } from '@apollo/client';

export const LIST_CLASSROOMS = gql`
  query listClassRooms {
    listClassRooms {
      items {
        id
        name
        page
        isDisabled
        teachers {
          items {
            user {
              id
              name
            }
          }
        }
        students {
          items {
            user {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export const LIST_STUDENTS = gql`
  query listStudents {
    listStudents {
      items {
        id
        callingBlock
        callingState
        callingInit
        classRoomId
        callingOneBlock
        classRoom {
          id
          name
        }
        user {
          id
          email
          name
        }
      }
    }
  }
`;

export const LIST_TEACHERS = gql`
  query listTeachers {
    listTeachers {
      items {
        id
        callingBlock
        callingState
        callingInit
        callingOneBlock
        user {
          id
          email
          name
        }
        classRoomId
        classRoom {
          id
          name
        }
      }
    }
  }
`;
