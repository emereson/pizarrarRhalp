import { css } from '@emotion/react';

export const header = css`
  display: flex;
  flex: 0.25;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
  align-items: baseline;

  @media (max-width: 576px) {
    justify-content: flex-start;
    min-height: 30px;
  }
`;

export const time_container = css`
  align-items: center;
  display: flex;
  color: rgba(49, 136, 223);
  font-size: 1.2rem;
  font-family: Roboto, sans-serif;
  font-weight: 200;
  line-height: 1.2;
  font-size: 1.5rem;
  padding-left: 5px;
  margin-top: 0px;
  @media (max-width: 576px) {
    display: none;
  }
`;

export const title = css`
  color: rgba(49, 136, 223);
  font-size: 1.5rem;
  font-weight: 200;
  @media (max-width: 576px) {
    display: none;
  }
`;
export const text_title = css`
  @media (max-width: 576px) {
    // display: none;
  }
`;

export const backText = css`
  @media (max-width: 576px) {
    display: none;
  }
`;

export const titleContainer = css`
  text-align: center;
  @media (max-width: 750px) {
    width: 100%;
    margin: 10px 0;
    textalign: center;
  }
`;
