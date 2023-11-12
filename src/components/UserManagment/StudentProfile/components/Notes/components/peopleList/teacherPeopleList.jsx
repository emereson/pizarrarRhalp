import styles from './teacher.module.scss';
import { useState } from 'react';
import { TEACHER_STUDENT } from 'components/UserManagment/StudentProfile/graphql/queries';
import { useQuery } from '@apollo/client';

export const TeacherPeopleList = ({ mySelf, setSelectedValue }) => {
  const [principalList, setPrincipalList] = useState(false);
  const [secondaryList, setSecondaryList] = useState(false);

  const [forValue, setForValue] = useState('For');
  const { data } = useQuery(TEACHER_STUDENT, {
    variables: { id: mySelf }
  });

  const displayMainList = () => {
    setPrincipalList(!principalList);
    setSecondaryList(false);
  };

  const displayStudentsList = () => {
    setSecondaryList(!secondaryList);
  };

  const list = e => {
    const value = e.target.getAttribute('data-value');
    setSelectedValue(value);

    const values = value.split('|');
    setForValue(values[1]);

    setPrincipalList(false);
    setSecondaryList(false);
  };

  return (
    <div className={styles.container}>
      <span className={styles.forSpan} onClick={displayMainList}>
        {forValue} ▼
      </span>
      <ul
        className={styles.principalList}
        style={{ display: principalList ? 'block' : 'none' }}
      >
        <li data-value={`${mySelf}|Myself`} onClick={list}>
          Myself
        </li>

        <li data-value="ADMIN|Coordinator" onClick={list}>
          Coordinator
        </li>
        <li>
          <span onClick={displayStudentsList}>Students ▼</span>
          <ul
            style={{ display: secondaryList ? 'block' : 'none' }}
            className={styles.secondaryLists}
          >
            {data?.getTeacher?.students?.items?.map((student, i) => {
              const truncatedName =
                student.user.name.length > 13
                  ? student?.user.name.substring(0, 10) + '...'
                  : student?.user.name;
              return (
                <li data-value={`${student.user.id}|${student.user.name}`} onClick={list}>
                  {truncatedName}
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
};
