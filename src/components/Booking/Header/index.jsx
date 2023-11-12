// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxImportSource @emotion/react */
import {
  header,
  time_container,
  title,
  backText,
  text_title,
  titleContainer
} from './styles';
import { withRouter } from 'react-router-dom';
import { title_text } from 'appStyles';
import Clock from 'react-live-clock';

const Header = ({ history }) => {
  return (
    <div css={header} style={{ maxHeight: window.innerWidth < 750 ? '2vh' : 'inherit' }}>
      <div style={{ cursor: 'pointer' }} onClick={() => history.push(`/`)}>
        <p css={backText} style={{ color: 'white', fontSize: 16 }}>
          Back
        </p>
      </div>
      <div css={titleContainer}>
        <h1 className="booking-title" id="booking-title">
          What do you want to book ?
        </h1>
      </div>
      <div css={time_container}>
        <h1 css={title} style={{ marginRight: 5, marginBottom: 0 }}>
          Branak time:
        </h1>
        <Clock format={'h:mm:ss a'} ticking={true} timezone={'America/Santo_Domingo'} />
      </div>
    </div>
  );
};

export default withRouter(Header);
