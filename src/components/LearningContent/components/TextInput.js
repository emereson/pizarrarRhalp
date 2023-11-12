import React from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Rnd } from 'react-rnd';
import { useParams } from 'react-router-dom';
import useSlides from '../hooks/useSlides';
import parse from 'html-react-parser';
import SelectionComponent from './SelectionComponent/SelectionComponent';
import {
  EditorState,
  Editor,
  RichUtils,
  ContentState,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import { isJson } from '../functions/utils';

function TextInput({
  text, // text.text property now going to be a contentstate converted to raw
  styles,
  changeDraftText,
  changePositionFunction,
  updateDimentions,
  preventMoving,
  deleteFunction,
  NewText,
  setNewText,
  isEditing,
  isEditingfunct,
  AnchorPoint,
  parentId,
  setAnchorPoint
}) {
  const convertMeasuresInPX = useCallback(
    m => {
      const element = {
        x: document.getElementById(parentId)?.getBoundingClientRect().width,
        y: document.getElementById(parentId)?.getBoundingClientRect().height
      };

      let xMeasure = m?.x;
      let yMeasure = m?.y;

      if (typeof xMeasure === 'string') xMeasure = Number(xMeasure);
      if (typeof yMeasure === 'string') yMeasure = Number(yMeasure);

      const results = {
        x: (xMeasure / 100) * element.x,
        y: (yMeasure / 100) * element.y
      };

      return results;
    },
    [parentId, text]
  );

  const [Dimentions, setDimentions] = useState({
    x: text.x || 10,
    y: text.y || 10,
    width: text.width || 30,
    height: text.height || 20
  });
  const { slideId } = useParams();
  const { deleteSlideText } = useSlides(slideId);
  const [Hover, setHover] = useState(false);
  const [positionsP, setPositionsP] = useState({
    x:
      typeof Dimentions.x === 'string'
        ? parseFloat(Dimentions.x).toFixed(20)
        : Dimentions.x,
    y:
      typeof Dimentions.y === 'string'
        ? parseFloat(Dimentions.y).toFixed(20)
        : Dimentions.y
  });
  const dimentionsP = {
    x:
      typeof Dimentions.width === 'string'
        ? parseFloat(Dimentions.width).toFixed(20)
        : Dimentions.width,
    y:
      typeof Dimentions.height === 'string'
        ? parseFloat(Dimentions.height).toFixed(20)
        : Dimentions.height
  };

  const returnEditorStateType = useCallback(() => {
    if (isJson(text?.text)) {
      const contentState = convertFromRaw(JSON.parse(text?.text));
      if (contentState) return EditorState.createWithContent(contentState);
      else return EditorState.createEmpty();
    } else {
      return EditorState.createEmpty();
    }
  }, [text]);

  const getFontSizeScaleinPx = scale => {
    const parent = document.getElementById(parentId)?.getBoundingClientRect();
    const defaultParentContainer = document
      .getElementById('real-slide-container-editing')
      ?.getBoundingClientRect();
    const defaultValueinPercentage = (14 / defaultParentContainer?.height) * 100;
    if (!scale) return (defaultValueinPercentage / 100) * parent?.height;
    return (scale / 100) * parent?.height;
  };

  const parseStyles = () => {
    let styles = {};
    if (isJson(text.styles)) styles = JSON.parse(text.styles);
    styles = {
      ...styles,
      fontSize: getFontSizeScaleinPx(styles?.fontSize?.scale)
    };

    return styles;
  };

  const [editorState, seteditornewState] = useState(returnEditorStateType());

  const styleMap = {
    color: 'red'
  };

  const seteditorState = useCallback(
    newstate => {
      seteditornewState(newstate);
      const convertedContentStateToRaw = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      changeDraftText(null, {
        ...text,
        text: convertedContentStateToRaw
      });
    },
    [editorState, text]
  );

  const handleKeyCommands = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      seteditorState(newState);
      return 'handled';
    }
    return 'fail';
  };

  const handleDeleteText = () => {
    setAnchorPoint({ anchor: null });
    if (text.learningContentSlideTextsId) {
      deleteSlideText({ variables: { id: text.id } }).then(d => {
        deleteFunction('text', text);
      });
    } else deleteFunction('text', text);
  };

  const handleDrag = (e, d) => {
    let rect = d.node.parentElement.getBoundingClientRect();
    let limitX = d.node.parentElement.offsetWidth;
    let limitY = d.node.parentElement.offsetHeight;
    const x = e.clientX - rect.left - d.node.offsetWidth / 2;
    const y = e.clientY - rect.top - d.node.offsetHeight / 2;
    // % conversions
    const measuresInPercentages = {
      x: (d.x / limitX) * 100,
      y: (d.y / limitY) * 100
    };
    if (x < -50 || y < -50 || x > limitX || y > limitY)
      setDimentions({ ...Dimentions, x: 0, y: 0 });
    else {
      const newstate = {
        x: measuresInPercentages.x,
        y: measuresInPercentages.y
      };
      setDimentions({
        ...Dimentions,
        ...newstate
      });
      setPositionsP(newstate);
    }
  };

  const handleContextMenu = e => {
    e.preventDefault();
    setAnchorPoint({ anchor: null });
    if (window.innerWidth > 750)
      setAnchorPoint({ anchor: e.target, type: 'text', item: text });
  };

  useEffect(() => {
    if (Dimentions) {
      changeDraftText(null, text, Dimentions);
    }
  }, [Dimentions]);

  const handleResizing = (e, direction, ref, delta, position) => {
    const parentElement = document.getElementById(parentId).getBoundingClientRect();
    let limitX = parentElement.width;
    let limitY = parentElement.height;
    const positionInPercentage = {
      x: (position.x / limitX) * 100,
      y: (position.y / limitY) * 100
    };
    const measuresInPercentages = {
      width: (ref.offsetWidth / limitX) * 100,
      height: (ref.offsetHeight / limitY) * 100
    };
    setDimentions({
      ...measuresInPercentages,
      ...positionInPercentage
    });
    changeDraftText(e, {
      ...positionInPercentage,
      ...text,
      ...measuresInPercentages
    });
  };

  const handleInputFocused = () => {
    isEditingfunct({
      ...text,
      editorChange: seteditorState,
      editorState
    });
  };

  useEffect(() => {
    if (NewText && text?.text === '') {
      handleInputFocused();
      setNewText(false);
    }
  }, [NewText, text]);

  const refreshStates = () => {
    setHover(true);
    setHover(false);
  };

  const refreshPositionP = useCallback(() => {
    let x = text.x;
    let y = text.y;
    if (x === 'NaN') x = 10;
    if (y === 'NaN') y = 10;
    if (typeof x === 'string') Number(parseFloat(x).toFixed(20));
    if (typeof y === 'string') Number(parseFloat(y).toFixed(20));
    const newstate = { x, y };
    setPositionsP(newstate);
  }, [text.x, text.y]);

  useEffect(() => {
    if (
      !preventMoving &&
      ((isNaN(convertMeasuresInPX(positionsP).x) &&
        isNaN(convertMeasuresInPX(positionsP).y)) ||
        (text.x === 'NaN' && text.y === 'NaN'))
    ) {
      refreshPositionP();
    }
  }, []);

  useEffect(() => {
    let doit;
    const func = () => {
      clearTimeout(doit);
      doit = setTimeout(refreshStates, 100);
    };

    window.addEventListener('resize', func);

    return () => {
      window.removeEventListener('resize', func);
    };
  }, []);

  const updatePreventMovingTextState = text => {
    try {
      seteditornewState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(text?.text)))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (preventMoving) {
      updatePreventMovingTextState(text);
    }
  }, [preventMoving, text]);

  if (preventMoving) {
    const positionsP = {
      x: text.x
        ? typeof text.x === 'string'
          ? parseFloat(text.x).toFixed(20)
          : text.x
        : typeof Dimentions.x === 'string'
        ? parseFloat(Dimentions.x).toFixed(20)
        : Dimentions.x,
      y: text.y
        ? typeof text.y === 'string'
          ? parseFloat(text.y).toFixed(20)
          : text.y
        : typeof Dimentions.y === 'string'
        ? parseFloat(Dimentions.y).toFixed(20)
        : Dimentions.y
    };
    const dimentionsP = {
      x: text.width
        ? typeof text.width === 'string'
          ? parseFloat(text.width).toFixed(20)
          : text.width
        : typeof Dimentions.width === 'string'
        ? parseFloat(Dimentions.width).toFixed(20)
        : Dimentions.width,
      y: text.height
        ? typeof text.height === 'string'
          ? parseFloat(text.height).toFixed(20)
          : text.height
        : typeof Dimentions.height === 'string'
        ? parseFloat(Dimentions.height).toFixed(20)
        : Dimentions.height
    };

    return (
      <div
        style={{
          ...parseStyles(),
          width: convertMeasuresInPX(dimentionsP).x,
          height: convertMeasuresInPX(dimentionsP).y,
          position: 'absolute',
          top: convertMeasuresInPX(positionsP).y,
          left: convertMeasuresInPX(positionsP).x,
          overflowY: 'hidden',
          transition: 'all ease 200ms'
        }}
      >
        <Editor editorState={editorState} readOnly />
      </div>
    );
  }

  if (
    !preventMoving &&
    !isNaN(convertMeasuresInPX(positionsP).x) &&
    !isNaN(convertMeasuresInPX(positionsP).y)
  ) {
    return (
      <>
        <Rnd
          size={{
            width: convertMeasuresInPX(dimentionsP).x
            // height: convertMeasuresInPX(dimentionsP).y
          }}
          position={{
            x: convertMeasuresInPX(positionsP).x,
            y: convertMeasuresInPX(positionsP).y
          }}
          onDragStop={handleDrag}
          onResize={handleResizing}
          disableDragging={isEditing}
          className={
            !isEditing
              ? styles.textContainer
              : [styles.textContainer, styles.textContainer__remarked].join(' ')
          }
        >
          <div
            style={{ width: '100%', height: '100%' }}
            className={styles.remarkThis}
            onContextMenu={handleContextMenu}
            onDoubleClick={handleInputFocused}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {/* leave this in comments because we dont know if this gonna be useful */}
            {Hover && (
              <>
                <div className={styles.verticalDots} style={{ left: -11, top: -5 }}>
                  {/* <div className={styles.grabDot}></div>
                      <div className={styles.grabDot}></div>
                      <div className={styles.grabDot}></div> */}
                </div>
                <div className={styles.verticalDots} style={{ right: -11, top: -5 }}>
                  {/* <div className={styles.grabDot}></div>
                      <div className={styles.grabDot}></div>
                      <div className={styles.grabDot}></div> */}
                </div>
                <div className={styles.horizontalDots} style={{ left: 0, top: -5 }}>
                  {/* <div className={styles.grabDot}></div> */}
                </div>
                <div className={styles.horizontalDots} style={{ left: 0, bottom: -5 }}>
                  {/* <div className={styles.grabDot}></div> */}
                </div>
              </>
            )}
            <div
              className={styles.textTag}
              id={text.id}
              style={{
                ...parseStyles()
              }}
            >
              <Editor
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={handleKeyCommands}
                onChange={seteditorState}
                readOnly={!isEditing}
                placeholder="Insert Text (click below this text)..."
              />
            </div>
          </div>
        </Rnd>
      </>
    );
  }

  return <></>;
}

export default React.memo(TextInput);
