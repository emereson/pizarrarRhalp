import React from 'react';
import styles from './styles.module.scss';
import { USER_ROLES } from 'enums/constants.enum';
import { useUserRole } from 'services/cognito.service';
import { Link } from 'react-router-dom';
import ChangeBackgroundTool from 'components/Whiteboard/BottomBar/ChangeBackgroundTool';
import { BackgroundTool } from '../StudentCard/components/BackgroundTool';

export default function ButtonControlPanel() {
  const userRole = useUserRole();

  return (
    <>
      {userRole === USER_ROLES.ADMINS ? (
        <div className={styles.buttonControlPanel}>
          <BackgroundTool address="imageUrl" storage="imageUrl" />
        </div>
      ) : null}
      {userRole === USER_ROLES.ADMINS ? (
        <Link to={'/admin-chat'} style={{ textDecoration: 'none' }}>
          <div className={styles.buttonControlPanel}>Admin Chat</div>
        </Link>
      ) : (
        <div
          className={styles.buttonControlPanel}
          style={{ display: 'none', cursor: 'default' }}
        >
          Bloque de relleno
        </div>
      )}
      {userRole === USER_ROLES.ADMINS ? (
        <Link to={'/admin/exam-editor/joinBranakTest'} style={{ textDecoration: 'none' }}>
          <div className={styles.buttonControlPanel}>Test</div>
        </Link>
      ) : (
        <div className={styles.buttonControlPanel}>Selector</div>
      )}
      {userRole === USER_ROLES.ADMINS ? (
        <Link to={'/admin-dashBoard'} style={{ textDecoration: 'none' }}>
          <div className={styles.buttonControlPanel}>Control Panel</div>
        </Link>
      ) : (
        <div
          className={styles.buttonControlPanel}
          style={{ display: 'none', cursor: 'default' }}
        >
          Bloque de relleno
        </div>
      )}
      {userRole === USER_ROLES.ADMINS ? (
        <div className={styles.buttonControlPanel}>
          <ChangeBackgroundTool />
        </div>
      ) : null}
    </>
  );
}
