import React, { useContext } from 'react';
import { TOOLS } from '../../../../enums/whiteBoard.enum';
import ToolIcon from '../ToolIcon';
import { ZoomInAction, ZoomOutAction } from '../mainIconTool';
import { whiteBoardContext } from 'components/Whiteboard/WhiteBoardProvider';

export default function ZoomTool({ color }) {
  const { isZoomIn, handleZoom } = useContext(whiteBoardContext);

  return (
    <React.Fragment>
      <div onClick={handleZoom}>
        {!isZoomIn && (
          <ToolIcon toolType={TOOLS.ZOOMIN}>
            <ZoomInAction color={color} />
          </ToolIcon>
        )}

        {isZoomIn && (
          <ToolIcon toolType={TOOLS.ZOOMOUT}>
            <ZoomOutAction color={color} />
          </ToolIcon>
        )}
      </div>
    </React.Fragment>
  );
}
