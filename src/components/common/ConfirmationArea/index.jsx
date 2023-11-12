import React from 'react';
/** @jsxImportSource @emotion/react */
import {
  confirmation_area_container,
  confirmation_text_container,
  confirmation_text,
  crystal_text,
  checkbox
} from './styles';

const ConfirmationArea = ({
  text,
  onChangeText,
  placeholder,
  emailConfirmation,
  setEmailConfirmation
}) => {
  return (
    <div css={confirmation_area_container}>
      <div css={confirmation_text_container}>
        <p css={confirmation_text}>Do you require a mail confirmation</p>
        <div css={checkbox} className="checkboxFive">
          <input
            type="checkbox"
            onChange={() => {
              setEmailConfirmation(!emailConfirmation);
            }}
          />
        </div>
      </div>

      <textarea
        css={crystal_text}
        placeholder={placeholder}
        value={text}
        onChange={onChangeText}
        cols="6"
        rows="10"
      />
    </div>
  );
};

export default ConfirmationArea;
