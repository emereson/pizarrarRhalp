import React from 'react';
import { Link } from 'react-router-dom';

//styles global

import './styles.scss';

//componets
import Movil from './Movil';
import Desktop from './Desktop';

const Info = () => {
  return (
    <section className="info-container col-12 text-center float-right product-description ">
      <div className="main-sin-scroll">
        <Link
          to="/"
          title="Go to back"
          className="ml-3 mt-3"
          style={{
            color: 'white',
            fontSize: 18,
            cursor: 'pointer',
            textAlign: 'left',
            position: 'fixed',
            zIndex: '20'
          }}
        >
          X
        </Link>

        <div className="d-md-none h-100 d-sm-block " id="mobil-design">
          <Movil />
        </div>

        <div className="d-none d-md-block d-sm-none mt-3" id="desktop-design">
          <Desktop />
        </div>
      </div>
    </section>
  );
};

export default Info;
