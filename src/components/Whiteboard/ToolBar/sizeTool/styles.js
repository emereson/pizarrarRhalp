import { css } from '@emotion/react';

export const size_container_styles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 81;
`;

export const size_dots_styles = css`
  position: absolute;
  width: 350px;
  height: 60px;
  left: 44px;
  border: 2px black solid;
  border-radius: 5px;
  padding: 0px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  z-index: 81;
`;
