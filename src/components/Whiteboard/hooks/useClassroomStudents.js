import { useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { CLASSROOM_STUDENTS } from '../graphQL/queries';
import { GET_CLASSROOM } from 'components/UserManagment/graphQL/queries';
import { useUserClassRoom } from 'components/UserManagment/hooks/useUserClassRoom';

export const useClassRoomsStudents = () => {
  const { assignedClassRoom } = useUserClassRoom();
  const [getStudents, { loading: queryLoading, error, data }] = useLazyQuery(
    CLASSROOM_STUDENTS,
    {
      variables: { id: assignedClassRoom.classRoomId },
      fetchPolicy: 'network-only'
    }
  );

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return { getStudents, queryLoading, error, data };
};
