import React from 'react';
import ToolIcon from '../ToolIcon';

import { TOOLS } from '../../../../enums/whiteBoard.enum';
import { connect } from 'react-redux';
import { undo } from '../../../../store/actions/WhiteBoardActions';

//icons
import { ReactComponent as UndoBlack } from 'assets/whiteboard/black/undo-black.svg';
import { ReactComponent as UndoGrey } from 'assets/whiteboard/grey/undo-grey.svg';
import { ReactComponent as UndoWhite } from 'assets/whiteboard/white/undo-white.svg';
import { ICONS_COLORS } from '../../../../enums/constants.enum';

const Undo = ({ color }) => {
  if (color === ICONS_COLORS.BLACK) {
    return <UndoBlack className="icon-tool" />;
  } else if (color === ICONS_COLORS.GREY) {
    return <UndoGrey className="icon-tool" />;
  } else {
    return <UndoWhite className="icon-tool" />;
  }
};

const UndoTool = ({ undo, color }) => {
  return (
    <ToolIcon parentClickHandler={undo} toolType={TOOLS.UNDO}>
      <Undo color={color} />
    </ToolIcon>
  );
};

const mapDispatchToProps = {
  undo
};

export default connect(null, mapDispatchToProps)(UndoTool);
