// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxImportSource @emotion/react */
import { box, input, container, rounded } from './CheckStyles';

const RadioInput = ({ onChange, name, label, style = {}, ...props }) => {
  return (
    <div css={container} style={style}>
      <span style={{ marginRight: 5 }}>{label && label}</span>
      <label style={{ margin: 0 }}>
        <div css={box}>
          {props.checked && (
            <div css={rounded}>
              <label></label>
            </div>
          )}
        </div>
        <input {...props} name={name} css={input} type="radio" onChange={onChange} />
      </label>
    </div>
  );
};

export default RadioInput;
