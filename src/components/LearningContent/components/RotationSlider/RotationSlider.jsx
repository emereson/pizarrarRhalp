import { Button, Popper, Slider } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './RotationSlider.module.scss';
import { useCallback } from 'react';
import { Close } from '@material-ui/icons';
import { useEffect } from 'react';

export default function RotationSlider({
  defaultValue,
  updateFunction,
  open,
  closePopper
}) {
  const [Value, setValue] = useState(0);

  const onChange = useCallback(
    (e, newValue) => {
      setValue(newValue);
      updateFunction(`rotateZ(${newValue}deg)`);
    },
    [defaultValue]
  );

  useEffect(() => {
    try {
      const parsed = JSON.parse(defaultValue);
      if (parsed?.transform) {
        const value = parsed?.transform;
        setValue(parseInt(value.substring(value.indexOf('(') + 1, value.indexOf('deg'))));
      }
    } catch (error) {}
  }, [defaultValue]);

  const onChangeInput = e => {
    const val = e.target.value === '' ? 0 : e.target.value;
    setValue(val);
    onChange(null, val);
  };

  return (
    <Popper
      open={open}
      anchorEl={document.getElementById('setrotationdegrees')}
      placement="right"
      className={styles.popper}
    >
      <div className={styles.container}>
        <div
          className={styles.slidercontainer}
          style={{
            justifyContent: 'space-between',
            padding: '0 10px'
          }}
        >
          <div className={styles.inputContainer}>
            <p>Degrees: </p>
            <input
              className={styles.specificDegrees}
              type="number"
              onChange={onChangeInput}
              defaultValue={Value}
              maxLength={3}
              value={Value}
            />
          </div>
          <Close className={styles.icon} onClick={closePopper} color="primary" />
        </div>
        <div className={styles.slidercontainer}>
          <div className={styles.comp}>
            <Slider
              min={0}
              max={360}
              step={10}
              value={Value}
              aria-label="rotation"
              style={{ width: '100%' }}
              color="primary"
              onChange={onChange}
            />
          </div>
          <p>{Value} deg</p>
        </div>
      </div>
    </Popper>
  );
}
