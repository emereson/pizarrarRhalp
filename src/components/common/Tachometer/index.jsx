import React, { useState, useEffect } from 'react';
import { useRef } from 'react';

import ReactSpeedometer from 'react-d3-speedometer';
import { useHistory } from 'react-router-dom';

import './style.css';

export default function Tachometer({
  questions,
  correctQuestions,
  title = '',
  archText = '',
  width,
  height,
  containerWidth,
  examColorScheme,
  forceBackgroundColor,
  defaultDimentions
}) {
  const [currentState, setcurrentState] = useState('oscillating');
  const [ShakeAnimation, setShakeAnimation] = useState(0);
  const [intervalCreated, setintervalCreated] = useState(false);
  const speedometerValue = useRef(0);
  const Moving = useRef(false);
  const history = useHistory();

  const _getLabels = () => {
    const label = {
      text: '',
      position: 'INSIDE',
      color: 'rgba(0,0,0,0)'
    };
    let tmpLabels = [];
    for (let i = 0; i < questions; i++) {
      tmpLabels.push(label);
    }
    return tmpLabels;
  };

  const handleChangeEndColors = () => {
    if (examColorScheme == 'yellow') {
      return '#fae11f';
    }
    if (examColorScheme == 'blue') {
      return '#50baff';
    }
    if (examColorScheme == 'green') {
      return '#7dfb00';
    }
    return '#2cfcfc';
  };

  const handleChangeColors = () => {
    if (examColorScheme == 'yellow') {
      return questions ? '#fff62f74' : '#fae11f';
    }
    if (examColorScheme == 'blue') {
      return questions ? '#d2eaff' : '#50baff';
    }
    if (examColorScheme == 'green') {
      return questions ? '#5edc1038' : '#7dfb00';
    }
    return questions ? '#10dcdc29' : '#2cfcfc';
  };

  const initialTestSpeedometer = {
    test: questions ? true : false,
    segments: questions ? questions : 1,
    labels: questions ? _getLabels() : [{}],
    transitionDuration: questions ? 2000 : 1000,
    segmentsCount: 1000 / questions,
    value: questions ? 0 : 100,
    animation: 'easeElastic',
    animationInitial: false,
    advance: 2,
    valueToAnimate: 200,
    setValue: false,
    stopAnimation: false,
    colorStart: forceBackgroundColor || handleChangeColors()
  };

  const [speedometer, setSpeedometer] = useState(initialTestSpeedometer);
  const getWidth = () => {
    if (window.matchMedia('(max-width: 340px)').matches) {
      return 280;
    } else if (window.matchMedia('(max-width: 380px)').matches) {
      return 330;
    } else if (window.matchMedia('(max-width: 750px)').matches) {
      return 340;
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      return 400;
    } else if (window.matchMedia('(max-width: 1200px)').matches) {
      return 420;
    } else {
      return 450;
    }
  };

  const getHeight = () => {
    if (window.innerWidth > 750) {
      return 300;
    }
    if (window.innerWidth < 750) {
      return 210;
    }
  };

  const handleParticularCulebrilla = async () =>
    new Promise((response, reject) => {
      const currentValueToAnimate = speedometer.value;
      setSpeedometer({
        ...speedometer,
        value: currentValueToAnimate + 5.5
      });
      speedometerValue.current = currentValueToAnimate + 5.5;
      setTimeout(() => {
        setSpeedometer({
          ...speedometer,
          value: currentValueToAnimate - 5.5
        });
        speedometerValue.current = currentValueToAnimate - 5.5;
      }, 5.5);
      setTimeout(() => {
        setSpeedometer({
          ...speedometer,
          value: currentValueToAnimate + 5.5
        });
        speedometerValue.current = currentValueToAnimate + 5.5;
      }, 70);
      setTimeout(() => {
        setSpeedometer({
          ...speedometer,
          value: currentValueToAnimate + 5.5
        });
        speedometerValue.current = currentValueToAnimate + 5.5;
      }, 125.5);
      setTimeout(() => {
        setSpeedometer({
          ...speedometer,
          value: currentValueToAnimate + 5.5
        });
        response('finished');
        speedometerValue.current = currentValueToAnimate + 5.5;
      }, 150);
    });

  const handlePersistCulebrilla = initialValue => {
    let currentValueToAnimate = initialValue ? initialValue : speedometer.value;
    if (initialValue == 0) currentValueToAnimate = 0;
    if (!Moving.current) {
      setSpeedometer({
        ...speedometer,
        value: currentValueToAnimate + 3
      });
      speedometerValue.current = currentValueToAnimate + 3;
      setInterval(() => {
        setSpeedometer({
          ...speedometer,
          value: currentValueToAnimate - 3
        });
        speedometerValue.current = currentValueToAnimate - 3;
        let timeout = setTimeout(() => {
          setSpeedometer({
            ...speedometer,
            value: currentValueToAnimate + 3
          });
          speedometerValue.current = currentValueToAnimate + 3;
          window.clearTimeout(timeout);
        }, 50);
      }, 70);
    }
  };

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const clearIntervals = () =>
    new Promise((response, reject) => {
      var interval_id = window.setInterval(() => {}, Number.MAX_SAFE_INTEGER);

      for (let index = 0; index <= interval_id; index++) {
        window.clearInterval(index);
        if (index === interval_id) {
          response(true);
        }
      }
    });

  const handleProgressiveMoving = async (value, mode) => {
    await clearIntervals().then(() => {
      let currentCount = speedometer.value;
      const valueToReach = parseInt(parseFloat(value).toFixed(0));
      const culebrillaPoints = [
        getRandom(100, 1000),
        getRandom(100, 1000),
        getRandom(100, 1000),
        getRandom(100, 1000)
      ];

      const interval = setInterval(() => {
        Moving.current = true;
        if (
          currentCount === culebrillaPoints[0] ||
          currentCount === culebrillaPoints[1] ||
          currentCount === culebrillaPoints[2] ||
          currentCount === culebrillaPoints[3]
        ) {
          let index = 0;
          let thisInterval = setInterval(() => {
            let currentCalculation =
              index % 2 === 0
                ? currentCount < valueToReach
                  ? currentCount + 10
                  : currentCount - 10
                : currentCount < valueToReach
                ? currentCount - 10
                : currentCount + 10;
            setSpeedometer({
              ...speedometer,
              value: currentCalculation
            });

            index++;
            if (index == 9) {
              window.clearInterval(thisInterval);
              setTimeout(() => {
                currentCount =
                  currentCount < valueToReach ? currentCount + 1 : currentCount - 1;
              }, 250);
            }
          }, 1);
        } else {
          if (currentCount !== valueToReach && Moving.current) {
            setSpeedometer({
              ...speedometer,
              value: currentCount < valueToReach ? currentCount + 1 : currentCount - 1
            });
            currentCount < valueToReach ? currentCount++ : currentCount--;
          }
          if (currentCount === valueToReach) {
            Moving.current = false;
            window.clearInterval(interval);
            let timeout = setTimeout(() => {
              handlePersistCulebrilla(valueToReach);
              window.clearTimeout(timeout);
            }, 100);
          }
        }
      }, 5);
    });
  };

  useEffect(() => {
    if (!window.location.href.includes('landing-page')) {
      handlePersistCulebrilla();
      if (currentState === 'oscillating') {
        setcurrentState('evaluating');
        setSpeedometer({ ...speedometer, value: 0 });
        setTimeout(() => {
          const correctValue = 1000 / questions;
          handleProgressiveMoving(correctValue * correctQuestions);
          speedometerValue.current = parseInt(
            parseFloat(correctValue * correctQuestions).toFixed(0)
          );
        }, 2000);
      } else {
        const correctValue = 1000 / questions;
        speedometerValue.current = parseInt(
          parseFloat(correctValue * correctQuestions).toFixed(0)
        );
        handleProgressiveMoving(correctValue * correctQuestions);
      }
    }
  }, [correctQuestions]);

  useEffect(() => {
    if (!intervalCreated) {
      setInterval(() => {
        if (!intervalCreated) setintervalCreated(true);
      }, 250);
    }
  }, [currentState, speedometer, correctQuestions]);

  useEffect(() => {
    if (!speedometer.test && speedometer.animationInitial) {
      setSpeedometer({ ...speedometer, animationInitial: false });
    }
  }, [speedometer.valueToAnimate]);

  useEffect(() => {
    if (!speedometer.test && speedometer.animationInitial) {
      let timer2 = setTimeout(() => {
        if (speedometer.valueToAnimate === 200) {
          setSpeedometer({ ...speedometer, valueToAnimate: 450 });
        } else if (speedometer.valueToAnimate === 450) {
          handleParticularCulebrilla().then(() => {
            setSpeedometer({ ...speedometer, valueToAnimate: 650 });
          });
        } else if (speedometer.valueToAnimate === 650) {
          setSpeedometer({ ...speedometer, valueToAnimate: 850 });
        } else if (speedometer.valueToAnimate === 850) {
          handleParticularCulebrilla().then(() => {
            setSpeedometer({ ...speedometer, valueToAnimate: 550 });
          });
        } else if (speedometer.valueToAnimate === 550) {
          handleParticularCulebrilla().then(() => {
            setSpeedometer({ ...speedometer, valueToAnimate: 150 });
          });
        } else if (speedometer.valueToAnimate === 150) {
          setSpeedometer({ ...speedometer, valueToAnimate: 200 });
        }
      }, 100);
      return () => {
        clearTimeout(timer2);
      };
    }
  }, [speedometer.animationInitial]);

  useEffect(() => {
    if (!speedometer.test && !speedometer.animationInitial) {
      let timer1 = setTimeout(() => {
        if (!speedometer.animationInitial) {
          setSpeedometer({
            ...speedometer,
            value: speedometer.value + speedometer.advance
          });
        }
        if (speedometer.value === speedometer.valueToAnimate) {
          setSpeedometer({ ...speedometer, animationInitial: true });
        }
      }, 20);
      if (speedometer.value === 900 || speedometer.value > 900) {
        setSpeedometer({ ...speedometer, advance: -2 });
      }
      if (speedometer.value === 100 || speedometer.value < 100) {
        setSpeedometer({ ...speedometer, advance: 2 });
      }
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [
    speedometer.value,
    speedometer.valueToAnimate,
    speedometer.animationInitial,
    speedometer.advance
  ]);

  useEffect(() => {
    if (speedometer.stopAnimation) {
      setSpeedometer({ ...speedometer, transitionDuration: 100 });
    }
  }, [speedometer.stopAnimation]);

  useEffect(() => {
    if (speedometer.stopAnimation && speedometer.transitionDuration === 100) {
      let timer = setTimeout(() => {
        if (speedometer.setValue) {
          setSpeedometer({
            ...speedometer,
            value: speedometer.value - 10,
            setValue: false
          });
        } else {
          setSpeedometer({
            ...speedometer,
            value: speedometer.value + 10,
            setValue: true
          });
        }
      }, 200);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [speedometer.transitionDuration, speedometer.value]);

  const handleRedirectToExam = () => {
    history.push('/take-exam/joinBranakTest');
  };

  return (
    <React.Fragment>
      {archText ? (
        <TextArch defaultDimentions={defaultDimentions} archText={archText} />
      ) : null}
      <div className={'arch-speedometer'} onClick={handleRedirectToExam}>
        <ReactSpeedometer
          width={defaultDimentions ? defaultDimentions.width : getWidth()}
          height={defaultDimentions ? defaultDimentions.height : getHeight()}
          className="speed-meter-test"
          needleTransition={'easeElastic'}
          needleHeightRatio={0.7}
          value={speedometer.value}
          currentValueText={title}
          customSegmentLabels={speedometer.labels}
          ringWidth={65}
          needleTransitionDuration={500}
          needleColor={'#000'}
          textColor={'#000'}
          paddingHorizontal={15}
          valueTextFontSize={'0px'}
          segments={speedometer.segments}
          startColor={speedometer.colorStart}
          endColor={forceBackgroundColor || handleChangeEndColors()}
        />
      </div>
    </React.Fragment>
  );
}

function TextArch({ archText, defaultDimentions }) {
  const [tachomtetWordsPosition, settachomtetWordsPosition] = useState(
    window.innerWidth < 770
  );

  const _getWidth = () => {
    if (window.matchMedia('(max-width: 340px)').matches) {
      return 110;
    } else if (window.matchMedia('(max-width: 380px)').matches) {
      return 125;
    } else if (window.matchMedia('(max-width: 750px)').matches) {
      return 135;
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      return 160;
    } else if (window.matchMedia('(max-width: 1100px)').matches) {
      return 170;
    } else {
      return 180;
    }
  };

  useEffect(() => {
    const resizing = e => {
      if (e.target.innerWidth > 770) {
        settachomtetWordsPosition(false);
      } else {
        settachomtetWordsPosition(true);
      }
    };

    window.addEventListener('resize', resizing);

    return () => {
      window.removeEventListener('resize', resizing);
    };
  }, []);

  const arc = 130;
  const radius = defaultDimentions
    ? defaultDimentions.width / (!tachomtetWordsPosition ? 2.3 : 3)
    : _getWidth();
  const characters = archText.split('');
  const degree = arc / characters.length;
  return (
    <div className="wrapper">
      <h1>
        {characters.map((char, i) => (
          <span
            key={`heading-span-${i}`}
            style={{
              height: `${radius}px`,
              transform: !tachomtetWordsPosition
                ? `rotate(${degree * i - arc / 2}deg) translateY(40px)`
                : `rotate(${degree * i - arc / 2}deg) translateY(10px)`,
              transformOrigin: `0 ${radius + 40}px 0`
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
