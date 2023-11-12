import { css } from '@emotion/react';

export const canvas_width = 302;
export const canvas_height = 85;

export const color_container_styles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const color_palette_styles = css`
  width: ${canvas_width}px;
  height: ${canvas_height}px;

  padding: 0px;
  display: flex;
`;
