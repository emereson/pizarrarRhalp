import { css } from '@emotion/core';
import mobile from 'assets/background/mobile.jpeg';

export const app = css`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  font-family: 'Open Sans', sans-serif !important;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media only screen and (max-width: 500px) and (min-width: 341px) {
    background: url(${mobile}) no-repeat fixed;
    background-size: cover;
  }

  @media only screen and (max-width: 340px) and (min-width: 5px) {
    background: url(${mobile}) no-repeat fixed;
    background-size: cover;
  }
`;

export const crystal = chatVisible => css`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  background-color: ${chatVisible ? 'rgba(0,0,0,.26)' : 'rgba(0,0,0,.1)'};
  transition: background-color 1s;
  border: 1px solid #fff;
  box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.55) inset;
  overflow-y: scroll;
  overflow-x: scroll;
  box-sizing: border-box;
  min-height: 550px;
  @media only screen and (min-width: 1200px) {
    overflow: hidden;
  }
  @media (max-width: 576px) {
    width: 100%;
    left: 0%;
  }
  @media screen and (min-width: 320px) and (max-width: 480px) {
    top: 5%;
    left: 5%;
    padding: 0px 0px;
    width: 90%;
    height: 90%;
    box-sizing: border-box;
    background-color: ${chatVisible ? 'rgba(0,0,0,.26)' : 'rgba(0,0,0,.1)'};
    overflow: scroll;
  }
`;

export const wbStyles = css`
  width: 100%;
  height: 100%;
  background: none;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid #fff;
  box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.55) inset;
  overflow: auto;
`;

export const title_text = css`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 200;
  line-height: 1.2;

  @media (max-width: 750px) {
    width: 100%;
    font-size: 1.3rem;
    text-align: center;
  }
`;

export const footer = css`
  display: flex;
  position:relative;
  flex: 0.2;
  // background-color: rgba(49,136,223,0.4);
  align-items: center;
  // margin: 20px 30px 1px 30px;
  max-height: 10vh;
  min-height: 10vh;
  @media (max-width: 576px) {
    max-width: 100%;
    // margin: 5px;
    flex-direction: row;
    min-height: 11vh;
    max-height: 11vh;
  }

  @media (max-height: 576px) {
    // margin-top: 4px;
  }
}
`;

export const confirmation_area_text_container = css`
  display: flex;
  flex: 0.07;
  margin: 0px 30px 0px 30px;
  @media (max-width: 576px) {
    flex-direction: column;
    max-width: 74vw;
  }
`;
