/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { jsx, css } from '@emotion/react';

export const studyDocumentContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 20px auto;
  width: 95%;
  height: 86%;
  z-index: 9999;
  display: flex;
  flex-wrap: wrap;
  padding: 0px;
`;

export const itemLists = length => css`
  width: 12%;
  height: 100%;
  padding: 0px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  overflow-y: ${length > 4 && 'scroll'};
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 425px) {
    width: 15%;
    height: 70%;
    margin: 0px auto;
  }

  @media (max-width: 320px) {
    width: 15%;
    height: 70%;
    margin: 0px auto;
  }
`;

export const miniatura = css`
  width: 100%;
  min-height: 15%;
  max-height: 15%;
  display: flex;
  position: relative;
  margin-bottom: 10px;
`;

export const miniaturaItemIz = css`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-weight: bold;
  color: white;
  margin: 0px;
  padding: 0px;

  @media (max-width: 425px) {
    font-size: 10px;
    margin-right: 3px;
  }

  @media (max-width: 320px) {
    font-size: 10px;
    margin-right: 3px;
  }
`;

export const miniaturaItemD = selected => css`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b8cfd3;
  position: relative;
  margin-bottom: 10px;
  overflow: hidden;
  img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    object-fit: fill;
    object-position: center center;
  }

  border: ${selected && '1px solid tomato'};

  @media (max-width: 425px) {
    width: 86%;
    height: 80%;
  }

  @media (max-width: 320px) {
    width: 86%;
    height: 80%;
  }
`;

export const preview = selected => css`
  width: 86%;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: ${selected && '#b8cfd3'};
  position: relative;
  span {
    font-size: 10px;
    font-weight: bold;
    position: absolute;
    top: 5px;
    left: 3px;
    margin-bottom: 10px;
    color: white;
  }

  img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    object-fit: fill;
    object-position: center center;
  }

  div {
    position: absolute;
    bottom: 10px;
    left: 0px;
    display: flex;
    width: 100%;
    padding: 0px 10px;
    justify-content: space-between;
  }

  @media (max-width: 740px) and (orientation: landscape) {
    width: 83%;
    height: 80%;
    margin: 0;
  }

  @media (max-width: 640px) and (orientation: landscape) {
    width: 83%;
    height: 80%;
    margin: 0;
  }

  @media (max-width: 425px) {
    width: 83%;
    height: 70%;
    margin: 0;
  }

  @media (max-width: 320px) {
    width: 83%;
    height: 70%;
    margin: 0;
  }
`;

export const btnList = css`
  width: 100%;
  display: flex;
  margin: 3px 3px 3px 18px;
`;

export const btn = css`
  border: 1px solid #fff;
  margin: 3px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: transparent;
  justify-content: center;
  color: white;
`;

export const btnDelete = css`
  position: absolute;
  top: 2px;
  left: 5px;
  width: 15px;
  height: 25px;
  cursor: pointer;
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
`;

export const levelTitle = css`
  text-align: center;
  width: 100%;
  height: 50px;
  font-weight: bold;
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
`;

export const textareaStyle = css`
  width: 97%;
  height: 85%;
  margin: 20px auto 4px auto;
  border: 1px dotted;
  font-size: 100%;
  background-color: transparent;

  @media (max-width: 740px) and (orientation: landscape) {
    height: 65%;
  }

  @media (max-width: 640px) and (orientation: landscape) {
    height: 65%;
  }

  @media (max-width: 425px) {
    height: 80%;
  }

  @media (max-width: 320px) {
    height: 80%;
  }
`;
