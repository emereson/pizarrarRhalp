import React, { useState, useEffect } from 'react';
// import './StudentProfile.scss';
import styles from './StudentProfile.module.scss';
import { useQuery } from '@apollo/client';
import { EVALUATIONS_BY_STUDENTS } from '../graphQL/queries';
import { useUser } from '../UserProvider';
import { skillsAverage } from './components/SkillsAverage';
import { useUserRole } from 'services/cognito.service';
// COMPONENTS
import PerformanceLine from './components/PerformanceLine/performanceLine';
import { evaluationsAverage } from './components/EvaluationsGraph/utils/utils';
import CircleComponent from './components/SkillComponent';
import { StudentCard } from './components/StudentCard';
import BottonContainerProfile from './components/BottonContainerProfile';
import { Notes } from './components/Notes';
import Table from './components/Table';
import EvaluationsGraph from './components/EvaluationsGraph';
import { tasks } from './const/tasks.js';
import ButtonControlPanel from './components/ButtonControlPanel/ButtonControlPanel';
import ContainerButtonsUpper from './components/containerButtonsUpper/ContainerButtonsUpper';
// query graphql nota de texto

const StudentProfile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isEditMode, setIsEditMode] = useState(false);
  const [evaluations, setEvaluations] = useState([]);
  let overallAverage = evaluationsAverage(evaluations);
  const [averages, setAverages] = useState([]);
  const [evaluationsLoading, setEvaluationsLoading] = useState(true);
  const { user } = useUser();
  const role = useUserRole();

  const { error, data: evaluationsData } = useQuery(EVALUATIONS_BY_STUDENTS, {
    variables: { studentId: user.attributes.sub },
    fetchPolicy: 'cache-and-network'
  });
  /**
   *  Uploads profile picture
   *  Update user name
   *  Updates user password
   * @param {HTMLEvent} e
   */

  useEffect(() => {
    if (evaluationsData) {
      let evaluations = evaluationsData.evaluationsByStudents.items;
      // Only the evaluations are obtained with score
      evaluations = evaluations.filter(eva => eva.score);
      setEvaluations(evaluations);
      setAverages(skillsAverage(evaluations));
      setEvaluationsLoading(false);
    }
  }, [evaluationsData]);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () => window.removeEventListener('resize', null);
  }, []);

  if (error) {
    console.log('ERROR-GET-EVALUATIONS ->', error.message);
    alert('Error getting data');
  }

  let arrayScore = [55, 60, 80, 74]; //speaking reading writing listening
  return (
    <article className={styles.studentProfile}>
      <div className={styles.divTop}>
        <div className={styles.containerProfile}>
          <div className={styles.topContainerProfile}>
            <StudentCard isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
          </div>
          <div className={styles.containerButtomTop}>
            {!isEditMode ? <BottonContainerProfile /> : null}
          </div>
        </div>

        <div className={styles.divSkillsGraph}>
          <ContainerButtonsUpper />
          <CircleComponent arrayScore={arrayScore} isEditMode={isEditMode} />
          <div className={styles.containerButtomBottom}>
            {!isEditMode ? <BottonContainerProfile /> : null}
          </div>
        </div>

        <div className={styles.divNotes}>
          <Notes />
        </div>
      </div>

      <div
        className={
          role === 'ADMIN'
            ? styles.containerButtonControlPanelAdmin
            : styles.containerButtonControlPanel
        }
      >
        <ButtonControlPanel />
      </div>

      <div className={styles.divMiddle}>
        {!evaluationsLoading && <PerformanceLine overallAverage={overallAverage} />}
      </div>

      <div className={styles.divBotton}>
        <Table width={width} evaluationsLoading={evaluationsLoading} data={tasks.data} />
        <EvaluationsGraph data={tasks.data} />
      </div>
    </article>
  );
};
export default StudentProfile;
