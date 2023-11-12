import { useEffect } from 'react';
import { UPDATE_WHITEBOARD_THEME } from '../graphQL/mutations';
import { useMutation } from '@apollo/client';
import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';

export const useUpdateWhiteBoardTheme = () => {
  const { assignedClassRoom } = useUserClassRoom();
  const [updateThemeMutation, { loading, error }] = useMutation(UPDATE_WHITEBOARD_THEME);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  function setWhiteBoardTheme(isCrystalTheme) {
    return updateThemeMutation({
      variables: { classRoomId: assignedClassRoom.classRoomId, isCrystalTheme }
    });
  }

  return { setWhiteBoardTheme, loading, error };
};
