import { css } from '@emotion/react';

export const interview_and_footer = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const interview_container = css`
  display: flex;

  align-items: center;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const interview_wrapper = css`
  display: flex;
  flex: 1;
  justify-content: space-around;
  @media (max-width: 576px) {
    width: 100%;
    flex-direction: column;
    margin-top: 10px;
    justify-content: flex-start;
  }
`;

export const calendar_container = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0.3;
  @media (max-width: 576px) {
    padding: 5px;
    flex-direction: column-reverse;
  }
`;

export const time_container = css`
  position: relative;
  align-items: center;
  display: flex;
  flex: 0.3;
  flex-direction: column;
  cursor: pointer;
`;

export const time_component = css`
  position: relative;
  align-items: center;
  display: flex;
  border: 1.5px solid #fff;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  @media (max-width: 576px) {
    margin: 0px;
    border: none;
    flex-direction: row-reverse;
    flex: 3;
  }
`;
export const clock_img = css`
  height: 55px;
  width: 55px;
  @media (max-width: 576px) {
    width: 25px;
    height: 25px;
  }
`;

export const time_text_p = css`
  align-self: flex-start;
  color: #fff;
  font-size: 14px;
  position: absolute;
  bottom: 0px;
  left: 5px;

  @media (max-width: 576px) {
    margin: 0px;
    left: 10px;
    font-size: 12px;
  }
`;

export const next_button_p = css``;

export const back_button_p = css`
  display: none;
  @media (max-width: 750px) {
    display: block;
    align-self: flex-start;
    width: fit-content;
    color: #fff;
    font-size: 14px;
    position: absolute;
    top: 0px;
    margin: 0px;
    left: 10px;
    font-size: 12px;
  }
`;

export const time_picker_container = css`
  display: flex;
  padding: 20px;
  align-items: center;
`;

export const time_picker_text = css`
  margin: 0px;
`;
export const user_info_container = css`
  display: flex;
  position: relative;
  justify-content: flex-start;
  flex: 0.3;
  flex-direction: column;
  align-items: center;
`;

export const time_picker = css`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;

  @media (max-width: 576px) {
    padding-bottom: 0px;
    flex-direction: row;
    align-items: center;
    flex: 3;
    justify-content: center;

    span input {
      font-size: 25px !important;
      width: 100% !important;
      margin-top: 0px !important  ;
    }
  }
`;
export const interview_footer = css`
  background-color: rgba(49, 136, 223, 0.3);
`;
export const test_footer = css`
  background-color: rgba(195, 136, 255, 0.3);
`;
export const description_text = css`
  position: absolute;
  font-size: 14px;
  top: -20px;
  right: 15px;
`;
export const time_arrows = css`
  display: none;

  // @media (max-width: 576px) {
  display: flex;
  flex-direction: column;
  flex: 2;
  // }
`;

export const continueButton = css`
  display: none;

  @media (max-width: 576px) {
    display: block;
    position: absolute;
    top: 0px;
    right: 5px;
    color: #fff;
  }
`;

export const backIcon = css`
  display: none;
  fill: #fff;
  path {
    fill: #fff !important;
  }
  @media (max-width: 576px) {
    position: absolute;
    top: 0px;
    left: 5px;
    display: block;
  }
`;

export const calender_text = css`
  @media (max-width: 576px) {
    top: -15px;
    left: 10px;
  }
`;
export const time_text = css`
  @media (max-width: 576px) {
    top: 0px;
    right: 10px;
  }
`;
export const information_text = css`
  @media (max-width: 576px) {
    top: 15px;
    left: 100px;
  }
`;

export const rounded = css`
  position: relative;
  label {
    background-color: #5ce550;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 10px;
    right: -15px;
    position: absolute;
    top: -15px;
    width: 10px;
    @media (max-width: 576px) {
      right: 0px;
      left: 80px;
    }
  }
`;
