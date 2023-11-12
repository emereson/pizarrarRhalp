import React from 'react';
import { Path, Ellipse, Rect, Line, Arrow, Text } from 'react-konva';
import { SHAPE_TYPES } from '../../../enums/whiteBoard.enum';

const renderPaths = (path, key) => {
  return (
    <Path
      key={key}
      data={path.data}
      stroke={path.color}
      strokeWidth={path.size}
      opacity={path.opacity}
      lineCap="round"
      lineJoin="round"
    ></Path>
  );
};

const renderErased = (path, key) => {
  return (
    <Path
      key={key}
      data={path.data}
      stroke={path.color}
      strokeWidth={path.size}
      opacity={path.opacity}
      globalCompositeOperation="destination-out"
      lineCap="round"
      lineJoin="round"
    ></Path>
  );
};

const renderEllipses = (ellipse, key) => {
  return (
    <Ellipse
      key={key}
      x={ellipse.x}
      y={ellipse.y}
      radiusX={ellipse.radiusX}
      radiusY={ellipse.radiusY}
      radius={ellipse.radius}
      stroke={ellipse.color}
      strokeWidth={ellipse.size}
      fill={ellipse.fill}
      opacity={ellipse.opacity}
    ></Ellipse>
  );
};

const renderRects = (rect, key) => {
  return (
    <Rect
      key={key}
      x={rect.x}
      y={rect.y}
      fill={rect.fill}
      width={rect.width}
      height={rect.height}
      stroke={rect.color}
      strokeWidth={rect.size}
      opacity={rect.opacity}
    ></Rect>
  );
};

const renderSegments = (segment, key) => {
  return (
    <Line
      key={key}
      points={segment.points}
      lineJoin={segment.lineJoin}
      lineCap={segment.lineCap}
      stroke={segment.color}
      strokeWidth={segment.size}
      opacity={segment.opacity}
    ></Line>
  );
};

const renderArrows = (arrow, key) => {
  return (
    <Arrow
      key={key}
      points={arrow.points}
      lineJoin={arrow.lineJoin}
      lineCap={arrow.lineCap}
      fill={arrow.fill}
      stroke={arrow.color}
      strokeWidth={arrow.size}
      opacity={arrow.opacity}
    ></Arrow>
  );
};

const renderTexts = (text, key) => {
  return (
    <Text
      key={key}
      x={text.x}
      y={text.y}
      text={text.text}
      fill={text.color}
      fontSize={text.size}
      width={text.width}
      fontFamily={text.fontFamily}
    ></Text>
  );
};

const renderCurvedArrow = (curvedArrow, key) => {
  let arrowBasePoints = [
    Math.trunc(curvedArrow.points[curvedArrow.points.length - 6]),
    Math.trunc(curvedArrow.points[curvedArrow.points.length - 5]),
    Math.trunc(curvedArrow.points[curvedArrow.points.length - 2]),
    Math.trunc(curvedArrow.points[curvedArrow.points.length - 1])
  ];

  return (
    <>
      <Path
        key={key}
        data={curvedArrow.data}
        stroke={curvedArrow.color}
        strokeWidth={curvedArrow.size}
        opacity={curvedArrow.opacity}
        lineCap="round"
        lineJoin="round"
      ></Path>
      <Arrow
        key={key + '2'}
        points={arrowBasePoints}
        fill={curvedArrow.fill}
        stroke={curvedArrow.color}
        strokeWidth={curvedArrow.size}
        opacity={curvedArrow.opacity}
        lineCap="round"
      ></Arrow>
    </>
  );
};

const renderShape = (shape, key) => {
  switch (shape.shapeType) {
    case SHAPE_TYPES.PENCIL: {
      return renderPaths(shape, key);
    }
    case SHAPE_TYPES.ERASER: {
      return renderErased(shape, key);
    }
    case SHAPE_TYPES.CIRCLE: {
      return renderEllipses(shape, key);
    }
    case SHAPE_TYPES.SQUARE: {
      return renderRects(shape, key);
    }
    case SHAPE_TYPES.SEGMENT: {
      return renderSegments(shape, key);
    }
    case SHAPE_TYPES.ARROW: {
      return renderArrows(shape, key);
    }
    case SHAPE_TYPES.TEXT: {
      return renderTexts(shape, key);
    }
    case SHAPE_TYPES.CURVED_ARROW: {
      return renderCurvedArrow(shape, key);
    }
    default: {
      return;
    }
  }
};

const renderShapes = (shapes = {}) => {
  return Object.keys(shapes).map(key => {
    const shape = shapes[key];
    return renderShape(shape, key);
  });
};

const areEqual = (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

const RenderedShapes = ({ shapes }) => {
  return <>{renderShapes(shapes)}</>;
};

export default React.memo(RenderedShapes, areEqual);
