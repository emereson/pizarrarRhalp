import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import styles from './styles/styles.module.scss';

createTheme('branak', {
  text: {
    primary: 'white',
    secondary: 'white'
  },
  background: {
    default: 'transparent'
  },
  divider: {
    default: 'transparent'
  }
});

const columns = width => [
  {
    selector: 'date',
    width: width > 768 ? '16%' : '20%'
  },
  {
    selector: 'no',
    width: '8%'
  },
  {
    selector: 'name',
    width: width > 768 ? '20%' : '23%'
  },
  {
    selector: 'process',
    width: width > 768 ? '45%' : '35%'
  },
  {
    selector: 'score',
    width: width > 768 ? '8.5%' : '14%',
    center: true
  }
];

const customStyles = {
  headCells: {
    style: {
      display: 'none'
    }
  },
  cells: {
    style: {
      padding: '0',
      whiteSpace: 'break-spaces',
      minHeight: '18px'
    }
  }
};

const EvaluationsTable = ({ data, width }) => {
  let dataRender = data;
  return (
    <div className={styles.containerDataTable}>
      <DataTable
        columns={columns(width)}
        data={dataRender}
        theme="branak"
        style={{ marginTop: '-30px' }}
        noHeader={true}
        fixedHeader={true}
        fixedHeaderScrollHeight={
          width >= 1920 ? '320px' : width < 1440 ? '250px' : '320px'
        }
        customStyles={customStyles}
        dense={true}
      />
    </div>
  );
};

export default EvaluationsTable;
