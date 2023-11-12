import React, { Fragment } from 'react';
/** @jsxImportSource @emotion/react */
import { crystal_input, label_text } from './styles';

const CrystalInput = ({ value, label, name, onChange }) => {
  return (
    <Fragment>
      <p css={label_text}>{label}</p>
      <input
        css={crystal_input}
        value={value}
        name={name}
        onChange={val => onChange(val)}
      />
    </Fragment>
  );
};

export default CrystalInput;
