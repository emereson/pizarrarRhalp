import { css } from '@emotion/react';

export const time_picker_wrapper = css`
  // justify-content: space-around;
  // flex: 0.3;
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
  // padding-top: 13px;
  @media (max-width: 576px) {
    display: none;
  }
`;

export const week_days_wrapper = css`
  display: flex;

  flex-direction: column;
  // flex: 1;
  width: 98%;
  // justify-content: end;
  padding-top: 32px;
  height: 100%;
  border: 1px solid white;
  @media (max-width: 576px) {
    padding-top: -32px;
  }
`;

export const from_to_container = css`
  // margin-top: 28px;

  // justify-content: flex-start;
  display: flex;
  // flex: 0.125;
  flex-direction: column;
`;
export const from_to_text = css`
  color: white;
`;

export const days_container = css`
  display: flex;

  // justify-content: flex-end;
`;

export const days_selector = css`
  display: flex;
  color: white;
  justify-content: space-around;
  // justify-content: flex-end;
  // flex: 1;
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
    // padding: 5px;
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
  // flex: 0.125;
  flex-direction: column;
  width: 50px;

  // justify-content: end;
  // margin: 3px;
  @media (max-width: 576px) {
    align-items: center;
  }
`;

export const set_times_container = css`
  // flex: 0.4;
  display: flex;

  flex-direction: column;
  // justify-content: space-around;
`;
export const text_time = css`
  display: flex;
  // margin-left: 5px;
`;
export const text = css`
  // margin: 0px;
  // padding-right: 10px;
`;
export const top_bar = css`
  // flex: 1;
  height: 25px;
`;
