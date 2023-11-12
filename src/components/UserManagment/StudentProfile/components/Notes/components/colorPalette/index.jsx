import styles from './styles.module.scss';

export const ColorPalette = ({ setColor }) => {
  const colores = [
    '#0d5ef6',
    '#270782',
    '#b99bff',
    '#fd08f9',
    '#fffd00',
    '#a2ff00',
    '#00eaff',
    '#ffffff',
    '#ebecf0',
    '#bdafc8',
    '#6601ff',
    '#00ff01',
    '#00ccff',
    '#0000fe',
    '#cc00ff',
    '#000000'
  ];

  return (
    <div className={styles.gridColors}>
      {colores.map((color, i) => {
        return (
          <div
            className={styles.itemColor}
            key={i}
            style={{ backgroundColor: color }}
            onClick={() => setColor(color)}
          ></div>
        );
      })}
    </div>
  );
};
