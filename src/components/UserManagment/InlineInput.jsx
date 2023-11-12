// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxImportSource @emotion/react */
import { inlineInput, my3 } from './styles';
import CrystalInput from '../common/CrystalInput/CrystalInput';
import './styles.css';

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
    <div
      className="inlineInput row"
      style={{
        padding: noPadding ? '0 5px' : '5px 30px',
        alignItems: 'center',
        marginRight: noMargin ? 0 : '-15',
        marginLeft: noMargin ? 0 : '-15',
        width: '100%',
        boxSizing: 'border-box',
        justifyContent: label !== 'mail' ? 'space-between' : 'space-around'
      }}
    >
      {mas === 'true' ? (
        <label
          style={{
            marginBottom: '0px',
            fontSize: '1.2rem',
            textAlign: 'right',
            height: 'fit-content'
          }}
          htmlFor={inputId}
        >
          {label}
        </label>
      ) : (
        <label
          style={{
            marginBottom: '0px',
            paddingRight: '0px',
            fontSize: '1.2rem',
            height: 'fit-content'
          }}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}

      <div
        style={{
          paddingLeft: '0px',
          width: inputWidth
            ? inputWidth
            : userSettingsMode
            ? '40%'
            : label !== 'mail'
            ? '55%'
            : '65%',
          marginBottom: label !== 'mail' ? '5px' : '10px',
          borderBottom: borderBottom ? '1px solid #2605fb' : ''
        }}
      >
        <CrystalInput id={inputId} {...rest}></CrystalInput>
      </div>
    </div>
  );
};

export default InLineInput;
