import { useEffect } from 'react';
import { UPDATE_CLASSROOM_ICONS_COLOR } from '../graphQL/mutations';
import { useMutation } from '@apollo/client';
import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';
import { useQueryAllClassRooms } from 'components/AdminDashboard/hooks/useQueryAllClassRooms';

export const useUpdateClassRoomIconsColor = () => {
  const { assignedClassRoom } = useUserClassRoom();
  const [updateIconsColorMutation, { loading, error }] = useMutation(
    UPDATE_CLASSROOM_ICONS_COLOR
  );
  const { classRoomsIds } = useQueryAllClassRooms();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  function setClassRoomIconsColor(iconsColor, defaultClassRoomId) {
    const classNameRoomId = defaultClassRoomId ?? assignedClassRoom.classRoomId;
    return updateIconsColorMutation({
      variables: { classRoomId: classNameRoomId, iconsColor }
    });
  }

  const applyToAllChangeIconsColors = async iconsColor => {
    for await (const id of classRoomsIds) {
      await setClassRoomIconsColor(iconsColor, id);
    }
  };

  return { setClassRoomIconsColor, applyToAllChangeIconsColors, loading, error };
};
