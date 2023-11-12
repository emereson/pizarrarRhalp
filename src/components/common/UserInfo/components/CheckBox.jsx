// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { box, input, rounded } from './CheckStyles';

const CheckBox = ({ onChange, name, ...props }) => {
  const [isChecked, setIsChecked] = useState();

  const handleChange = e => {
    console.log(e.target.checked);
    setIsChecked(e.target.checked);
    onChange(e);
  };
  return (
    <div {...props} style={{ display: 'flex', alignItems: 'center' }}>
      <label style={{ margin: 0 }}>
        <div css={box}>
          {isChecked && (
            <div css={rounded}>
              <label></label>
            </div>
          )}
        </div>
        <input name={name} css={input} type="checkbox" onChange={e => handleChange(e)} />
      </label>
    </div>
  );
};

export default CheckBox;
