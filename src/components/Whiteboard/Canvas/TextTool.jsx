import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
  Fragment
} from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
/** Cursor icons */
import { whiteBoardContext } from '../WhiteBoardProvider';
import { TOOLS } from '../../../enums/whiteBoard.enum';
import { v1 as uuidv1 } from 'uuid';
import { useWindowEvent } from '../../../hooks/useWindowEvent';
import * as Actions from '../../../store/actions/WhiteBoardActions';
import { bindActionCreators } from 'redux';
import { notifyDrawEvent, saveText } from '../../../store/actions/WhiteBoardActions';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { useUserClassRoom } from 'components/UserManagment/hooks/useUserClassRoom';
import { getStagePointerPosition } from './utils';

const INIT_TEXT_POS = { x: -400, y: -400 };
const INIT_TEXT_VALUE = '';
const fontFamily = 'Arial';

const TextTool = ({
  classRoomId,
  page,
  saveText,
  notifyDrawEvent,
  containerWidth,
  stageRef
}) => {
  const textAreRef = useRef();
  const { selectedTool, color, size, colorPaletteOpen, sizeBarOpen } =
    useContext(whiteBoardContext);
  const { isCrystalTheme } = useUserClassRoom();
  const [value, setValue] = useState('');
  const [position, setPosition] = useState(INIT_TEXT_POS);
  const [stagePosition, setStagePosition] = useState(INIT_TEXT_POS);
  const [width, setWidth] = useState(100);

  // Dynamically set the text input width based on its container witdh
  useEffect(() => {
    const newWitdh = containerWidth - position.x;
    setWidth(newWitdh);
  }, [containerWidth, position]);

  const resetPosition = useCallback(() => {
    setPosition(INIT_TEXT_POS);
  }, []);

  const resetValue = useCallback(() => {
    setValue(INIT_TEXT_VALUE);
  }, []);

  const fontSize = useCallback(() => {
    return size + 12;
  }, [size]);

  const saveValue = useCallback(() => {
    if (value !== '') {
      let textX = stagePosition.x;
      let textY = stagePosition.y;
      if (isCrystalTheme) {
        const stageRect = stageRef.current?.content.getBoundingClientRect();
        textX -= stageRect?.left;
        textY -= stageRect?.top;
      }
      const payload = {
        classRoomId,
        page,
        id: uuidv1(),
        text: value,
        x: textX,
        y: textY,
        color,
        size: fontSize(),
        fontFamily,
        width
      };
      saveText(payload);
      notifyDrawEvent({ ...payload, eventType: Actions.SAVE_TEXT });
      window.sessionStorage.setItem('isNewWhiteboardModification', 'true');
      resetValue();
    }
  }, [
    value,
    classRoomId,
    page,
    stagePosition,
    color,
    fontSize,
    saveText,
    notifyDrawEvent,
    resetValue
  ]);

  const focus = () => {
    textAreRef.current && textAreRef.current.focus();
  };

  const saveAndReset = () => {
    saveValue();
    resetPosition();
    resetValue();
  };

  const handleClickEvent = useCallback(
    event => {
      if (selectedTool === TOOLS.TEXT && event.target.nodeName === 'CANVAS') {
        const stagePosition = getStagePointerPosition(stageRef.current);
        const position = stageRef.current?.getPointerPosition();
        saveValue();
        setPosition(position);
        setStagePosition(stagePosition);
        focus();
      }
    },
    [saveValue, selectedTool]
  );

  useWindowEvent('click', handleClickEvent);

  const styles = css`
    position: absolute;
    color: ${color};
    z-index: 999;
    width: ${width}px;
    left: ${position.x}px;
    top: ${position.y}px;
    font-size: ${fontSize()}px;
    padding: 0;
    margin: 0;
    line-height: 1;
    background-color: transparent;
    border: 0 none #fff;
    overflow: hidden;
    outline: none;
    display: ${selectedTool === TOOLS.TEXT ? 'inline-block' : 'none'};
    font-family: ${fontFamily};
  `;

  return (
    <Fragment>
      {selectedTool === TOOLS.TEXT && (
        <TextareaAutosize
          onBlur={saveAndReset}
          onChange={e => {
            setValue(e.target.value);
          }}
          ref={textAreRef}
          value={value}
          placeholder="write text"
          css={styles}
        ></TextareaAutosize>
      )}
    </Fragment>
  );
};

// TODO move this to context, query classRoom and page with graphql
const mapStateToProps = state => {
  return {
    classRoomId: state.whiteBoard.classRoomId,
    page: state.whiteBoard.page
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ notifyDrawEvent, saveText }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  TextTool
);
