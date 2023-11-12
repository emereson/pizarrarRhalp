import React from 'react';
import styles from './styles/styles.module.scss';
import EvaluationsTable from './components/EvaluationsTable';
import LoadingSpinner from 'components/common/LoadingSpinner';

const Table = ({ width, evaluationsLoading, data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titlesTable}>
        <p className={styles.date}>Date</p>
        <p className={styles.practiceNumber}>N°</p>
        <p className={styles.name}>Name</p>
        <p className={styles.procces}>Procces</p>
        <p className={styles.score}>Score</p>
      </div>
      <div className={styles.Table}>
        {data ? (
          <EvaluationsTable data={data} width={width} />
        ) : (
          !evaluationsLoading && <p>There are no evaluations</p>
        )}
        {evaluationsLoading && (
          <div>
            <LoadingSpinner animation="border" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
