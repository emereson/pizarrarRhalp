import { useEffect, useState } from 'react';

export const useSortClassRooms = list => {
  const [sortedClassRooms, setSortedClassRooms] = useState(list);

  useEffect(() => {
    const sorted = [...list].sort((a, b) => +a.id - +b.id);
    setSortedClassRooms(sorted);
  }, [list]);

  return { sortedClassRooms };
};
