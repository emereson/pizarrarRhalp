import React, { useEffect, useRef } from 'react';

const CircularSector = ({ startAngle, endAngle, radius }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const startAngleRadians = (startAngle * Math.PI) / 180;
    const endAngleRadians = (endAngle * Math.PI) / 180;
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    // Clear previous state
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the new sector
    context.beginPath();
    context.moveTo(x, y);
    context.arc(
      x,
      y,
      radius,
      -Math.PI / 2 + startAngleRadians,
      -Math.PI / 2 + endAngleRadians,
      false
    );
    context.closePath();
    context.fillStyle = 'rgba(0, 0, 255, 0.15)';
    context.fill();
  }, [startAngle, endAngle, radius]);

  return <canvas ref={canvasRef} width={2 * radius} height={2 * radius} />;
};

export default CircularSector;
