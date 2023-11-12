import { useEffect } from 'react';
import { UPDATE_CLASSROOM_BLUR } from '../graphQL/mutations';
import { useMutation } from '@apollo/client';
import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';

export const useUpdateClassRoomBlur = () => {
  const { assignedClassRoom } = useUserClassRoom();
  const [updateBlurMutation, { loading, error }] = useMutation(UPDATE_CLASSROOM_BLUR);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  function setClassRoomBlur(blur) {
    return updateBlurMutation({
      variables: { classRoomId: assignedClassRoom.classRoomId, blur }
    });
  }

  return { setClassRoomBlur, loading, error };
};
