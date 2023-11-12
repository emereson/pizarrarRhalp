// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import sendIcon from 'assets/icons/contact/send-icon-white.svg';
import {
  label,
  input,
  section,
  text_area,
  button_contanier,
  text_area_container,
  email_success,
  user_info_container,
  inputError,
  text_area_error,
  showPuntero,
  hiddePuntero
} from './styles';

import { imgIco, textIco } from '../ContactOptionSelector/styles';
import { onlyMail } from '../ContactOptionSelector/utils';
import { sendEmail } from 'services/email';

const Email = () => {
  const [from, setfrom] = useState('');
  const [fromError, setfromError] = useState(false);
  const [sub, setsub] = useState('');
  const [text, settext] = useState('');
  const [textError, setTextError] = useState(false);
  const [emailSentSuccess, setemailSentSuccess] = useState(false);
  const [sendingEmail, setsendingEmail] = useState(false);
  const [onOfCursor, setOnOfCursor] = useState(false);

  useEffect(() => {
    // textAreaRef.focus();
    setOnOfCursor(true);
  }, []);

  const sendEmailRequest = async () => {
    //validacion de los campos del formulario
    if (from === '' || text === '') {
      setfromError(true);
      setTextError(true);
      return;
    }

    setfromError(false);
    setTextError(false);
    setsendingEmail(true);

    const body = {
      type: 'contact',
      subject: sub,
      mailContent: `contact email from ${from} : 
       ${text}`
    };
    try {
      await sendEmail(body);
      setemailSentSuccess(true);
    } catch (error) {
      console.error('error sending contact email');
    }
    cleanState();
  };

  const cleanState = () => {
    setfrom('');
    setsub('');
    settext('');
    setsendingEmail(false);
  };

  const renderTextArea = () => {
    if (sendingEmail) return <div css={email_success}>Sending email ... </div>;
    else if (emailSentSuccess)
      return <div css={email_success}>Email sent successfuly! </div>;
    return (
      <Fragment>
        <span css={onOfCursor ? showPuntero : hiddePuntero}>|</span>
        <textarea
          css={textError ? text_area_error : text_area}
          value={text}
          onChange={e => {
            settext(e.target.value);
            setTextError(false);
          }}
          onClick={() => setOnOfCursor(false)}
        />
        <div css={button_contanier}>
          <img src={sendIcon} alt="send-ico" onClick={() => sendEmailRequest()} />
        </div>
      </Fragment>
    );
  };

  const renderRow = list => {
    return list.map((option, idx) => {
      const { img, alt } = option;

      return (
        <div
          key={idx}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: '10px 10px 5px 10px',
            backgroundColor: 'rgba(84,110,255,.23)',
            width: '90%',
            margin: '0px auto'
          }}
        >
          <img alt={alt} src={img} css={imgIco} onClick={() => {}} />
          <div css={textIco}>Write your message</div>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div>
        <div style={{ cursor: 'pointer' }}>
          <Link to="/contact" className="go-to-back">
            Back
          </Link>
        </div>
      </div>
      {renderRow(onlyMail)}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div css={user_info_container}>
          <div css={section}>
            <label css={label}>From:</label>
            <input
              css={fromError ? inputError : input}
              value={from}
              onChange={e => {
                setemailSentSuccess(false);
                setfromError(false);
                setfrom(e.target.value);
              }}
            />
          </div>
          <div css={section}>
            <label css={label}>To: contact@branak.com</label>
          </div>
          <div css={section}>
            <label css={label}>Sub:</label>
            <input
              css={input}
              value={sub}
              onChange={e => {
                setsub(e.target.value);
              }}
            />
          </div>
        </div>
        <div css={text_area_container}>{renderTextArea()}</div>
      </div>
    </Fragment>
  );
};

export default Email;
