import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';

export const TypingText = ({ text, fontSize, fontFamily, color }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);
  // const endOfNotesRef = useRef(null);

  // useEffect(() => {
  //     endOfNotesRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [displayText]);

  useEffect(() => {
    let currentIndex = 0;
    const typingDelay = 60; // Delay entre cada letra (en milisegundos)

    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayText(prevText => prevText + text[currentIndex]);
        currentIndex++;
        setTimeout(typeText, typingDelay);
      } else {
        setShowCursor(false);
        setFinished(true);
      }
    };

    const cursorInterval = setInterval(() => {
      setShowCursor(prevShowCursor => !prevShowCursor);
    }, 500); // Intervalo de tiempo para el parpadeo del cursor (en milisegundos)

    typeText();

    return () => {
      setDisplayText('');
      currentIndex = 0;
      setShowCursor(true);
      clearInterval(cursorInterval);
    };
  }, [text]);

  return (
    <>
      <p
        style={{ fontSize: fontSize, fontFamily: fontFamily, color: color }}
        className={styles.message}
      >
        {displayText}
        {!finished && showCursor && <span>|</span>} {/* El cursor parpadeante */}
      </p>
      {/* <div ref={endOfNotesRef} /> */}
    </>
  );
};
