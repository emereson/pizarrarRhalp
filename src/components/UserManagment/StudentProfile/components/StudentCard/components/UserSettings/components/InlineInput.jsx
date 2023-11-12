// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxImportSource @emotion/react */
import CrystalInput from './CristalInput';
import styles from './style.module.scss';

// should be rendered inside a .container
// inputColSize: col size base  on bootsrap grid sizes
const InLineInput = ({
  label,
  inputId,
  userSettingsMode,
  noPadding,
  inputWidth,
  noMargin,
  mas,
  inputColSize = 7,
  borderBottom,
  ...rest
}) => {
  return (
    <div className={styles.imputs}>
      {mas === 'true' ? (
        <label htmlFor={inputId}>{label}</label>
      ) : (
        <label htmlFor={inputId}>{label}</label>
      )}

      <div style={{ color: 'blue' }}>
        <CrystalInput id={inputId} {...rest}></CrystalInput>
      </div>
    </div>
  );
};

export default InLineInput;
