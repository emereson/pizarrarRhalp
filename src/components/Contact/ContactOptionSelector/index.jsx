import React, { Fragment } from 'react';
/** @jsxImportSource @emotion/react */
import { imgIco, textIco } from './styles';
import { optionsTop, optionsDown, onlyMail } from './utils';
import { withRouter } from 'react-router-dom';
import './styles.css';

const ContactOptionSelector = ({ history, match }) => {
  const renderRow = list => {
    return list.map(option => {
      const { img, text, alt, type, href, link } = option;
      if (type === 'href') {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <a href={href} style={{ alignSelf: 'center' }}>
              <img alt={alt} src={img} css={imgIco} />
            </a>
            <div css={textIco}>{text}</div>
          </div>
        );
      } else if (type === 'link') {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img
              alt={alt}
              src={img}
              css={imgIco}
              onClick={() => history.push(`${match.path}${link}`)}
            />
            <div css={textIco}>{text}</div>
          </div>
        );
      } else {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img alt={alt} src={img} css={imgIco} onClick={() => {}} />
            <div css={textIco}>{text}</div>
          </div>
        );
      }
    });
  };

  return (
    <Fragment>
      <div>
        <div style={{ cursor: 'pointer' }} onClick={() => history.push(`/`)}>
          <p className="go-to-back">Back</p>
        </div>
      </div>
      <div className="divContent">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            paddingBottom: '3em'
          }}
        >
          {renderRow(optionsTop)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {renderRow(optionsDown)}
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(ContactOptionSelector);
