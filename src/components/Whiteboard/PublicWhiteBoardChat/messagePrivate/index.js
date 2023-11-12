import React from 'react';

import '../PublicChat.css';

//contact
export default function MessagePrivate(props) {
  return (
    <div className="message-private">
      <p>
        Private message from:{' '}
        <b onClick={() => props.setUserMessagePrivate(props.message.issuerId)}>
          {props.message.issuer}
        </b>{' '}
        <br />
        {props.message.message}
      </p>
    </div>
  );
}
