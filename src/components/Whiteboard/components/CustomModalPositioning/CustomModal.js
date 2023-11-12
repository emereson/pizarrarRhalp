import React from 'react';
import styles from './CustomModal.module.scss';
import DropTarget from 'components/AdminDashboard/DropTarget';
import { DndProvider } from 'react-dnd';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; // or any other pipeline
import MultiBackend from 'react-dnd-multi-backend';
import { useRef } from 'react';
import { useState } from 'react';

export default function CustomModal({
  children,
  open,
  dismiss,
  typesOfDraggables,
  allowDropContext,
  width,
  height,
  callback = {}
}) {
  // this modal, will allow drop an item to his background to perform any action

  const handleDrop = item => {
    callback(item.payload);
  };

  if (open) {
    return (
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        {allowDropContext && (
          <DropTarget
            types={typesOfDraggables}
            handleDrop={handleDrop}
            className={styles.shadow}
            customOverStyle={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100vw',
              height: '100vh'
            }}
            inheritedFunction={dismiss}
          />
        )}
        <div className={styles.contentContainer} styles={{ width, height }}>
          {children}
        </div>
      </DndProvider>
    );
  }

  return <></>;
}
