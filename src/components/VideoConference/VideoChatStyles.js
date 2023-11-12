/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

export const participantContent = model => css`
  position: relative;
  top: 0;
  left: 0;
  height: ${model ? '90vh' : '100vh'};
  display: flex;
  overflow: hidden;
  justify-content: flex-end;
  align-items: flex-start;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: transparent;

  @media (min-width: 481px) and (max-width: 1024px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    padding-top: 30px;
  }

  @media screen and (min-width: 366px) and (max-width: 480px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    padding-top: 0px;
    height: ${model ? '100%' : '100vh'};
  }

  @media (max-width: 365px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    padding-top: 0px;
    height: ${model ? '100%' : '100vh'};
  }
`;

export const participantStyleModern = (width, height, margin) => css`
  width: ${width};
  height: ${height};
  display: flex;
  align-items: flex-end;
  border-radius: 10px;
  overflow: hidden;

  z-index: ${(width === '90%') | (width === '396px') | (width === '594px')
    ? '99'
    : '100'};
  cursor: grab;
  margin-top: ${margin ? '40px' : '0px'};
  margin-right: ${margin ? '12px' : '0px'};

  :last-child {
    margin-left: 0px;
  }
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
  :hover > div {
    opacity: 1;
    visibility: visible;
  }

  @media screen and (min-width: 366px) and (max-width: 480px) {
    width: ${width === '90%' ? '100%' : '155px'};
    height: ${height === '90%' ? '100%' : '135px'};
    position: ${width === '90%' && 'absolute'};
    top: ${width === '90%' && '0'};
    left: ${width === '90%' && '0'};
    transform: ${width === '90%' && 'translate(0px,0px) !important'};

    transition: all 500ms ease-out;

    margin-top: ${margin && '0px'};
    margin-bottom: ${margin ? '0px' : '5px'};
    margin: ${width === '90%' && '0px !important'};
    z-index: ${(width === '90%') | (height === '90%') ? '60' : '100'};
    :first-of-type {
      margin-top: ${margin ? '30px' : '0px'};
    }
  }

  @media (max-width: 365px) {
    width: ${width === '90%' ? '100%' : '155px'};
    height: ${height === '90%' ? '100%' : '135px'};
    position: ${width === '90%' && 'absolute'};
    top: ${width === '90%' && '0'};
    left: ${width === '90%' && '0'};
    transform: ${width === '90%' && 'translate(0,0)'};
    transition: all 500ms ease-out;
    margin-top: ${margin && '0px'};
    margin-bottom: ${margin ? '0px' : '5px'};
    margin: ${width === '90%' && '0px !important'};
    z-index: ${(width === '90%') | (height === '90%') ? '60' : '100'};
    :first-of-type {
      margin-top: ${margin ? '30px' : '0px'};
    }
  }
`;

export const participantStyleClasic = (width, height, margin) => css`
  width: ${width};
  height: ${height};
  display: flex;
  align-items: flex-end;
  border-radius: 10px;
  overflow: hidden;

  z-index: ${(width === '90%') | (width === '396px') | (width === '594px')
    ? '99'
    : '100'};
  cursor: grab;
  margin-top: ${margin ? '40px' : '0px'};
  margin-right: ${margin ? '12px' : '0px'};

  :last-child {
    margin-left: 0px;
  }
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
  :hover > div {
    opacity: 1;
    visibility: visible;
  }

  @media screen and (min-width: 366px) and (max-width: 480px) {
    width: ${width === '90%' ? '100%' : '155px'};
    height: ${height === '90%' ? '100%' : '135px'};
    position: ${width === '90%' && 'absolute'};
    top: ${width === '90%' && '0'};
    left: ${width === '90%' && '0'};
    transform: ${width === '90%' && 'translate(0,0)'};
    transition: all 500ms ease-out;
    margin-top: ${margin && '0px'};
    margin-bottom: ${margin ? '0px' : '5px'};
    margin: ${width === '90%' && '0px !important'};
    z-index: ${(width === '90%') | (height === '90%') ? '60' : '100'};
    :first-of-type {
      mmargin-top: ${margin ? '30px' : '0px'};
    }
  }

  @media (max-width: 365px) {
    width: ${width === '90%' ? '100%' : '155px'};
    height: ${height === '90%' ? '100%' : '135px'};
    position: ${width === '90%' && 'absolute'};
    top: ${width === '90%' && '0'};
    left: ${width === '90%' && '0'};
    transform: ${width === '90%' && 'translate(0,0)'};
    transition: all 500ms ease-out;
    margin-top: ${margin && '0px'};
    margin-bottom: ${margin ? '0px' : '5px'};
    margin: ${width === '90%' && '0px !important'};
    z-index: ${(width === '90%') | (height === '90%') ? '60' : '100'};
    :first-of-type {
      margin-top: ${margin ? '30px' : '0px'};
    }
  }
`;

export const translate = css`
  transform: translate(0px, 0px);
`;

export const optionVideoStyle = movilWidth => css`
  height: 30px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  padding-bottom: 6px;
  padding-left: 3px;
  padding-right: 7px;
  background-color: rgba(7, 7, 7, 0.13);
  opacity: 0;
  visibility: hidden;
  transition: all 500ms ease-out;

  > a {
    cursor: pointer;
    outline: 0;
  }

  @media screen and (min-width: 366px) and (max-width: 480px) {
    justify-content: space-between;
    bottom: ${movilWidth === '90%' && '80px'};
    height: 50px;
    opacity: 1;
    visibility: visible;
    background-color: transparent;
    > a {
      cursor: pointer;
      outline: 0;
    }
  }

  @media (max-width: 365px) {
    justify-content: space-between;
    bottom: ${movilWidth === '90%' && '80px'};
    height: 50px;
    opacity: 1;
    visibility: visible;
    background-color: transparent;
    > a {
      cursor: pointer;
      outline: 0;
    }
  }
`;

export const optionBtnStyle = css`
  background-color: transparent;
  border: none;
  text-align: center;
  cursor: pointer !important;

  :focus {
    outline: 0;
  }

  > img.icon-option {
    width: 25px;
    height: 20px;
    display: block;
    cursor: pointer;
  }
  :nth-of-type(6) {
    display: none;
  }

  @media screen and (min-width: 366px) and (max-width: 480px) {
    > img.icon-option {
      width: 25px;
      height: 20px;
      display: block;
      cursor: pointer;
    }

    :nth-of-type(4) {
      display: none;
    }
    :nth-of-type(5) {
      display: none;
    }

    :nth-of-type(6) {
      display: block;
    }
  }

  @media (max-width: 365px) {
    :nth-of-type(4) {
      display: none;
    }
    :nth-of-type(5) {
      display: none;
    }

    :nth-of-type(6) {
      display: block;
    }

    > img.icon-option {
      width: 25px;
      height: 20px;
      display: block;
      cursor: pointer;
    }
  }
`;
