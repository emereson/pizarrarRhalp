// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const CrystalButton = ({ children, customStyles, ...props }) => {
  const styles = css`
    color: inherit;
    &,
    &:focus {
      border-style: none;
      background-color: transparent;
      outline: none;
    }
  `;

  return (
    <button {...props} css={styles} style={customStyles}>
      {children}
    </button>
  );
};

export default CrystalButton;
