// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/core';
import selectedIcon from './assets/selected-icon.svg';
import unSelectedIcon from './assets/unselected-icon.svg';
// eslint-disable-next-line no-undef
const classNames = require('classnames');

const styles = css`
  .input-container {
    --border-color: var(--color-black);
    --text-color: var(--color-black);
    &[data-checked='true'] {
      --border-color: var(--color-blue);
      --text-color: var(--color-blue);
      font-weight: 700;
    }
    &:hover {
      --border-color: var(--color-blue);
    }
    color: var(--text-color);
    display: inline-flex;
    min-width: 280px;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    cursor: pointer;
    margin: 0;
    text-align: left;
    user-select: none;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    &__text {
      font-weight: normal;
      // transition: all .3s ease-in;
      left: 35px;
      flex: 1 0 60%;
      padding: 3px;
      word-break: break-all;
      background-color: transparent;
      resize: none;
      font-weight: inherit;
    }
    /* styles when the radio button is selected*/
    input:checked ~ .checkmark {
      background-repeat: no-repeat;
      background-image: url(${selectedIcon});
    }
  }

  /* Hide the browser's default radio button */
  .input-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom radio button */
  .checkmark {
    display: flex;
    flex-direction: column;
    margin-right: 5px;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 25px;
    background-color: transparent;
    border-radius: 50%;
    font-size: 16px;
    background-image: url(${unSelectedIcon});
  }
`;

const CheckBox = ({
  type = 'checkbox',
  onCheckBoxChange,
  inputName,
  value,
  textValue = '',
  isChecked = false
}) => {
  return (
    <div css={[styles]} style={{ height: '100%' }}>
      <label
        className={isChecked ? 'input-container options__selected' : 'input-container'}
        data-checked={isChecked}
      >
        <input
          onChange={onCheckBoxChange}
          type={type}
          name={inputName}
          value={value}
          checked={isChecked}
          className="checkmark-input"
        />
        <em className={classNames('checkmark')}></em>
        <div className="input-container__text">{textValue}</div>
      </label>
    </div>
  );
};

export default CheckBox;
