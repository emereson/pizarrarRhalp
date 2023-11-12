import { css } from '@emotion/react';

export const footer_container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const text = css`
  font-size: 1.6rem;
  color: white;
  margin: 0px;
  text-align: center;
  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

export const text_info = css`
  display: flex;
  justify-content: flex-start;
`;

export const send = css`
  position: absolute;
  margin: 0% 1rem 3.8vh;
  bottom: 0px;
  right: 0px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  align-self: flex-end;
`;
