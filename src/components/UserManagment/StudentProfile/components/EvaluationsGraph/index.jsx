import React from 'react';
import CustomGraph from './components/Graph';
import styles from './styles/styles.module.scss';

const EvaluationsGraph = ({ data }) => {
  return (
    <div className={styles.divBottonRight}>
      <div className={styles.titlesGraph}>
        <p style={{ marginLeft: '10%' }}>Average</p>
        <p style={{ marginLeft: '30%' }}>Progress chart</p>
      </div>
      <div className={styles.Graph}>
        <CustomGraph data={data} />
      </div>
    </div>
  );
};

export default EvaluationsGraph;
