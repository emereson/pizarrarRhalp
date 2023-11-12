import { css } from '@emotion/react';

export const imgIco = css`
  width: 50px;
  align-self: center;
  padding: 10;

  @media screen and (min-width: 320px) and (max-width: 480px) {
    width: 32px;
    :nth-child(1) {
      width: 32px;
      height: 31.52px;
    }
  }
`;

export const textIco = css`
  font-size: 100%;
  color: #fff;
  margin-top: 5px;
  width: 100%;
  line-height: 100%;
  text-align: center;
`;
