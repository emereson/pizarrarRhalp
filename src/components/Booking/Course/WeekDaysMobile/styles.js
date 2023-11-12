import { css } from '@emotion/react';

export const time_picker_wrapper = css`
  display: flex;
  flex-direction: column;
`;

export const from_container = css`
  height: 35px;
  @media (max-width: 576px) {
    display: none;
  }
`;

export const to_container = css`
  height: 35px;
  @media (max-width: 576px) {
    display: none;
  }
`;

export const week_days_wrapper = css`
  @media (max-width: 576px) {
  }
`;

export const from_to_container = css`
  display: flex;
  flex-direction: column;
`;
export const from_to_text = css`
  color: white;
`;

export const days_container = css`
  display: flex;
`;

export const days_selector = css`
  display: flex;
  color: white;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  // justify-content: space-around;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;
export const single_day = (isSelected, color = '') =>
  css`
    margin: 0px;
    cursor: pointer;
    font-size: 14px;
    height: 20px;
    margin: 5px;
    text-align: center;
    background-color: ${isSelected ? color : 'transparent'};
    @media (max-width: 576px) {
      margin: 10px;
    }
  `;

export const click_ico = css`
  width: 20px;
  height: 20px;
  align-self: center;
  margin-top: 10px;
`;
export const day_clock = css`
  display: flex;
  flex-direction: column;
  width: 50px;

  @media (max-width: 576px) {
    align-items: center;
  }
`;

export const set_times_container = css`
  display: flex;
  flex-direction: column;
`;
export const text_time = css`
  display: flex;
`;
export const text = css``;
export const top_bar = css`
  height: 25px;
`;
