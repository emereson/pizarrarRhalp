import { css } from '@emotion/react';

export const transparent_input = css`
  height: 23px;
  border: none;
  color: white;
  font-size: 12px;
  padding-left: 10px;
  margin: auto;
  width: 100%;
  background-color: transparent;
  font-weight: 500;

  :focus {
    outline: none;
  }
`;

export const label_text = css`
  margin: 5px 0px 0px 5px;
  // min-width: 5vw;
  color: #fff;
  font-size: 1.2em;
`;

export const container = css`
  border-top: 1px solid #fff;
  display: flex;
  width: 100%;

  @media (max-width: 576px) {
    border: 1px solid #fff;
    border-top: none;
    border-left: none;
    border-right: none;
  }
`;
