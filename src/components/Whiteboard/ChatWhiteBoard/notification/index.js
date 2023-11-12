import React from 'react';
import whatsapp from 'assets/icons/contact/contact-whatsapp.svg';
import '../ChatWhiteboard.css';
import { Link } from 'react-router-dom';

//contact
export default function Notification() {
  return (
    <div className="notification">
      <p>
        We will be with you in a moment, but if you want a direct contact rigth now{' '}
        <Link to="/contact">
          <img src={whatsapp} /> <b>809-835-9644</b>{' '}
        </Link>{' '}
        <br />
        You numbre...
        <br />
        Name...
      </p>
    </div>
  );
}
