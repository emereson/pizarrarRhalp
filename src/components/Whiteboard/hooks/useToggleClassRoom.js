import { useEffect } from 'react';
import { TOGGLE_CLASSROOM_STATE } from '../graphQL/mutations';
import { useApolloClient, useMutation } from '@apollo/client';
import { LIST_CLASSROOMS } from '../../AdminDashboard/graphql/queries';

export const useToggleClassRoomState = () => {
  const [toggleClassRoomMutation, { loading, error }] =
    useMutation(TOGGLE_CLASSROOM_STATE);

  const client = useApolloClient();
  let classRoomsData;

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  try {
    classRoomsData = client.readQuery({ query: LIST_CLASSROOMS });
  } catch (err) {
    console.error(err);
  }

  function setClassRoomState(classRoomId, isDisabled) {
    return toggleClassRoomMutation({ variables: { classRoomId, isDisabled } });
  }

  function toggleClassRoom(classRoomId) {
    if (classRoomsData) {
      const classRoom = classRoomsData.listClassRooms.items.find(
        classRoom => classRoom.id === classRoomId
      );
      if (!classRoom) {
        throw new Error(
          `error trying to toggle classRoom with id ${classRoom} not found`
        );
      }
      const isDisabled = !classRoom.isDisabled;
      return toggleClassRoomMutation({ variables: { classRoomId, isDisabled } });
    }
  }

  return { setClassRoomState, toggleClassRoom, loading, error };
};
