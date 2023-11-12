import React, { useRef, useEffect, useContext, useState } from 'react';
/** @jsxImportSource @emotion/react */

import { opacity_container_styles, slider_styles } from './styles';
import { whiteBoardContext } from '../../WhiteBoardProvider';
import ToolIcon from '../ToolIcon';
import { ICONS_COLORS } from '../../../../enums/constants.enum';

//icons
import { ReactComponent as TransparencyBlack } from 'assets/whiteboard/black/transparency-black.svg';
import { ReactComponent as TransparencyGrey } from 'assets/whiteboard/grey/transparency-grey.svg';
import { ReactComponent as TransparencyWhite } from 'assets/whiteboard/white/transparency-white.svg';
import { TOOLS } from '../../../../enums/whiteBoard.enum';

let timeId = null;

//component
const Transparency = ({ color, toggle }) => {
  if (color === ICONS_COLORS.BLACK) {
    return <TransparencyBlack className="icon-tool" onClick={toggle} />;
  } else if (color === ICONS_COLORS.GREY) {
    return <TransparencyGrey className="icon-tool" onClick={toggle} />;
  } else {
    return <TransparencyWhite className="icon-tool" onClick={toggle} />;
  }
};

const OpacityTool = ({ color }) => {
  const { opacity, setOpacity } = useContext(whiteBoardContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  }, [isOpen, opacity]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <ToolIcon toolType={TOOLS.TRANSPARENCY}>
      <div css={opacity_container_styles}>
        <Transparency color={color} toggle={toggle} />
        {isOpen && (
          <input
            css={slider_styles}
            value={opacity}
            onChange={e => {
              setOpacity(e.target.value);
            }}
            step="0.1"
            min="0"
            max="1"
            type="range"
          ></input>
        )}
      </div>
    </ToolIcon>
  );
};

export default React.memo(OpacityTool);
