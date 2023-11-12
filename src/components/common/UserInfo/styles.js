import { css } from '@emotion/react';

export const input_container = css`
  display: flex;
`;
export const first_input_container = css`
  @media (max-width: 576px) {
    border-top: 1px solid #fff;
  }
`;

export const label_text = css`
  margin: 5px 10px 0px 0px;
`;

export const icon_img = css`
  height: 35px;
  width: 35px;
  margin: 10px;
  // padding-bottom: 15px;
  @media (max-width: 576px) {
    margin-left: 0px;
  }
`;

export const country_picker = css`
  border: 2px solid white;
  color: black;
  font-size: 12px;
  padding-left: 10px;
  margin: auto;
  width: 100%;
  background-color: transparent;
  font-weight: 500;
  height: 30px;
`;
export const already_container = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: white;
  @media (max-width: 576px) {
    font-size: 10px;
  }
`;
export const require_container = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: white;
  border-top: 1px solid white;
  padding: 3px;
  @media (max-width: 576px) {
    border: none;
    font-size: 10px;
  }
`;
export const lower_inputs = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
`;
export const container = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 1.5px solid #fff;

  @media (max-width: 576px) {
    border: none;
    width: 80%;
  }
`;

export const container_mail_confirmation = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
