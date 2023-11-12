// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import TextareaAutosize from 'react-textarea-autosize';
// eslint-disable-next-line no-undef
const classNames = require('classnames');

const LIGHT_GREEN = '#61fb69';

const styles = css`
  /* Hide the browser's default radio button */
  .input-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
`;

const EditableCheckBox = ({
  type = 'checkbox',
  small = false,
  onCheckBoxChange,
  onInputChange,
  inputName,
  textInputName,
  value,
  textValue = '',
  isEditable = false,
  labelText = '',
  isChecked = false,
  examColorMode,
  style,
  className,
  customRadioStyles
}) => {
  const checkMarkStyles = css`
    .checkmark:after {
      content: '${value}';
      position: absolute;
      display: block;
    }
  `;

  return (
    <div css={[styles, checkMarkStyles]} className={className} style={style}>
      <label className="input-container">
        <input
          tabIndex={-1}
          onChange={onCheckBoxChange}
          type={type}
          name={inputName}
          value={value}
          checked={isChecked}
        />
        <div
          className={
            examColorMode
              ? isChecked
                ? 'color-scheme-label-radio-button__selected'
                : 'color-scheme-label-radio-button'
              : isChecked
              ? 'checkmark-radio-button__selected'
              : 'checkmark-radio-button'
          }
          style={customRadioStyles}
        >
          {!examColorMode && <p style={{ margin: 0 }}>{value}</p>}
        </div>
        <div className={!examColorMode && 'answer-item'}>
          <span className="input-container__label-text">{labelText}</span>
          {!labelText && (
            <TextareaAutosize
              onChange={onInputChange}
              name={textInputName}
              value={textValue}
              className="input-container__text no-border"
              disabled={!isEditable}
              spellCheck="false"
            ></TextareaAutosize>
          )}
        </div>
      </label>
    </div>
  );
};

export default EditableCheckBox;
