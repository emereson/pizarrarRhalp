import { css } from '@emotion/react';

export const time_picker_wrapper = css`
  margin: 10px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const time_border = css`
  border: 1px solid white;
`;

export const time_text = css`
  color: white;
  margin: 4px;
`;

export const arrow_up = css`
  cursor: pointer;
  box-sizing: border-box;
  height: 1vw;
  width: 1vw;
  border-style: solid;
  border-color: white;
  border-width: 0px 1px 1px 0px;
  -webkit-transform: rotate(225deg);
  -ms-transform: rotate(225deg);
  transform: rotate(225deg);
  -webkit-transition: border-width 150ms ease-in-out;
  transition: border-width 150ms ease-in-out;

  hover {
    border-bottom-width: 4px;
    border-right-width: 4px;
  }
`;

export const arrow_down = css`
  cursor: pointer;
  box-sizing: border-box;
  height: 1vw;
  width: 1vw;
  border-style: solid;
  border-color: white;
  border-width: 0px 1px 1px 0px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition: border-width 150ms ease-in-out;
  transition: border-width 150ms ease-in-out;

  hover {
    border-bottom-width: 4px;
    border-right-width: 4px;
  }
`;

export const react_time_picker = withborder => css`
  .rc-time-picker-clear {
    display: none;
    position: absolute;
  }

  .rc-time-picker-clear-icon {
    display: none;
    position: absolute;
  }

  .rc-time-picker-input {
    height: 30px;
    border: none;
    color: white;
    font-size: 12px;
    text-align: center;
    padding: 0px;
    width: 85%;
    border: ${withborder ? '1px solid white' : 'none'};
    margin-top: 5px;
    border-radius: 0px;
    // padding-left: 0px;
    // margin: auto;
    max-width: 70px;
    background-color: transparent;
    font-weight: 500;
  }
`;
