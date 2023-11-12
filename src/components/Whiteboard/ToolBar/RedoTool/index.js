import React from 'react';
import ToolIcon from '../ToolIcon';

import { TOOLS } from '../../../../enums/whiteBoard.enum';
import { connect } from 'react-redux';
import { redo } from '../../../../store/actions/WhiteBoardActions';
import { ICONS_COLORS } from '../../../../enums/constants.enum';

//icons
import { ReactComponent as RedoBlack } from 'assets/whiteboard/black/redo-black.svg';
import { ReactComponent as RedoGrey } from 'assets/whiteboard/grey/redo-grey.svg';
import { ReactComponent as RedoWhite } from 'assets/whiteboard/white/redo-white.svg';

const Redo = ({ color }) => {
  if (color === ICONS_COLORS.BLACK) {
    return <RedoBlack className="icon-tool" />;
  } else if (color === ICONS_COLORS.GREY) {
    return <RedoGrey className="icon-tool" />;
  } else {
    return <RedoWhite className="icon-tool" />;
  }
};

const RedoTool = ({ redo, color }) => {
  return (
    <ToolIcon parentClickHandler={redo} toolType={TOOLS.REDO}>
      <Redo color={color} />
    </ToolIcon>
  );
};

const mapDispatchToProps = {
  redo
};

export default connect(null, mapDispatchToProps)(RedoTool);
