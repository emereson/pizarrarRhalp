import React, { Fragment, useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { Modal } from '@material-ui/core';

const DraggableItem = ({
  type,
  payload,
  children,
  className,
  enableOSdragging,
  disableOSdragging,
  onDragging,
  onDraggingEnd,
  responsiveDragFeedback,
  containerPercentHeight,
  ListenNativeEvents
}) => {
  const [collectedProps, dragRef, previewRef] = useDrag({
    type: type,
    item: { type: type, payload },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [hideElement, sethideElement] = useState(null);

  const styles = css`
    cursor: grab;
  `;

  const getVerticalMargins = () => {
    // this is user for calculate the percent in pixels of the spacing that comes from the modal centered positioning
    if (containerPercentHeight) {
      return (
        ((100 -
          parseInt(
            parseFloat((containerPercentHeight() / window.innerHeight) * 100).toFixed()
          )) /
          2 /
          100) *
        window.innerHeight
      );
    }
  };

  return (
    <Fragment>
      <div
        ref={dragRef}
        id={payload?.id}
        style={{ opacity: hideElement ? 0 : 1 }}
        onTouchMove={e => {
          if (ListenNativeEvents) {
            if (responsiveDragFeedback)
              sethideElement({ x: e.touches[0].clientX, y: e.touches[0].clientY });
          }
        }}
        onTouchEnd={() => {
          if (ListenNativeEvents) {
            if (responsiveDragFeedback) sethideElement(null);
          }
        }}
        onDragStart={() => {
          if (onDragging) onDragging();
        }}
        onDrag={e => {
          if (ListenNativeEvents) {
            disableOSdragging();
            if (responsiveDragFeedback) sethideElement({ x: e.clientX, y: e.clientY });
          }
        }}
        onDragEnd={() => {
          if (ListenNativeEvents) {
            sethideElement(null);
            enableOSdragging();
            if (onDraggingEnd) onDraggingEnd();
            if (responsiveDragFeedback) sethideElement(null);
          }
        }}
        className={className}
        css={styles}
      >
        {children}
      </div>
      {hideElement && window.innerWidth < 750 && responsiveDragFeedback && (
        <div
          className="dragging-element"
          style={{
            width: document.getElementById(payload.id)?.offsetWidth,
            top: hideElement?.y - (getVerticalMargins() + 30),
            left: hideElement?.x - 110
          }}
        >
          {children}
        </div>
      )}
    </Fragment>
  );
};

export default DraggableItem;
