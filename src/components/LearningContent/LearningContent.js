import React, { useEffect } from 'react';
import styles from './styles/LearningContent.module.scss';
import useGetUserSliders from './hooks/useGetUserSlides';
import { useUser } from 'components/UserManagment/UserProvider';
import { useHistory } from 'react-router-dom';
import useCreateStudyProgress from './hooks/useCreateStudyProgress';
import { FiArrowLeft } from 'react-icons/fi';
import IconBack from './components/assets/IconBack';

export default function LearningContent() {
  const { user } = useUser();
  const history = useHistory();
  const { lastSlide, UserData, englishLevels, refetchUSP } = useGetUserSliders(
    user?.username,
    user.attributes?.name
  );
  const { updateLevelProgress } = useCreateStudyProgress();


  const handleBack = () => {
    history.push('/student-profile');
  };

  useEffect(() => {
    refetchUSP();
  }, []);

  useEffect(() => {
    if (UserData?.level !== 'null' && !window.location.pathname.includes('no_redirect')) {
      if (lastSlide && UserData?.level) {
        history.push('/learning-content/document/' + UserData.level + '/' + lastSlide);
      }
      if (UserData?.level && !lastSlide) {
        history.push('/learning-content/document/' + UserData.level + '/' + 'null');
      }
    }
  }, [lastSlide, UserData]);

  const linkToLevel = level => {
    updateLevelProgress({
      variables: {
        id: UserData.id,
        level,
        owner: UserData.owner
      }
    }).then(res => {
      history.push('/learning-content/document/' + level + '/' + 'null');
    });
  };


  return (
    <div className={styles.container}>
      <div className={styles.backContainer} onClick={handleBack}>
        <IconBack />
      </div>
      <div className={styles.titleContainer}>
        <p>Choose your english level to go!</p>
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.levelsContainer}>
          {englishLevels.length > 0 &&
            UserData &&
            englishLevels.map(level => {
              return (
                <div
                  key={level.id}
                  onClick={() => linkToLevel(level.id)}
                  className={styles.levelBox}
                >
                  <div className={styles.level}>
                    <p>{level.id}</p>
                  </div>
                  <p>Level</p>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.message}>
        <p>
          If you don´t know your English level, take a level test, or talk to your teacher
          to asign you one, then come back here.
        </p>
      </div>
    </div>
  );
}
