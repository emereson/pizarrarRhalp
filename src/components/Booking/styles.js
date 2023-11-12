import { css } from '@emotion/react';

export const booking_container = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const selector_container = css`
  display: flex;
  justify-content: space-between;
  padding: 0px 15px 0px 15px;
  flex: 0.5;

  @media (max-width: 576px) {
    flex-direction: row;
  }
`;

export const option_container = css`
  display: flex;
  flex: 3;
`;

export const booking_footer = css`
  display: flex;
  align-items: flex-end;
  margin: 20px 30px 0px 30px;

  @media (max-width: 576px) {
    margin: 0;
  }
`;
