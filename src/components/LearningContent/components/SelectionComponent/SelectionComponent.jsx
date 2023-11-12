import React, { useEffect, useState } from 'react';
import styles from './SelectionComponent.module.scss';

export default function SelectionComponent({ FirstClickPosition }) {
  const [selectionCompDimentions, setselectionCompDimentions] = useState({
    x: 20,
    y: 20
  });

  const mouseEvents = {
    move: e => {
      console.log(e.clientX, e.clientY);
    }
  };

  useEffect(() => {
    console.log('mounted');
    window.addEventListener('mousemove', mouseEvents.move);
    return () => {
      window.removeEventListener('mousemove', mouseEvents.move);
    };
  }, []);

  return (
    <div
      className={styles.selectionBox}
      style={{
        top: FirstClickPosition.y,
        left: FirstClickPosition.x,
        width: selectionCompDimentions.x,
        height: selectionCompDimentions.y,
        userSelect: 'none'
      }}
    ></div>
  );
}
