import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Styles.module.scss';
import { useUserClassRoom } from 'components/UserManagment/hooks/useUserClassRoom';
import { style } from 'd3';

export default function ContainerButtonsUpper() {
  const { assignedClassRoom } = useUserClassRoom();

  return (
    <div className={styles.containerButtonsUpper}>
      <div className={styles.left}>
        <Link to={'learning-content'}>
          <div className={styles.divImgLeft}>
            <img
              style={{ height: '100%', width: 'auto', padding: '1px' }}
              src="/static/img/student-profile/student.png"
              alt="Icono 2"
            />
          </div>
        </Link>
        <div className={styles.lineLeft}></div>
      </div>
      <div className={styles.right}>
        <Link
          to={
            assignedClassRoom.classRoomId
              ? `/whiteBoard/${assignedClassRoom.classRoomId}`
              : '#'
          }
        >
          <div className={styles.divImgRight}>
            <img
              src="/static/img/student-profile/teacher.png"
              alt="Icono 1"
              style={{ height: '100%', width: 'auto', padding: '1px' }}
            />
          </div>
        </Link>
        <div className={styles.lineRight}></div>
      </div>
    </div>
  );
}

