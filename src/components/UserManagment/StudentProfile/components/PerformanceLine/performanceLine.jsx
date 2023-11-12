import './styles.scss';
import { useSpring, animated, config } from 'react-spring';

const DEFAULT_AVERAGE = 0.8;

function PerformanceLine({ overallAverage = DEFAULT_AVERAGE }) {
  // x = vt
  // vt = x
  // t = x / v -> velocity equals position over velocity
  // 10000 = 100/v
  // v=100/10000 = 0.01
  const TARGET_VELOCITY = 0.01;
  const ACTUAL_VELOCITY =
    TARGET_VELOCITY * (overallAverage ? overallAverage / 100 : DEFAULT_AVERAGE);
  const FINAL_POSITION = 100;
  const DELAY = 2000;
  const TARGET_DURATION = FINAL_POSITION / TARGET_VELOCITY;
  const ACTUAL_DURATION = FINAL_POSITION / ACTUAL_VELOCITY;

  const targetAnimation = {
    from: { right: '110%' },
    to: { right: '-10%' },
    delay: DELAY,
    config: { ...config.molasses, duration: TARGET_DURATION }
  };

  const actualAnimation = {
    ...targetAnimation,
    config: { ...config.molasses, duration: ACTUAL_DURATION },
    onRest: () => {
      // Re start animation once the actual indicator finishes
      targetApi.start(targetAnimation);
      actualApi.start(actualAnimation);
    }
  };

  const [targetStyles, targetApi] = useSpring(() => targetAnimation);
  const [actualtStyles, actualApi] = useSpring(() => actualAnimation);

  return (
    <div className="performance-line">
      <animated.div className="indicator actual" style={actualtStyles}></animated.div>
      <div className="lineBackgraund"></div>
      <animated.div className="indicator target" style={targetStyles}></animated.div>
    </div>
  );
}

export default PerformanceLine;
