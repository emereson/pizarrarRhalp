import { css } from '@emotion/react';

export const confirmation_area_container = css`
  display: flex;
  jutify-content: space-between;
  background-color: rgba(251, 251, 251, 0.38);
  width: 100%;
  @media (max-width: 576px) {
    flex-direction: column;
    max-width: 74vw;
  }
`;
export const confirmation_text_container = css`
  display: flex;
  padding-left: 10px;
  align-items: center;
  flex: 0.3;
`;
export const confirmation_text = css`
  font-size: 1.1rem;
  margin: 0px;
`;
export const crystal_text = css`
  ::-webkit-input-placeholder {
    /* Chrome */
    color: rgb(27, 28, 31);
  }
  border: none;
  color: black;
  font-size: 1.1rem;
  -ms-flex: 0.7;
  flex: 0.7;
  padding-left: 10px;
  margin: 0px;
  background-color: transparent;
  font-weight: 500;
  width: 618px;
  max-height: 2.7vh;
  margin-top: 5px;
  @media (max-width: 576px) {
    flex-direction: column;
    max-width: 70vw;
  }
`;
export const checkbox = css`
  .checkboxFive {
    width: 25px;
    margin: 20px 100px;
    position: relative;
  }
  .checkboxFive label {
    cursor: pointer;
    position: absolute;
    width: 25px;
    height: 25px;
    top: 0;
    left: 0;
    background: #eee;
    border: 1px solid #ddd;
  }
  .checkboxFive label:after {
    opacity: 0.2;
    content: '';
    position: absolute;
    width: 9px;
    height: 5px;
    background: transparent;
    top: 6px;
    left: 7px;
    border: 3px solid #333;
    border-top: none;
    border-right: none;

    transform: rotate(-45deg);
  }
  .checkboxFive label:hover::after {
    opacity: 0.5;
  }

  .checkboxFive input[type='checkbox']:checked + label:after {
    opacity: 1;
  }
`;
