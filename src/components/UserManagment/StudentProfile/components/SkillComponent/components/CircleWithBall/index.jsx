import React, { useEffect, useRef } from 'react';

const CircleWithBall = ({ radius }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const orbitRadius = radius;
    const ballRadius = 6;
    const ballBorder = 12;

    const drawOrbit = () => {
      context.beginPath();
      context.arc(centerX, centerY, orbitRadius, 0, 2 * Math.PI);
      context.strokeStyle = 'rgba(0, 0, 255, 0.3)';
      context.stroke();
    };

    const drawBall = angle => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      drawOrbit();

      const positionX = centerX + orbitRadius * Math.cos(angle);
      const positionY = centerY + orbitRadius * Math.sin(angle);

      context.beginPath();
      context.arc(positionX, positionY, ballRadius, 0, 2 * Math.PI);
      context.fillStyle = 'rgba(0, 0, 255, 0.2)';
      context.fill();
    };

    const interval = setInterval(() => {
      const time = new Date().getTime() / 1000;
      const angle = ((time % 15) * (2 * Math.PI)) / 15;
      drawBall(angle);
    }, 10);

    return () => clearInterval(interval);
  }, [radius]);

  return <canvas ref={canvasRef} width={2 * radius + 20} height={2 * radius + 20} />;
};

export default CircleWithBall;
