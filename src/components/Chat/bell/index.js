import React from 'react';
import { useSpring, animated } from 'react-spring';
import BellIcon from '../chat-assets/belliconActive.svg';
import '../Chat.css';

export default function Bell() {
  const interp = i => r =>
    `translate3d(${8 * Math.sin(r + (i * 2 * Math.PI) / 1.1)}px, 0, 0)`;
  const { radians } = useSpring({
    to: async next => {
      setInterval(() => {
        next({ radians: 4 * Math.PI });
      }, 300);
    },
    from: { radians: 0 },
    config: { duration: 300 },
    reset: true
  });

  return (
    <animated.img
      style={{ transform: radians.interpolate(interp(1)), alignSelf: 'center' }}
      src={BellIcon}
      className="bell"
    />
  );
}
