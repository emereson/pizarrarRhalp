import React, { useState } from 'react';
import { ReactComponent as BlurBlack } from 'assets/whiteboard/black/blur-circle-black.svg';
import { ReactComponent as BlurWhite } from 'assets/whiteboard/white/blur-circle-white.svg';
import { ReactComponent as BlurGrey } from 'assets/whiteboard/grey/blur-circle-grey.svg';
import { TOOLS } from '../../../../enums/whiteBoard.enum';
import { ICONS_COLORS } from '../../../../enums/constants.enum';
import { useUpdateClassRoomBlur } from '../../hooks/useUpdateClassRoomBlur';
import { useUserClassRoom } from '../../../UserManagment/hooks/useUserClassRoom';
import ToolIcon from '../ToolIcon';

export default function BlurTool({ color }) {
  const { loading, setClassRoomBlur } = useUpdateClassRoomBlur();
  const { blur } = useUserClassRoom();

  const getIconBlur = () => {
    if (color === ICONS_COLORS.BLACK) {
      return <BlurBlack className="icon-tool" />;
    } else if (color === ICONS_COLORS.GREY) {
      return <BlurGrey className="icon-tool" />;
    } else {
      return <BlurWhite className="icon-tool" />;
    }
  };

  const handleClick = () => {
    if (blur === 'NaN') {
      setClassRoomBlur(0);
    } else if (blur < 3) {
      setClassRoomBlur(blur + 1);
    } else if (blur >= 3) {
      setClassRoomBlur(0);
    }
  };
  return (
    <ToolIcon parentClickHandler={handleClick} toolType={TOOLS.BLUR}>
      {getIconBlur()}
    </ToolIcon>
  );
}
