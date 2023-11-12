import { useUser } from 'components/UserManagment/UserProvider';
import useCreateStudyProgress from './useCreateStudyProgress';
const { useQuery } = require('@apollo/client');
const { useState, useEffect } = require('react');
const { GET_ENGLISH_LEVELS, GET_USER_STUDY_PROGRESS } = require('../graphQL/queries');

const useGetUserSliders = (email, name) => {
  const [UserData, setUserData] = useState(null);
  const [englishLevels, setenglishLevels] = useState([]);
  const { createProgress } = useCreateStudyProgress();
  const { data: levels } = useQuery(GET_ENGLISH_LEVELS);
  const user = useUser();
  const {
    error: errorUSP,
    data: userProgress,
    refetch: refetchUSP
  } = useQuery(GET_USER_STUDY_PROGRESS, {
    variables: {
      email
    }
  });

  useEffect(() => {
    if (!userProgress) {
      refetchUSP();
    } else {
      const { listUserStudyProgresses } = userProgress;
      if (listUserStudyProgresses.items.length === 0) {
        createProgress({
          variables: {
            lastSlideID: 'null',
            level: 'null',
            name,
            owner: email
          }
        });
      } else {
        setUserData(listUserStudyProgresses.items[0]);
      }
    }
  }, [user, errorUSP, userProgress, createProgress, email, name, refetchUSP]);

  useEffect(() => {
    if (levels)
      setenglishLevels(
        Array.from(levels.listStudentsLevels.items).sort(
          (prev, next) => parseInt(prev.id) - parseInt(next.id)
        )
      );
  }, [levels]);

  return {
    lastSlide: UserData?.lastSlide,
    UserData,
    englishLevels,
    refetchUSP
  };
};

export default useGetUserSliders;
