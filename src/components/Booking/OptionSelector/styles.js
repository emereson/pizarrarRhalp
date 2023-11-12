import { css } from '@emotion/react';

export const option_icon_container = css`
  align-items: center;
  display: flex;
  flex: 0.2;
  width: 25%;
  background: blue;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0.5rem 1.9rem 2rem 1.9rem;
  cursor: pointer;
  @media (max-width: 576px) {
    width: 25%;
    margin: 0px;
  }
`;

export const option_icon = css`
  cursor: pointer;
  width: 20%;
  @media (max-width: 950px) {
    width: 30%;
  }
  @media (max-width: 600px) {
    width: 50%;
  }
`;

export const title = css`
  color: #fff;
  font-size: 1rem;
  font-family: Open Sans, sans-serif;
  font-weight: 300;
  // line-height: 0.2;
  @media (max-width: 576px) {
    // font-size: 0.9rem;
    text-align: center;
  }
`;
