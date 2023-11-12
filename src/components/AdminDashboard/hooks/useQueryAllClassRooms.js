import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_CLASSROOMS } from '../graphql/queries';
import { ON_UPDATE_CLASSROOM } from '../graphql/subscriptions';
import { useState } from 'react';

export const useQueryAllClassRooms = () => {
  // initially query all classrooms
  const { subscribeToMore, loading, error, data } = useQuery(LIST_CLASSROOMS);
  const [classRoomsIds, setclassRoomsIds] = useState([]);

  useEffect(() => {
    if (Array.isArray(data?.listClassRooms.items)) {
      setclassRoomsIds([...data?.listClassRooms?.items].map(d => d.id));
    }
  }, [data]);

  // subscribe for real time updates
  useEffect(() => {
    subscribeToMore({
      document: ON_UPDATE_CLASSROOM,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const data = subscriptionData.data.onUpdateClassRoom;
        return prev.listClassRooms.items.map(classRoom => {
          if (classRoom.id === data.id) {
            return { ...classRoom, isDisabled: data.isDisabled };
          }
          return classRoom;
        });
      }
    });
  }, [subscribeToMore]);

  return { loading, error, data, classRoomsIds };
};
