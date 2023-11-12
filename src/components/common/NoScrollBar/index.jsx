import React from 'react';
import './styles.css';

const NoScrollBar = ({ children, style, id }) => {
  return (
    <div id={id} className="no-scrollbar" style={style}>
      {children}
    </div>
  );
};

export default NoScrollBar;
