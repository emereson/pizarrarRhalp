// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {
  booking_container,
  selector_container,
  option_container,
  booking_footer
} from './styles';
import { withRouter, Route, Switch, useLocation } from 'react-router-dom';
import Interview from './Interview';
import Course from './Course';
import Header from './Header';
import OptionSelector from './OptionSelector';
import './style.css';

const Booking = ({ match }) => {
  const location = useLocation();

  return (
    <div css={booking_container}>
      <Header />
      <div className="options-container">
        <OptionSelector />
      </div>
      <div css={option_container}>
        <Switch>
          <Route exact path={`${match.path}/interview`} component={Interview} />
          <Route exact path={`${match.path}/course`} component={Course} />
          <Route exact path={`${match.path}/level-test`} component={Interview} />
          <Route exact path={`${match.path}/special-tutoring`} component={Course} />
        </Switch>
      </div>
      {(location.pathname === '/booking' || location.pathname === '/booking/success') && (
        <div css={booking_footer}>
          <div
            className={`${
              location.pathname === '/booking/success' ? 'blinding' : ''
            } footer-content-booking`}
            style={{ marginBottom: window.innerWidth > 750 ? '8px' : '0' }}
          >
            {location.pathname === '/booking' && (
              <React.Fragment>
                <p
                  style={{
                    fontSize: window.innerWidth < 750 ? '18px' : '19px',
                    marginBottom: 0,
                    marginRight: '15px'
                  }}
                >
                  Summary:
                </p>
                <p
                  style={{
                    fontSize: window.innerWidth < 750 ? '18px' : '19px',
                    marginBottom: 0
                  }}
                >
                  {' '}
                  0 Class booked
                </p>
              </React.Fragment>
            )}
            {location.pathname === '/booking/success' && (
              <p style={{ fontSize: 17 }}>
                Congratulations!!... we will be waiting for you at the time you specified.
                Thank you
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(Booking);
