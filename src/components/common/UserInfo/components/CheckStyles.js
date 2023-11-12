import { css } from '@emotion/react';

export const box = css`
  height: 10px;
  width: 10px;
  //   background: white;
  padding: 2px;
  border: 1px solid white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const input = css`
  display: none;
`;

export const checkbox = css`
  height: 100%;
  width: 100%;
  background: white;
`;
export const container = css`
  display: flex;
`;

export const rounded = css`
  position: relative;
  label {
    background-color: #5ce550;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 10px;
    right: -5px;
    position: absolute;
    top: -5px;
    width: 10px;
  }
`;
