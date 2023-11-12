import React from 'react';

//icon black
import { ReactComponent as PencilBlack } from 'assets/whiteboard/black/pencil-black.svg';
import { ReactComponent as EraserBlack } from 'assets/whiteboard/black/eraser-black.svg';
import { ReactComponent as TextBlack } from 'assets/whiteboard/black/text-icon-black.svg';
import { ReactComponent as PointerBlack } from 'assets/whiteboard/black/pointer-icon-black.svg';
import { ReactComponent as RedoToolBlack } from 'assets/whiteboard/black/redo-black.svg';
import { ReactComponent as SquareBlack } from 'assets/whiteboard/black/square-icon-black.svg';
import { ReactComponent as SegmentBlack } from 'assets/whiteboard/black/segment-black.svg';
import { ReactComponent as ArrowBlack } from 'assets/whiteboard/black/straight-black.svg';
import { ReactComponent as CircleBlack } from 'assets/whiteboard/black/circle-black.svg';
import { ReactComponent as BucketBlack } from 'assets/whiteboard/black/paint-black.svg';
import { ReactComponent as ZoomPlusBlack } from 'assets/whiteboard/black/zoom plus black.svg';
import { ReactComponent as ZoomMinusBlack } from 'assets/whiteboard/black/zoom minus black.svg';

//icon grey
import { ReactComponent as PencilGrey } from 'assets/whiteboard/grey/pencil-grey.svg';
import { ReactComponent as EraserGrey } from 'assets/whiteboard/grey/eraser-grey.svg';
import { ReactComponent as TextGrey } from 'assets/whiteboard/grey/text-icon-grey.svg';
import { ReactComponent as PointerGrey } from 'assets/whiteboard/grey/pointer-grey.svg';
import { ReactComponent as RedoToolGrey } from 'assets/whiteboard/grey/redo-grey.svg';
import { ReactComponent as SquareGrey } from 'assets/whiteboard/grey/square-grey.svg';
import { ReactComponent as SegmentGrey } from 'assets/whiteboard/grey/segment-grey.svg';
import { ReactComponent as ArrowGrey } from 'assets/whiteboard/grey/straight-grey.svg';
import { ReactComponent as CircleGrey } from 'assets/whiteboard/grey/circle-grey.svg';
import { ReactComponent as BucketGrey } from 'assets/whiteboard/grey/paint-grey.svg';
import { ReactComponent as ZoomPlusGrey } from 'assets/whiteboard/grey/zoom plus grey.svg';
import { ReactComponent as ZoomMinusGrey } from 'assets/whiteboard/grey/zoom minus grey.svg';

//icons white
import { ReactComponent as PencilWhite } from 'assets/whiteboard/white/pencil-white.svg';
import { ReactComponent as EraserWhite } from 'assets/whiteboard/white/eraser-white.svg';
import { ReactComponent as TextWhite } from 'assets/whiteboard/white/text-icon-white.svg';
import { ReactComponent as PointerWhite } from 'assets/whiteboard/white/pointer-white.svg';
import { ReactComponent as RedoToolWhite } from 'assets/whiteboard/white/redo-white.svg';
import { ReactComponent as SquareWhite } from 'assets/whiteboard/white/square-white.svg';
import { ReactComponent as SegmentWhite } from 'assets/whiteboard/white/segment-white.svg';
import { ReactComponent as ArrowWhite } from 'assets/whiteboard/white/straight-white.svg';
import { ReactComponent as CircleWhite } from 'assets/whiteboard/white/circle-white.svg';
import { ReactComponent as BucketWhite } from 'assets/whiteboard/white/paint-white.svg';
import { ReactComponent as ZoomPlusWhite } from 'assets/whiteboard/white/zoom plus white.svg';
import { ReactComponent as ZoomMinusWhite } from 'assets/whiteboard/white/zoom minus white (1).svg';


import './mainIconTool.css';

const Pencil = ({ color }) => {
  if (color === 'black') {
    return <PencilBlack className="icon-tool" />;
  } else if (color === 'grey') {
    return <PencilGrey className="icon-tool" />;
  } else {
    return <PencilWhite className="icon-tool" />;
  }
};

const Eraser = ({ color }) => {
  if (color === 'black') {
    return <EraserBlack className="icon-tool" />;
  } else if (color === 'grey') {
    return <EraserGrey className="icon-tool" />;
  } else {
    return <EraserWhite className="icon-tool" />;
  }
};

const Text = ({ color }) => {
  if (color === 'black') {
    return <TextBlack className="icon-tool" />;
  } else if (color === 'grey') {
    return <TextGrey className="icon-tool" />;
  } else {
    return <TextWhite className="icon-tool" />;
  }
};

const Pointer = ({ color }) => {
  if (color === 'black') {
    return <PointerBlack className="icon-tool" />;
  } else if (color === 'grey') {
    return <PointerGrey className="icon-tool" />;
  } else {
    return <PointerWhite className="icon-tool" />;
  }
};

const RedoTool = ({ color }) => {
  if (color === 'black') {
    return <RedoToolBlack className="icon-tool" />;
  } else if (color === 'grey') {
    return <RedoToolGrey className="icon-tool" />;
  } else {
    return <RedoToolWhite className="icon-tool" />;
  }
};

const Square = ({ color }) => {
  if (color === 'black') {
    return <SquareBlack className="icon-tool" />;
  } else if (color === 'grey') {
    return <SquareGrey className="icon-tool" />;
  } else {
    return <SquareWhite className="icon-tool" />;
  }
};

const Segment = ({ color }) => {
  if (color === 'black') {
    return <SegmentBlack className="icon-tool-no-he" />;
  } else if (color === 'grey') {
    return <SegmentGrey className="icon-tool-no-he" />;
  } else {
    return <SegmentWhite className="icon-tool-no-he" />;
  }
};

const ArrowTool = ({ color }) => {
  if (color === 'black') {
    return <ArrowBlack className="icon-tool-no-he" />;
  } else if (color === 'grey') {
    return <ArrowGrey className="icon-tool-no-he" />;
  } else {
    return <ArrowWhite className="icon-tool-no-he" />;
  }
};

const Circle = ({ color }) => {
  if (color === 'black') {
    return <CircleBlack className="icon-tool" />;
  } else if (color === 'grey') {
    return <CircleGrey className="icon-tool" />;
  } else {
    return <CircleWhite className="icon-tool" />;
  }
};

const Bucket = ({ color }) => {
  if (color === 'black') {
    return <BucketBlack className="icon-tool" />;
  } else if (color === 'grey') {
    return <BucketGrey className="icon-tool" />;
  } else {
    return <BucketWhite className="icon-tool" />;
  }
};

const ZoomInAction = ({ color }) => {
  if (color === 'black') {
    return <ZoomPlusBlack className="icon-tool" />;
  } else if (color === 'grey') {
    return <ZoomPlusGrey className="icon-tool" />;
  } else {
    return <ZoomPlusWhite className="icon-tool" />;
  }
};

const ZoomOutAction = ({ color }) => {
  if (color === 'black') {
    return <ZoomMinusBlack className="icon-tool" />;
  } else if (color === 'grey') {
    return <ZoomMinusGrey className="icon-tool" />;
  } else {
    return <ZoomMinusWhite className="icon-tool" />;
  }
};

export {
  Pencil,
  Eraser,
  Text,
  Pointer,
  Square,
  Segment,
  ArrowTool,
  Circle,
  Bucket,
  RedoTool,
  ZoomInAction,
  ZoomOutAction
};
