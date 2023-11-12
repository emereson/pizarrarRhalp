import { css } from '@emotion/react';

export const inlineInput = css`
  color: white;
`;

export const userOptions = css`
  margin-top: 1em;
  margin-bottom: 0.5em;

  position: absolute;

  bottom: 0;
  width: 100%;
  & a,
  button {
    background: none;
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
  }

  & a:hover {
    text-decoration: none;
  }
`;

export const subText = css`
  font-size: 0.8rem;
`;
export const my3 = css`
  margin-top: 1rem;
`;

export const formContainer = css`
  z-index: 999;
`;

export const cristalButton = css`
  margin-top: 10px;
  &,
  &:focus {
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

export const goBackButton = css`
  @media (max-width: 390px) {
    margin-top: 25px;
  }
  margin-top: 10px;
  & {
    position: absolute;
    padding: 0;
    left: 10px;
  }
`;

export const formBody = css`
  & {
    padding-top: 5px;
  }
  @media (max-width: 375px) {
    font-size: 13px;
  }
`;
