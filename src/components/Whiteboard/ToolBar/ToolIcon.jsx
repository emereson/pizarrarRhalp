import React, { useContext } from 'react';
import { whiteBoardContext } from '../WhiteBoardProvider';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { TOOLS } from '../../../enums/whiteBoard.enum';

let secondClick = false;

const ToolIcon = ({ toolType, children, parentClickHandler, otherToolType }) => {
  const {
    selectedTool,
    onChangeTool,
    setFilledCircle,
    setFilledSquare,
    isFilledSquare,
    isFilledCircle
  } = useContext(whiteBoardContext);
  const isSelected = () => toolType === selectedTool && secondClick === false;
  const isSelectedTwo = () =>
    (secondClick === true && toolType === selectedTool) || otherToolType === selectedTool;

  const SELECTED_HOVER_COLOR = 'rgba(255,255,0,0.5)';
  const SELECTED_OTHER_HOVER_COLOR = 'rgba(255,0,0,0.5)';

  const DRAW_TOOLS = [
    TOOLS.PENCIL,
    TOOLS.ERASER,
    TOOLS.TEXT,
    TOOLS.SIZE_TOOL,
    TOOLS.COLOR_TOOL,
    TOOLS.SQUARE,
    TOOLS.SEGMENT,
    TOOLS.POINTER,
    TOOLS.ARROW,
    TOOLS.CIRCLE,
    TOOLS.BUCKET,
    TOOLS.UNDO,
    TOOLS.REDO,
    TOOLS.TRANSPARENCY,
    TOOLS.TRASH,
    TOOLS.CURVED_ARROW,
    TOOLS.ZOOMIN,
    TOOLS.ZOOMOUT,
    TOOLS.HAND
  ];

  const NO_APPLY = [
    TOOLS.COLOR_TOOL,
    TOOLS.SIZE_TOOL,
    TOOLS.TRANSPARENCY,
    TOOLS.UNDO,
    TOOLS.REDO,
    TOOLS.TRASH
  ];

  const clickHandler = () => {
    outSecondClick(toolType);
    outFilledForms(toolType);
    onChangeTool(toolType);
    parentClickHandler && parentClickHandler();
  };

  const otherClickHandler = () => {
    if (toolType === TOOLS.CIRCLE) {
      secondClick = true;
      setFilledCircle(!isFilledCircle);
    }
    if (toolType === TOOLS.SQUARE) {
      secondClick = true;
      setFilledSquare(!isFilledSquare);
    }
    if (otherToolType !== undefined) {
      onChangeTool(otherToolType);
    } else {
      onChangeTool(toolType);
    }
    parentClickHandler && parentClickHandler();
  };

  const backgroundColor = () => {
    if (DRAW_TOOLS.includes(toolType)) {
      if (isSelected()) {
        return SELECTED_HOVER_COLOR;
      } else if (isSelectedTwo()) {
        return SELECTED_OTHER_HOVER_COLOR;
      }
      return '';
    }
  };

  const hoverColor = () => {
    if (DRAW_TOOLS.includes(toolType)) {
      return window.Modernizr.touchevents ? '' : SELECTED_HOVER_COLOR;
    } else {
      return '';
    }
  };

  const outFilledForms = toolType => {
    if (NO_APPLY.includes(toolType) === false && (isFilledCircle || isFilledSquare)) {
      setFilledCircle(false);
      setFilledSquare(false);
    }
  };

  const outSecondClick = toolType => {
    if (NO_APPLY.includes(toolType) === false) {
      secondClick = false;
    }
  };

  return (
    <li
      css={css`
        list-style: none;
        width: 30px;
        margin-bottom: 8px;
        background-color: ${backgroundColor()};
        &:hover {
          background-color: ${hoverColor()};
        }
        & > svg {
          background-color: ${backgroundColor()};
        }
      `}
      role="button"
      onClick={clickHandler}
      onDoubleClick={otherClickHandler}
    >
      {children}
    </li>
  );
};

export default React.memo(ToolIcon);
