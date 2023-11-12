import { gql } from '@apollo/client';

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

// nota de texto
export const GET_NOTES = gql`
  query MyQuery($id: ID!) {
    getTextNote(id: $id) {
      id
      message
      type
      for
      fontSize
      fontFamily
      fontColor
      typing
      deadline
    }
  }
`;

export const LIST_NOTES = gql`
  query MyQuery {
    listTextNotes {
      items {
        date
        for
        from
        id
        message
        role
        typing
        createBy
        deadline
        fontColor
        fontFamily
        fontSize
        type
      }
    }
  }
`;

export const CLASS_ROOMS_LIST = gql`
  query classRoomsList {
    listClassRooms {
      items {
        id
        name
        students {
          items {
            user {
              name
              id
            }
          }
        }
        teachers {
          items {
            user {
              name
              id
            }
          }
        }
      }
    }
  }
`;

export const STUDENT_TEACHER = gql`
  query studentTeacher($id: ID!) {
    getStudent(id: $id) {
      classRoom {
        teachers {
          items {
            classRoom {
              teachers {
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
      }
    }
  }
`;

export const TEACHER_STUDENT = gql`
  query teacherStudent($id: ID!) {
    getTeacher(id: $id) {
      students {
        items {
          user {
            name
            id
          }
        }
      }
    }
  }
`;

export const GET_BACKGROUND_NOTE = gql`
  query getBackgroundNote($id: ID!) {
    getBackgroundNote(id: $id) {
      BackgroundColor
      id
    }
  }
`;
