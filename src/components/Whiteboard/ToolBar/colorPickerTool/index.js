import React, { useRef, useEffect, useContext } from 'react';

//icons
import { ReactComponent as ColorBlack } from 'assets/whiteboard/black/color-palette-black.svg';
import { ReactComponent as ColorGrey } from 'assets/whiteboard/grey/color-palette-grey.svg';
import { ReactComponent as ColorWhite } from 'assets/whiteboard/white/color-palette-white.svg';
import { ICONS_COLORS } from '../../../../enums/constants.enum';
import Colors from './paleta.jpg';
import {
  color_container_styles,
  color_palette_styles,
  canvas_width,
  canvas_height
} from './styles';
import { whiteBoardContext } from '../../WhiteBoardProvider';
import ToolIcon from '../ToolIcon';
import { TOOLS } from '../../../../enums/whiteBoard.enum';

//compont
const Color = ({ color, toggleColorPalette }) => {
  if (color === ICONS_COLORS.BLACK) {
    return <ColorBlack className="icon-tool" onClick={toggleColorPalette} />;
  } else if (color === ICONS_COLORS.GREY) {
    return <ColorGrey className="icon-tool" onClick={toggleColorPalette} />;
  } else {
    return <ColorWhite className="icon-tool" onClick={toggleColorPalette} />;
  }
};

const ColorPickerTool = ({ color }) => {
  const { setColor, colorPaletteOpen, toggleColorPalette } =
    useContext(whiteBoardContext);
  const colorCanvasRef = useRef();

  /** Render color picker image in the canvas when the component mounts */
  useEffect(() => {
    // dont try to render when the tool isn't open
    if (!colorPaletteOpen) return;
    const canvasEl = colorCanvasRef.current;
    const context = canvasEl.getContext('2d');
    let img = new Image();
    img.src = Colors;
    img.onload = () => context.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
  }, [colorPaletteOpen]);

  const pickColor = event => {
    let { offsetX, offsetY } = event.nativeEvent;
    let { data } = colorCanvasRef.current
      .getContext('2d')
      .getImageData(offsetX, offsetY, 1, 1);
    let color = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    setColor(color);
    toggleColorPalette();
  };

  return (
    <ToolIcon toolType={TOOLS.COLOR_TOOL}>
      <div css={color_container_styles}>
        <Color color={color} toggleColorPalette={toggleColorPalette} />
        {colorPaletteOpen && (
          <canvas
            onClick={pickColor}
            ref={colorCanvasRef}
            css={color_palette_styles}
            width={canvas_width}
            height={canvas_height}
            style={{ position: 'absolute', left: '44px', top: '120px', zIndex: '81' }}
          />
        )}
      </div>
    </ToolIcon>
  );
};

export default React.memo(ColorPickerTool);
