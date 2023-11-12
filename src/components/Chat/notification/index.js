import React from 'react';
import whatsapp from 'assets/icons/contact/contact-whatsapp.svg';
import '../Chat.css';
import { Link } from 'react-router-dom';

//contact
export default function Notification() {
  return (
    <div className="notification" style={{ padding: '10px 5px' }}>
      <p>
        We will be with you in a moment, but if you want a direct contact rigth now{' '}
        <Link style={{ color: '#fff', textDecoration: 'none' }} to="/contact">
          <img src={whatsapp} /> <b>809-835-9644</b>{' '}
        </Link>{' '}
        <br />
      </p>
      <form className="notification-form">
        <input className="notification-inputs" placeholder="Your Number..." />
        <input className="notification-inputs" placeholder="Your Name..." />
      </form>
    </div>
  );
}
