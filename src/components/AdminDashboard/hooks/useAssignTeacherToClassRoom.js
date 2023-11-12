import { useEffect, useState } from 'react';
import { ASSIGN_TEACHER_TO_CLASSROOM } from '../graphql/mutations';
import { useApolloClient, useMutation } from '@apollo/client';
import { LIST_CLASSROOMS } from '../graphql/queries';

export const useAssignTeacherToClassRoom = () => {
  const [
    assignTeacherToClassRoomMutation,
    { loading: assignTeacherLoading, error: assignTeacherMutationError }
  ] = useMutation(ASSIGN_TEACHER_TO_CLASSROOM, {
    refetchQueries: ['listClassRooms']
  });
  const [teacherAssignedError, setTeacherAssignedError] = useState(null);

  useEffect(() => {
    setTeacherAssignedError(assignTeacherMutationError);
  }, [assignTeacherMutationError]);

  const client = useApolloClient();
  let classRoomsData;

  try {
    classRoomsData = client.readQuery({ query: LIST_CLASSROOMS });
  } catch (error) {}

  function isTeacherAssignedToClassRoom(classRoomId) {
    if (classRoomsData) {
      const classRoom = classRoomsData.listClassRooms.items.find(
        classRoom => classRoom.id === classRoomId
      ) || { teachers: { items: [] } };
      return classRoom.teachers.items[0];
    }
    return false;
  }

  function assignTeacherToClassRoom(mutationOptions) {
    setTeacherAssignedError(null);
    if (isTeacherAssignedToClassRoom(mutationOptions.variables.classRoomId)) {
      return setTeacherAssignedError(
        new Error('There is a teacher assigned to this classRoom')
      );
    }
    return assignTeacherToClassRoomMutation(mutationOptions);
  }

  return {
    assignTeacherToClassRoom,
    isTeacherAssignedToClassRoom,
    assignTeacherLoading,
    teacherAssignedError,
    setTeacherAssignedError
  };
};
