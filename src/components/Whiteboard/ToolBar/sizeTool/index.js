import React, { useState, useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { size_container_styles, size_dots_styles } from './styles';
/** Load svg icons */
import { ReactComponent as SizeBlack } from 'assets/whiteboard/black/size-black.svg';
import { ReactComponent as SizeGrey } from 'assets/whiteboard/grey/size-grey.svg';
import { ReactComponent as SizeWhite } from 'assets/whiteboard/white/size-white.svg';

import styles from './pencilSizes.module.scss';

import { whiteBoardContext } from '../../WhiteBoardProvider';
import ToolIcon from '../ToolIcon';
import { Sizes } from '../../../../enums/whiteBoard.enum';
import { TOOLS } from '../../../../enums/whiteBoard.enum';
import { ICONS_COLORS } from '../../../../enums/constants.enum';

//component
const Size = ({ color, toggleSizeBar }) => {
  if (color === ICONS_COLORS.BLACK) {
    return <SizeBlack className="icon-tool" onClick={toggleSizeBar} />;
  } else if (color === ICONS_COLORS.GREY) {
    return <SizeGrey className="icon-tool" onClick={toggleSizeBar} />;
  } else {
    return <SizeWhite className="icon-tool" onClick={toggleSizeBar} />;
  }
};

const SizeTool = ({ color }) => {
  const { setSize, sizeBarOpen, toggleSizeBar } = useContext(whiteBoardContext);
  const sizeBar = (
    <div css={size_dots_styles}>
      <button
        className={`${styles.circles} ${styles.circleOne}`}
        onClick={() => setSizeHandler(Sizes.SIZE_1)}
      ></button>
      <button
        className={`${styles.circles} ${styles.circleTwo}`}
        onClick={() => setSizeHandler(Sizes.SIZE_2)}
      ></button>
      <button
        className={`${styles.circles} ${styles.circleThree}`}
        onClick={() => setSizeHandler(Sizes.SIZE_3)}
      ></button>
      <button
        className={`${styles.circles} ${styles.circleFour}`}
        onClick={() => setSizeHandler(Sizes.SIZE_4)}
      ></button>
      <button
        className={`${styles.circles} ${styles.circleFive}`}
        onClick={() => setSizeHandler(Sizes.SIZE_5)}
      ></button>
      <button
        className={`${styles.circles} ${styles.circleSix}`}
        onClick={() => setSizeHandler(Sizes.SIZE_6)}
      ></button>
      <button
        className={`${styles.circles} ${styles.circleSeven}`}
        onClick={() => setSizeHandler(Sizes.SIZE_7)}
      ></button>
      <button
        className={`${styles.circles} ${styles.circleEight}`}
        onClick={() => setSizeHandler(Sizes.SIZE_8)}
      ></button>
    </div>
  );

  const setSizeHandler = size => {
    setSize(size);
    toggleSizeBar();
  };

  return (
    <ToolIcon toolType={TOOLS.SIZE_TOOL}>
      <div css={size_container_styles}>
        <Size toggleSizeBar={toggleSizeBar} color={color} />
        {sizeBarOpen && sizeBar}
      </div>
    </ToolIcon>
  );
};

export default SizeTool;
