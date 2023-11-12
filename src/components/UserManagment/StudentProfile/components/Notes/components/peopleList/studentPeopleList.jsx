import styles from './student.module.scss';
import { useState } from 'react';
import { STUDENT_TEACHER } from 'components/UserManagment/StudentProfile/graphql/queries';
import { useQuery } from '@apollo/client';

export const StudentPeopleList = ({ mySelf, setSelectedValue }) => {
  const [principalList, setPrincipalList] = useState(false);
  const [forValue, setForValue] = useState('For');
  const { data } = useQuery(STUDENT_TEACHER, {
    variables: { id: mySelf }
  });

  const name =
    data?.getStudent?.classRoom?.teachers?.items[0]?.classRoom?.teachers?.items[0]?.user
      ?.name;
  const id =
    data?.getStudent?.classRoom?.teachers?.items[0]?.classRoom?.teachers?.items[0]?.user
      ?.id;

  const displayMainList = () => {
    setPrincipalList(!principalList);
  };

  const list = e => {
    const value = e.target.getAttribute('data-value');
    setSelectedValue(value);

    const values = value.split('|');
    setForValue(values[1]);

    setPrincipalList(false);
  };

  return (
    <div className={styles.container}>
      <span onClick={displayMainList} className={styles.forSpan}>
        {forValue} ▼
      </span>
      <ul
        className={styles.principalList}
        style={{ display: principalList ? 'block' : 'none' }}
      >
        <li data-value={`${mySelf}|Myself`} onClick={list}>
          Myself
        </li>
        <li data-value={`${id}|${name}`} onClick={list}>
          My teacher
        </li>
        <li data-value="ADMIN|Coordinator" onClick={list}>
          Coordinator
        </li>
      </ul>
    </div>
  );
};
