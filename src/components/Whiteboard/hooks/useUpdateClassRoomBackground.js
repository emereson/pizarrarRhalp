import { useEffect } from 'react';
import { UPDATE_CLASSROOM_BACKGROUND } from '../graphQL/mutations';
import { useMutation } from '@apollo/client';
import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';
import { useQueryAllClassRooms } from 'components/AdminDashboard/hooks/useQueryAllClassRooms';

export const useUpdateClassRoomBackground = () => {
  const { assignedClassRoom } = useUserClassRoom();
  const [updateBackgroundMutation, { loading, error }] = useMutation(
    UPDATE_CLASSROOM_BACKGROUND
  );
  const { classRoomsIds } = useQueryAllClassRooms();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  function setClassRoomBackground(backgroundImageUrl, defaultClassRoomId) {
    const classNameRoomId = defaultClassRoomId ?? assignedClassRoom.classRoomId;
    return updateBackgroundMutation({
      variables: { classRoomId: classNameRoomId, backgroundImageUrl }
    });
  }

  const applyToAllChangeBackground = async backgroundImageUrl => {
    for await (const id of classRoomsIds) {
      await setClassRoomBackground(backgroundImageUrl, id);
    }
  };

  return { setClassRoomBackground, applyToAllChangeBackground, loading, error };
};
