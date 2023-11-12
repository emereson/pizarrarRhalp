import { useEffect } from 'react';
import './styles.scss';

function Rank({
  id,
  minRangeValue,
  isSelected,
  maxRangeValue,
  onRangeMinChange,
  onRangeMaxChange,
  onToggle,
  isActive,
  ...props
}) {
  return (
    <div className="Rank" style={{ position: 'relative' }}>
      <div
        onClick={() => onToggle(id)}
        className={isActive ? 'Rank__id__selected' : 'Rank__id'}
      >
        {id}
      </div>
      <div className="inputs-container">
        {'('}
        <input
          className="Rank__input"
          type="text"
          maxLength={3}
          value={minRangeValue}
          onChange={onRangeMinChange}
        />
        <p className="Rank__stroke">-</p>
        <input
          className="Rank__input"
          type="text"
          maxLength={3}
          value={maxRangeValue}
          onChange={onRangeMaxChange}
        />
        {')'}
        {isSelected !== id && (
          <div
            style={{
              width: '80px',
              height: '100%',
              position: 'absolute',
              top: 0,
              background: 'transparent'
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default Rank;
