import { css } from '@emotion/react';

export const interview_and_footer = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  justify-content: space-between;

  @media (max-width: 576px) {
    min-height: inherit;
    height: inherit;
  }
`;

export const interview_container = css`
  display: flex;
  flex: 0.8;
  align-items: center;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const interview_wrapper = css`
  display: flex;
  width: 100%;

  justify-content: space-around;
  @media (max-width: 750px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const calendar_container = css`
  display: flex;
  position: relative;
  justify-content: center;
  flex: 0.3;
`;

export const time_container = css`
  align-items: center;
  position: relative;

  display: flex;
  justify-content: flex-start;
  flex: 0.3;
  width: 100%;
  flex-direction: column;

  @media (max-width: 576px) {
    height: 100%;
    flex: auto;
  }
`;

export const clock_img = css`
  height: 55px;
  width: 55px;
  padding-bottom: 25px;
`;

export const time_text_p = css`
  margin: 5px;
`;

export const time_picker_container = css`
  display: flex;
  padding: 20px;
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
`;

export const text_container = css`
  display: flex;
  flex: 0.07;
`;

export const footer_course = css`
  background-color: rgba(61, 218, 255, 0.3);
`;
export const footer_special = css`
  background-color: rgba(125, 136, 255, 0.3);
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

export const description_text = css`
  position: absolute;
  font-size: 14px;
  top: -20px;
  right: 20px;
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
  }
`;
