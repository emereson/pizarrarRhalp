import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const HomeIcon = ({ img, route, text, alt }) => {
  return (
    <Link to={route} style={{ zIndex: '99', marginTop: '8px' }}>
      <img alt={alt} src={img} className={`icon-home`} />
      <div className="Icon-text">{text}</div>
    </Link>
  );
};

export default HomeIcon;
