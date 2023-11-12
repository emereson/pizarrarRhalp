import React from 'react';
import ToolIcon from '../ToolIcon';

import { TOOLS } from '../../../../enums/whiteBoard.enum';
import { connect } from 'react-redux';
import { clearWhiteBoard } from '../../../../store/actions/WhiteBoardActions';
import { ICONS_COLORS } from '../../../../enums/constants.enum';

//icons black grey white
import { ReactComponent as TrashBlack } from 'assets/whiteboard/black/trash-black.svg';
import { ReactComponent as TrashWhite } from 'assets/whiteboard/white/trash-white.svg';
import { ReactComponent as TrashGrey } from 'assets/whiteboard/grey/trash-grey.svg';

const BinTool = ({ clearWhiteBoard, color }) => {
  const transh = () => {
    if (color === ICONS_COLORS.BLACK) {
      return <TrashBlack className="icon-tool" />;
    } else if (color === ICONS_COLORS.GREY) {
      return <TrashGrey className="icon-tool" />;
    } else {
      return <TrashWhite className="icon-tool" />;
    }
  };

  return (
    <ToolIcon
      parentClickHandler={() => {
        clearWhiteBoard();
        window.sessionStorage.setItem('storedUploadedImage', 'false');
        window.sessionStorage.setItem('isNewWhiteboardModification', 'false');
      }}
      toolType={TOOLS.TRASH}
    >
      {transh()}
    </ToolIcon>
  );
};

const mapStateToProps = state => {
  return {
    shapes: state.whiteBoard.shapes
  };
};

const mapDispatchToProps = {
  clearWhiteBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(BinTool);
