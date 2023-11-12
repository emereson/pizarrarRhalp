import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import keyIco from 'assets/icons/key1.svg';

import bookingIco from 'assets/icons/bookingluz1.svg';
import shareIco from 'assets/icons/share1.svg';
import infoIco from 'assets/icons/information1.svg';
import contactIco from 'assets/icons/envelope1.svg';
import companiesIco from 'assets/icons/companies1.svg';

const HomeIcon = ({ Width, status }) => {
  const [containerBox, setcontainerBox] = useState(100);

  useEffect(() => {
    if (Width) {
      setcontainerBox(100);
    }
  }, [Width]);

  return (
    <div id={!status ? 'icon-container' : 'icon-container-s'}>
      <div id="horizontal-layout">
        <div className="icon-column">
          <div className="icon">
            <div className="icon-content text-center" id="svg-program-1">
              <Link to="/booking">
                <img
                  style={{ width: '60px', height: '60px' }}
                  src={bookingIco}
                  alt=""
                  id="booking-img"
                />
                <div className="icon-text icon-text-align">Booking</div>
                <div className="icon-tooltip">request a code</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="icon-column">
          <div className="icon" id="key">
            <div className="icon-content" id="svg-key-1">
              <Link to="/login" className="classroom">
                <div className="pointer text-center">
                  <img
                    style={{ width: '60px', height: '60px' }}
                    src={keyIco}
                    alt=""
                    className="m-auto"
                    id="key-img"
                  />
                </div>
                <div className="icon-text icon-text-align">ClassRoom</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="icon-column">
          <div className="icon">
            <div
              className="icon-content information-icon text-center"
              id="svg-information-1"
            >
              <Link to="/info">
                <img
                  style={{ width: '60px', height: '60px' }}
                  src={infoIco}
                  alt=""
                  id="info-img"
                />
                <div className="icon-text icon-text-align">Info</div>
                <div className="icon-tooltip">request a code</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="icon-column">
          <div className="icon">
            <div className="icon-content text-center" id="svg-companies-1">
              <Link to="/companies">
                <img
                  style={{ width: '60px', height: '60px' }}
                  src={companiesIco}
                  alt=""
                  id="companies-img"
                />
                <div className="icon-text icon-text-align">Companies</div>
                <div className="icon-tooltip">request a code</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="icon-column">
          <div className="icon">
            <div className="icon-content text-center" id="svg-envelope-1">
              <Link to="/contact">
                <img
                  style={{ width: '60px', height: '60px' }}
                  src={contactIco}
                  alt=""
                  id="contact-img"
                />
                <div className="icon-text icon-text-align-contact">Contact</div>
                <div className="icon-tooltip">request a code</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="icon-column">
          <div className="icon">
            <div className="icon-content text-center" id="svg-share-1">
              <Link to="/share">
                <img
                  style={{ width: '60px', height: '60px' }}
                  src={shareIco}
                  alt=""
                  id="share-img"
                />
                <div className="icon-text icon-text-align">Share</div>
                <div className="icon-tooltip">request a code</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeIcon;
