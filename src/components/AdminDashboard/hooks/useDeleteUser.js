import { useMutation } from '@apollo/client';
import { DELETE_USER, DELETE_STUDENT, DELETE_TEACHER } from '../graphql/mutations';
import * as CognitoService from '../../../services/cognito.service';
import { useState } from 'react';
import { USER_ROLES } from '../../../enums/constants.enum';

export const useDeleteUser = () => {
  const [status, setStatus] = useState({
    deletingUser: false,
    userDeleted: false,
    error: false
  });
  const [deleteUserMutation, { loading: userLoading, error: userError }] =
    useMutation(DELETE_USER);
  const [deleteStudentMutation, { loading: studentLoading, error: studentError }] =
    useMutation(DELETE_STUDENT, {
      refetchQueries: ['listStudents', 'listClassRooms']
    });
  const [deleteTeacherMutation, { loading: teacherLoading, error: teacherError }] =
    useMutation(DELETE_TEACHER, {
      refetchQueries: ['listTeachers', 'listClassRooms']
    });

  function isLoading() {
    return status.deletingUser || userLoading || studentLoading || teacherLoading;
  }

  function hasError() {
    return status.error || userError || studentError || teacherError;
  }

  async function deleteUserFromCognito(email) {
    try {
      setStatus({ userDeleted: false, deletingUser: true, error: false });
      const result = await CognitoService.deleteUser(email);
      console.log(result);
      setStatus({ userDeleted: true, deletingUser: false, error: false });
    } catch (e) {
      console.log(e);
      setStatus({ userDeleted: false, deletingUser: false, error: true });
    }
  }

  async function deleteUser({ id, email, type }) {
    try {
      Promise.all([
        deleteUserFromCognito(email),
        deleteUserMutation({ variables: { userId: id } }),
        type == USER_ROLES.TEACHERS
          ? deleteTeacherMutation({ variables: { teacherId: id } })
          : deleteStudentMutation({ variables: { studentId: id } })
      ]);
      return `${email} deleted`;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  return { deleteUser, isLoading, hasError };
};
