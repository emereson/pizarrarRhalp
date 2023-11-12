import React, { useState, useEffect } from 'react';
import styles from './styles/styles.module.scss';
import CircularSector from './components/CircularSector/index';
import CircleWithBall from './components/CircleWithBall/index';

const CircleComponent = ({ arrayScore, isEditMode }) => {
  const [rotation, setRotation] = useState(0);
  const [scoreIndex, setScoreIndex] = useState(0);
  const [score, setScore] = useState(arrayScore[0]);

  useEffect(() => {
    rotate();
  }, []);

  const rotate = () => {
    setRotation(prevRotation => prevRotation + 90);
    let nextIndex = scoreIndex + 1;
    if (nextIndex >= arrayScore.length) {
      nextIndex = 0;
    }
    setScoreIndex(nextIndex);
    setScore(arrayScore[nextIndex]);
  };

  useEffect(() => {
    const timer = setInterval(rotate, 4500);

    return () => {
      clearInterval(timer);
    };
  }, [scoreIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.containerRoseta}>
        <div className={styles.SectorCircular}>
          <CircleWithBall radius={123} />
        </div>
        <div className={styles.SectorCircular}>
          <CircularSector startAngle={-score / 2} endAngle={score / 2} radius={90} />
        </div>
        <div className={styles.circleShadowRight}></div>
        <div className={styles.circleShadowLeft}></div>
        <img
          className={styles.divSkills}
          src="/static/img/student-profile/roceta.png"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 1.5s ease'
          }}
        />
        <img
          className={styles.divInner}
          src="/static/img/student-profile/rocetaInner.png"
        />
        <div className={styles.score}>{score}</div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.tests}>
          <div className={styles.smallCircle}></div>
          <p>Tests</p>
          <div className={styles.lineTests} />
        </div>

        <div className={styles.buttonRight}>
          <div className={styles.smallCircle}></div>
          <div className={styles.lineButtonRight} />
        </div>

        {!isEditMode ? (
          <div className={styles.account}>
            <div className={styles.smallCircle}></div>
            <p>Account</p>
            <div className={styles.lineAccount} />
          </div>
        ) : null}
        <div className={styles.lineOneCircle}>
          <div className={styles.smallCircle}></div>
          <div className={styles.lineLeftOne} />
        </div>
        <div className={styles.scores}>
          <div className={styles.containerScore}>
            <div className={styles.smallCircle}></div>
            <p>Scores</p>
          </div>
          <div className={styles.scoresLine}></div>
        </div>
        <div className={styles.lineTwoCircle}>
          <div className={styles.smallCircle}></div>
          <div className={styles.lineLeftTwo}></div>
        </div>
      </div>
    </div>
  );
};

export default CircleComponent;
