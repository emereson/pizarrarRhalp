import styles from './styles/styles.module.scss';
import React from 'react';

const BottonContainerProfile = () => {
  return (
    <div className={styles.bottonContainerProfile}>
      <div className={styles.phoneticLab}>
        <div className={styles.containerBottonContainerProfile}>
          <div className={styles.smallCircle}></div>
          <p>Phonetic Lab</p>
        </div>
      </div>
      <div className={styles.biling}>
        <div className={styles.containerBottonContainerProfile}>
          <div className={styles.smallCircle}></div>
          <p>Billing / Payment</p>
        </div>
      </div>
      
    </div>
  );
};

export default BottonContainerProfile;
