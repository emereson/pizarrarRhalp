// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import constants from '../../enums/constants.enum';
import { isTeacher } from '../../utils/util';
/** @jsxImportSource @emotion/react */
import FormContainer from './FormContainer';
import FormNotification from '../common/FormNotification/FormNotification';
import * as cognitoService from '../../services/cognito.service';
import InLineInput from './InlineInput';
import { subText, userOptions } from './styles';
import { Link, useParams } from 'react-router-dom';
import { handleCognitoError } from '../../utils/awsCognito';
import { userErrors } from '../../enums/userErrors.enum';
import keyIcon from '../../assets/icons/key1.svg';
import bookingIcon from 'assets/icons/booking.svg';

const ConfirmUser = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [userVerified, setUserVerified] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = e => {
    setVerificationCode(e.target.value);
  };
  const { username } = useParams();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await cognitoService.confirmSignUp({ username, code: verificationCode });
      setUserVerified(true);
    } catch (error) {
      const cognitoError = handleCognitoError(error);
      setError(cognitoError.message);
    }
  };

  const renderVerificationForm = () => {
    return (
      <FormContainer rectangular onSubmit={handleSubmit}>
        <p
          className="pl-2"
          style={{ marginTop: '25px', fontSize: '1.2rem', textAlign: 'center' }}
        >
          We sent a confirmation code to {username.replace(constants.TEACHER_REGEX, '')}
        </p>
        <div className="container d-flex flex-column justify-content-center">
          <InLineInput
            label="Enter Code"
            type="text"
            id="verificationCode"
            name="verificationCode"
            value={verificationCode}
            onChange={handleChange}
          ></InLineInput>
          <FormNotification show={error} className="pl-2 text-left">
            {error || userErrors.CODE_MISMATCH}
          </FormNotification>
        </div>
        <div
          className="d-flex justify-content-end p-2 pl-3 pr-3"
          css={userOptions}
          style={{ position: 'relative' }}
        >
          <button className="login-form-links" type="submit">
            Enter
          </button>
        </div>
      </FormContainer>
    );
  };

  const welcomeMessage = username => {
    return isTeacher(username)
      ? 'you are now a teacher of Branak.'
      : 'you are now a student  of Branak. You could speak excellent english in few time';
  };

  const renderSuccessRegistration = () => {
    return (
      <FormContainer width={'30rem'} onSubmit={e => e.preventDefault()}>
        <div className="p-5">
          <p className="text-center">Congratulations</p>
          <p className="text-center">{welcomeMessage(username)}</p>
          <div className="row mt-5">
            <Link className="col-6" to="/login">
              <img alt="key" src={keyIcon} className="Icon-img" />
              <p className="Icon-text mt-3" css={subText}>
                take a class now
              </p>
            </Link>
            <Link className="col-6" to="/booking">
              <img alt="key" src={bookingIcon} className="Icon-img" />
              <p className="Icon-text mt-3" css={subText}>
                program a class for later
              </p>
            </Link>
          </div>
        </div>
      </FormContainer>
    );
  };

  if (!userVerified) {
    return renderVerificationForm();
  } else {
    return renderSuccessRegistration();
  }
};

export default ConfirmUser;
