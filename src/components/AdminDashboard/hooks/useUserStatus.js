import { USER_STATUS } from '../../../enums/constants.enum';
import { useApolloClient } from '@apollo/client';
import { LIST_TEACHERS, LIST_STUDENTS } from '../graphql/queries';
import constants from '../../../enums/constants.enum';

export const useUserStatus = () => {
  const client = useApolloClient();
  let listTeachersData, listStudentsData;

  try {
    listTeachersData = client.readQuery({ query: LIST_TEACHERS });
  } catch (error) {}

  try {
    listStudentsData = client.readQuery({ query: LIST_STUDENTS });
  } catch (error) {}

  function getTeacherStatus(teacherId) {
    if (listTeachersData) {
      const teacher = listTeachersData.listTeachers.items.find(
        teacher => teacher.id === teacherId
      );
      if (teacher) {
        if (
          !teacher.classRoomId ||
          teacher.classRoomId === constants.CLASSROOM_NOT_ASSIGNED
        ) {
          return USER_STATUS.NOT_ASSIGNED;
        }
        if (teacher.classRoomId) {
          return USER_STATUS.ASSIGNED;
        }
      }
    }
  }

  function getStudentStatus(studentId) {
    if (listStudentsData) {
      const student = listStudentsData.listStudents.items.find(
        student => student.id === studentId
      );
      if (student) {
        if (
          !student.classRoomId ||
          student.classRoomId === constants.CLASSROOM_NOT_ASSIGNED
        ) {
          return USER_STATUS.NOT_ASSIGNED;
        }
        if (student.classRoomId) {
          return USER_STATUS.ASSIGNED;
        }
      }
    }
  }

  return { getTeacherStatus, getStudentStatus };
};
