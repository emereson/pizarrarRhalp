import styles from './styles.module.scss';
import '../../assets/fonts/digital-7.ttf';
import '../../assets/fonts/BadScript-Regular.ttf';
import '../../assets/fonts/Futurette-ExtraLight.ttf';
import '../../assets/fonts/larabiefont.ttf';
import '../../assets/fonts/mvboli.ttf';
import '../../assets/fonts/zektonit.ttf';
import '../../assets/fonts/RoundHand.ttf';
import { useState } from 'react';

export const Fonts = ({ setFontFamily }) => {
  const [displayList, setDisplayList] = useState(false);

  const listTypography = () => {
    setDisplayList(!displayList);
  };

  const fonts = e => {
    setFontFamily(e.target.getAttribute('data-value'));

    setDisplayList(false);
  };

  return (
    <div className={styles.container}>
      <span onClick={listTypography} className={styles.list}>
        Fonts ▼
      </span>
      <ul
        style={{ display: displayList ? 'block' : 'none' }}
        className={styles.typographyObj}
      >
        <li data-value="larabiefont" onClick={fonts}>
          larabief'ont
        </li>
        <li data-value="Digital-7" onClick={fonts}>
          Digital 7
        </li>
        <li data-value="Roboto" onClick={fonts}>
          Roboto
        </li>
        <li data-value="BadScript" onClick={fonts}>
          BadScript
        </li>
        <li data-value="Futurette" onClick={fonts}>
          Futurette
        </li>
        <li data-value="mvboli" onClick={fonts}>
          mv boli
        </li>
        <li data-value="zektonit" onClick={fonts}>
          zekton
        </li>
        <li data-value="roundHand" onClick={fonts}>
          roundHand
        </li>
      </ul>
    </div>
  );
};
