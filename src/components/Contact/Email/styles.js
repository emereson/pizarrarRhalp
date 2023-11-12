import { css } from '@emotion/react';

export const section = css`
  display: flex;
  align-items: center;
`;

export const user_info_container = css`
  width: 90%;
  margin: 0px auto 6px auto;
  display: flex;
  justify-content: space-between;
  background-color: rgba(84, 110, 255, 0.23);
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const label = css`
  color: #fff;
  font-weight: 400;
  margin-left: 10px;
`;

export const input = css`
  font-size: 18px;
  font-family: Roboto, sans-serif;
  background-color: transparent;
  border: 0;
  height: 40px;

  margin-right: 18px;
  color: white;
  :focus {
    outline: none;
  }
  margin-left: 5px;
  @media screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`;

export const text_area = css`
  font-size: 18px;
  font-family: Roboto, sans-serif;
  background-color: transparent;
  border: 0;
  margin-right: 18px;
  color: white;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: white;
    font-size: 18px;
  }
  margin-left: 5px;
  width: 98%;
  min-height: 9rem;
  max-height: 20rem;
  @media screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
    ::placeholder {
      color: white;
      font-size: 12px;
    }
  }
`;

export const button_contanier = css`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

export const text_area_container = css`
  padding-top: 3px;
  padding-bottom: 4px;
  width: 90%;
  background-color: rgba(84, 110, 255, 0.23);
  margin: 0px auto;
  position: relative;
`;

export const email_success = css`
  font-size: 30px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 300;
  @media screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 18px;
  }
`;

export const inputError = css`
  border: 1px solid red;
  background-color: transparent;
  margin-right: 20px;
`;

export const text_area_error = css`
  border: 1px solid red;
  background-color: transparent;
  margin-right: 18px;
  width: 100%;
  margin-bottom: 20px;
`;

export const showPuntero = css`
  font-size: 18px;
  font-family: Roboto, sans-serif;
  display: block;
  position: absolute;
  top: 3px;
  left: 6px;
  color: #fff;

  animation-name: cursorP;
  animation-duration: 1s;
  animation-iteration-count: infinite;

  @keyframes cursorP {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @media screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 15px;
  }
`;
export const hiddePuntero = css`
  display: none;
`;
