/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import './styles.css';

/** Toolbar Icons */
import {
  Pencil,
  Eraser,
  Text,
  Pointer,
  Square,
  Segment,
  ArrowTool,
  Circle,
  Bucket
} from './mainIconTool';

import BinTool from './BinTool';
import SizeTool from './sizeTool';
import ColorPickerTool from './colorPickerTool';
import OpacityTool from './opacityTool';
import { TOOLS } from '../../../enums/whiteBoard.enum';
import ToolIcon from './ToolIcon';
import UndoTool from './UndoTool';
import RedoTool from './RedoTool';
import BlurTool from './blurTool';
import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';
import { USER_ROLES } from 'enums/constants.enum';
import { useUserRole } from 'services/cognito.service';
import ZoomTool from './zoomTool';

const ToolBar = ({ color }) => {
  const { isDisabledAndStudent, isCrystalTheme } = useUserClassRoom();
  const role = useUserRole();
  const styles = css`
    z-index: 3;
    position: fixed;
    top: ${isCrystalTheme ? '5%' : '0'};
  `;

  if (isDisabledAndStudent) {
    return null;
  }
  return (
    <ul css={styles} className="tool_bar_styles">
      <ToolIcon toolType={TOOLS.PENCIL}>
        <Pencil color={color} />
      </ToolIcon>

      <ToolIcon toolType={TOOLS.ERASER}>
        <Eraser color={color} />
      </ToolIcon>

      <ToolIcon toolType={TOOLS.TEXT}>
        <Text color={color} />
      </ToolIcon>

      <SizeTool color={color} />

      <ColorPickerTool color={color} />

      <ToolIcon toolType={TOOLS.POINTER}>
        <Pointer color={color} style={{ height: '29px' }} />
      </ToolIcon>

      <UndoTool color={color} />

      <RedoTool color={color} />

      <ToolIcon toolType={TOOLS.SQUARE}>
        <Square color={color} />
      </ToolIcon>

      <ToolIcon toolType={TOOLS.SEGMENT}>
        <Segment color={color} />
      </ToolIcon>

      <ToolIcon toolType={TOOLS.ARROW} otherToolType={TOOLS.CURVED_ARROW}>
        <ArrowTool color={color} />
      </ToolIcon>

      <ToolIcon toolType={TOOLS.CIRCLE}>
        <Circle color={color} />
      </ToolIcon>

      <ToolIcon toolType={TOOLS.BUCKET}>
        <Bucket color={color} />
      </ToolIcon>

      <OpacityTool color={color} />

      <BinTool color={color} />

      {(role === USER_ROLES.TEACHERS || role === USER_ROLES.ADMINS) && (
        <BlurTool color={color} />
      )}

      <ZoomTool color={color} />

      <ToolIcon toolType={TOOLS.HAND}>
        <Pointer color={color} style={{ height: '29px' }} />
      </ToolIcon>
    </ul>
  );
};

export default ToolBar;
