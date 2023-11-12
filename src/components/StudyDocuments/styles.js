/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { jsx, css } from '@emotion/react';

export const studyDocumentContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 90%;
  height: 580px;
  z-index: 9999;

  @media (max-width: 425px) {
    height: 380px;
  }

  @media (max-width: 320px) {
    height: 380px;
  }
`;

export const studySliderContentImg = css`
  width: 100%;
  height: 100%;
`;

export const studyImgStyle = css`
  width: 100%;
  height: 580px !important;
  object-fit: fill;
  object-position: center center;
`;

export const studyButtonStyle = css`
  border: 1px solid #000;
  position: absolute;
  width: 30px;
  height: 30px;
  background: rgb(189, 186, 186);
  color: #ffff;
  bottom: 0;
  right: 0 !important;
  cursor: pointer;
  margin-right: -33px !important;
`;

export const studyDocumentContainerLevel = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 80%;
  height: 80%;
  z-index: 9999;
  display: flex;
  flex-wrap: wrap;
  padding: 0px;
`;

export const levelContainer = css`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const levelItem = css`
  width: 50px;
  height: 50px;
  margin: auto;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-weight: bold;
  }
`;

export const levelSpan = css`
  padding: 8px 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  background-color: #b8cfd3;
  justify-content: center;

  h1 {
    font-weight: bold;
  }

  @media (max-width: 425px) {
    padding: 2px 12px;
    border-radius: 100%;
    margin: 1px;
  }

  @media (max-width: 320px) {
    padding: 2px 12px;
    border-radius: 100%;
    margin: 1px;
  }
`;

export const levelTitle = css`
  text-align: center;
  width: 100%;
  height: 50px;
  font-weight: bold;

  @media (max-width: 425px) {
    font-size: 16px;
  }

  @media (max-width: 320px) {
    font-size: 16px;
  }
`;

export const levelDoc = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  p {
    font-size: 16px;
    font-weight: bold;
    width: 30%;
    margin-top: 10px;
  }

  @media (max-width: 740px) and (orientation: landscape) {
    p {
      font-size: 12px;
      width: 100%;
    }
  }

  @media (max-width: 640px) and (orientation: landscape) {
    p {
      font-size: 12px;
      width: 100%;
    }
  }

  @media (max-width: 425px) {
    p {
      font-size: 12px;
      width: 100%;
    }
  }

  @media (max-width: 320px) {
    p {
      font-size: 12px;
      width: 100%;
    }
  }
`;

export const textareaStyle = css`
  width: 97%;
  height: 85%;
  margin: 20px auto 4px auto;
  border: 1px dotted;
  font-size: 100%;
  background-color: transparent;
`;

export const numPageMin = css`
  font-size: 80%;
  position: absolute;
  top: 2px;
  left: 5px;
  font-weight: bold;
`;
