// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment } from 'react';
/** @jsxImportSource @emotion/react */
import FormContainer from './FormContainer';
import FormNotification from '../common/FormNotification/FormNotification';
import * as cognitoService from '../../services/cognito.service';
import InLineInput from './InlineInput';
import { subText, userOptions } from './styles';
import { useHistory } from 'react-router-dom';
import {
  validateRequiredFields,
  isEmailValid,
  isPasswordLongEnough,
  isValidPhone,
  isPasswordValid
} from './validators';
import { userErrors, errorTypes } from '../../enums/userErrors.enum';
import { handleCognitoError } from '../../utils/awsCognito';

const SignUp = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: '',
    country: '',
    phone: '',
    username: '',
    password: '',
    repeatPassword: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    country: '',
    phone: '',
    username: '',
    password: '',
    repeatPassword: '',
    serverError: ''
  });

  const validateForm = formData => {
    const foundErrors = {};
    if (!isEmailValid(formData.username)) {
      foundErrors[errorTypes.USER] = userErrors.WRONG_EMAIL_MSG;
    }
    if (!isPasswordLongEnough(formData.password)) {
      foundErrors[errorTypes.PASSWORD] = userErrors.WRONG_PASSWORD_LENGTH;
    }
    if (!isPasswordValid(formData.password, formData.repeatPassword)) {
      foundErrors[errorTypes.PASSWORD] = userErrors.WRONG_PASSWORD_MSG;
    }
    const requiredErrors = validateRequiredFields(formData, ['name', 'country', 'phone']);
    Object.assign(foundErrors, requiredErrors);
    setErrors(foundErrors);

    return Object.keys(foundErrors).length > 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});
    const isInValid = validateForm(userData);
    if (isInValid) {
      return;
    }
    const { username, password } = userData;
    try {
      await cognitoService.signUp({
        username,
        password,
        attributes: {
          email: userData.username,
          name: userData.name,
          locale: userData.country,
          'custom:phone': userData.phone
        }
      });
      return history.push(`/confirm-user/${username}`);
    } catch (error) {
      const cognitoError = handleCognitoError(error);
      setErrors({
        [cognitoError.type]: cognitoError.message
      });
    }
  };

  const handleInputChange = evt => {
    const { name, value } = evt.target;
    if (name === 'phone' && !isValidPhone(value)) {
      return;
    }
    setUserData({
      ...userData,
      [evt.target.name]: value
    });
  };

  return (
    <FormContainer width={'33rem'} tall onSubmit={handleSubmit}>
      <div
        className="container d-flex flex-column justify-content-center"
        style={{ marginTop: '50px' }}
      >
        <p
          className="p-3 text-center mb-0"
          style={{ marginTop: '-30px', fontSize: '1.5rem' }}
        >
          Register
        </p>
        <InLineInput
          label="Name"
          type="text"
          id="name"
          name="name"
          value={userData.name}
          hasError={errors.name}
          onChange={handleInputChange}
        ></InLineInput>
        <InLineInput
          label="Country"
          type="text"
          id="country"
          name="country"
          hasError={errors.country}
          value={userData.country}
          onChange={handleInputChange}
        ></InLineInput>
        <InLineInput
          label={
            <Fragment>
              <span>Phone</span>
              <span className="ml-1" css={subText}>
                (whatsap)
              </span>
            </Fragment>
          }
          type="text"
          id="phone"
          name="phone"
          value={userData.phone}
          hasError={errors.phone}
          onChange={handleInputChange}
        ></InLineInput>
        <InLineInput
          label={
            <Fragment>
              <span>User</span>
              <span className="ml-1" css={subText}>
                (mail)
              </span>
            </Fragment>
          }
          type="email"
          id="username"
          name="username"
          value={userData.username}
          hasError={errors[errorTypes.USER]}
          onChange={handleInputChange}
        ></InLineInput>
        <InLineInput
          label="Password"
          type="password"
          id="password"
          name="password"
          value={userData.password}
          hasError={errors[errorTypes.PASSWORD]}
          onChange={handleInputChange}
        ></InLineInput>
        <InLineInput
          label="Password"
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          value={userData.repeatPassword}
          hasError={errors[errorTypes.PASSWORD]}
          onChange={handleInputChange}
        ></InLineInput>
      </div>
      <FormNotification
        show={errors[errorTypes.USER]}
        className="pl-1 text-left mt-3 mb-1"
      >
        {errors[errorTypes.USER] || userErrors.WRONG_EMAIL_MSG}
      </FormNotification>
      <FormNotification show={errors[errorTypes.PASSWORD]} className="pl-1 text-left">
        {errors[errorTypes.PASSWORD] || userErrors.WRONG_PASSWORD_MSG}
      </FormNotification>
      <FormNotification show={errors[errorTypes.SERVER_ERROR]} className="pl-1 text-left">
        {errors[errorTypes.SERVER_ERROR]}
      </FormNotification>
      <div className="d-flex justify-content-end p-2" css={userOptions}>
        <button className="login-form-links">Register</button>
      </div>
    </FormContainer>
  );
};

export default SignUp;
