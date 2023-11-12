import React, { Fragment } from 'react';
/** @jsxImportSource @emotion/react */
import { container, transparent_input, label_text } from './styles';

const TransparentInput = ({ value, label, name, onChange }) => {
  return (
    <div css={container}>
      <p css={label_text}>{label}</p>
      <input
        css={transparent_input}
        value={value}
        name={name}
        onChange={val => onChange(val)}
      />
    </div>
  );
};

export default TransparentInput;
