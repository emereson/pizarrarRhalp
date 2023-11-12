import React, { Fragment, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

const DropTarget = ({
  types,
  className,
  children,
  handleDrop,
  isOverColor = '#28a745',
  customOverStyle,
  inheritedFunction
}) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: types,
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    }),
    drop: handleDrop
  });

  const styles = css`
    & * {
      background-color: ${isOver && !customOverStyle ? isOverColor : 'initial'};
      color: ${isOver ? 'white' : 'initial'};
    }
  `;

  return (
    <Fragment>
      <div
        ref={dropRef}
        css={styles}
        className={className}
        onClick={inheritedFunction}
        style={isOver ? customOverStyle : null}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default DropTarget;
