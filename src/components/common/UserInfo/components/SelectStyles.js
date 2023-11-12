import { css } from '@emotion/react';

export const transparent_select = css`
  appearance: none;
  height: 23px;
  border: none;
  color: white;
  font-size: 12px;
  padding-left: 10px;
  margin: auto;
  width: 100%;
  background-color: transparent;
  font-weight: 500;

  option {
    color: black;
  }
`;

export const label_text = css`
  margin: 5px 0px 0px 5px;
  // min-width: 5vw;
  color: #fff;
  font-size: 0.8em;
`;

export const container = css`
  border-top: 1px solid #fff;
  display: flex;
  width: 100%;
`;
