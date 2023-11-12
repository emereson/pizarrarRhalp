// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import FormContainer from './FormContainer';
import FormNotification from '../common/FormNotification/FormNotification';
import * as cognitoService from '../../services/cognito.service';
import InLineInput from './InlineInput';
import { userErrors } from '../../enums/userErrors.enum';
import {
  isPasswordLongEnough,
  isPasswordValid,
  validateRequiredFields
} from './validators';
import { handleCognitoError } from '../../utils/awsCognito';
import { errorTypes } from '../../enums/userErrors.enum';
import { useHistory } from 'react-router-dom';
import { userOptions } from './styles';

const ForgotPassword = () => {
  const history = useHistory();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    code: '',
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validatePasswordSubmit = formData => {
    const foundErrors = {};
    if (!isPasswordLongEnough(formData.newPassword)) {
      foundErrors[errorTypes.PASSWORD] = userErrors.WRONG_PASSWORD_LENGTH;
    }
    if (!isPasswordValid(formData.newPassword, formData.repeatNewPassword)) {
      foundErrors[errorTypes.PASSWORD] = userErrors.WRONG_PASSWORD_MSG;
    }
    const requiredErrors = validateRequiredFields(formData, [
      'code',
      'newPassword',
      'repeatNewPassword'
    ]);
    Object.assign(foundErrors, requiredErrors);
    setErrors(foundErrors);
    return Object.keys(foundErrors).length > 0;
  };

  const validatePasswordRequest = formData => {
    const requiredErrors = validateRequiredFields(formData, ['username']);
    setErrors(requiredErrors);
    return Object.keys(requiredErrors).length > 0;
  };

  const handlePasswordRequest = async e => {
    e.preventDefault();
    try {
      setErrors({});
      const isInValid = validatePasswordRequest(userData);
      if (isInValid) {
        return;
      }
      await cognitoService.forgotPassword(userData.username);
      setIsCodeSent(true);
    } catch (error) {
      const cognitoError = handleCognitoError(error);
      setErrors({
        [cognitoError.type]: cognitoError.message
      });
      setIsCodeSent(false);
    }
  };

  const handlePasswordSubmit = async e => {
    e.preventDefault();
    try {
      setErrors({});
      const isInValid = validatePasswordSubmit(userData);
      if (isInValid) {
        return;
      }
      await cognitoService.forgotPasswordSubmit({
        username: userData.username,
        code: userData.code,
        newPassword: userData.newPassword
      });
      history.push('/login?Password updated');
    } catch (error) {
      const cognitoError = handleCognitoError(error);
      setErrors({
        [cognitoError.type]: cognitoError.message
      });
    }
  };

  const handleInputChange = evt => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const renderForgotPassword = () => {
    return (
      <FormContainer width={'30rem'} short onSubmit={handlePasswordRequest}>
        <p
          className="p-3 text-center mb-0"
          style={{ marginTop: '15px', fontSize: '1.4rem' }}
        >
          Forgot Password?
        </p>
        <p className="p-3 text-center mb-0" style={{ fontSize: '1.35rem' }}>
          {errors[errorTypes.USER]
            ? "Sorry, we don't have any account registered with that mail address. Correct, or register one"
            : 'Type here the email you used to register, we will send you a verification code to update your password'}
        </p>
        <div className="container d-flex flex-column justify-content-center">
          <InLineInput
            label="mail"
            type="text"
            mas="true"
            id="username"
            name="username"
            value={userData.username}
            hasError={errors.username}
            onChange={handleInputChange}
          ></InLineInput>
        </div>
        <FormNotification
          show={errors[errorTypes.SERVER_ERROR]}
          className="pl-2 text-left"
        >
          {errors[errorTypes.SERVER_ERROR]}
        </FormNotification>
        <div className="d-flex justify-content-end p-2 pl-3 pr-3" css={userOptions}>
          <button className="login-form-links" type="submit">
            Send
          </button>
        </div>
      </FormContainer>
    );
  };

  const renderForgotPasswordSubmit = () => {
    return (
      <FormContainer width={'30rem'} height={'400px'} onSubmit={handlePasswordSubmit}>
        <p className="pl-2 login-form-links" style={{ marginTop: '20px' }}>
          We sent a code to {userData.username}
        </p>
        <div className="container d-flex flex-column justify-content-center">
          <InLineInput
            label="Code"
            type="text"
            id="code"
            name="code"
            value={userData.code}
            hasError={errors.code}
            onChange={handleInputChange}
          ></InLineInput>
          <InLineInput
            label="New password"
            type="password"
            id="newPassword"
            name="newPassword"
            value={userData.newPassword}
            hasError={errors.newPassword}
            onChange={handleInputChange}
          ></InLineInput>
          <InLineInput
            label="New password"
            type="password"
            id="repeatNewPassword"
            name="repeatNewPassword"
            hasError={errors.repeatNewPassword}
            onChange={handleInputChange}
          ></InLineInput>
        </div>
        <FormNotification show={errors[errorTypes.USER]} className="pl-2 text-left">
          {errors[errorTypes.USER] || userErrors.WRONG_EMAIL_MSG}
        </FormNotification>
        <FormNotification show={errors[errorTypes.PASSWORD]} className="pl-2 text-left">
          {errors[errorTypes.PASSWORD] || userErrors.WRONG_PASSWORD_MSG}
        </FormNotification>
        <FormNotification
          show={errors[errorTypes.SERVER_ERROR]}
          className="pl-2 text-left"
        >
          {errors[errorTypes.SERVER_ERROR]}
        </FormNotification>
        <div className="d-flex justify-content-end p-2" css={userOptions}>
          <button className="login-form-links" type="submit">
            Send
          </button>
        </div>
      </FormContainer>
    );
  };

  if (isCodeSent) {
    return renderForgotPasswordSubmit();
  }
  return renderForgotPassword();
};

export default ForgotPassword;
