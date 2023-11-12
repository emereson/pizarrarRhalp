// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import FormContainer from './FormContainer';
import FormNotification from '../common/FormNotification/FormNotification';
import * as cognitoService from '../../services/cognito.service';
import InLineInput from './InlineInput';
import { Link, Redirect } from 'react-router-dom';
import {
  isPasswordLongEnough,
  isPasswordValid,
  validateRequiredFields
} from './validators';
import { errorTypes, userErrors } from '../../enums/userErrors.enum';
import { userOptions } from './styles';
import { handleCognitoError } from '../../utils/awsCognito';
import { UseUpdateUserPassword } from './hooks/useUpdateUserPassword';

const UpdatePassword = () => {
  const [userData, setUserData] = useState({
    user: '',
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    serverError: ''
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { updateCredentials } = UseUpdateUserPassword();

  const validateForm = formData => {
    const foundErrors = {};
    if (!isPasswordLongEnough(formData.newPassword)) {
      foundErrors[errorTypes.PASSWORD] = userErrors.WRONG_PASSWORD_LENGTH;
    }
    if (!isPasswordValid(formData.newPassword, formData.repeatNewPassword)) {
      foundErrors[errorTypes.PASSWORD] = userErrors.WRONG_PASSWORD_MSG;
    }
    const requiredErrors = validateRequiredFields(formData, [
      'user',
      'currentPassword',
      'newPassword',
      'repeatNewPassword'
    ]);
    Object.assign(foundErrors, requiredErrors);
    setErrors(foundErrors);
    return Object.keys(foundErrors).length > 0;
  };

  const login = async (username, password) => {
    try {
      return await cognitoService.login({ username, password });
    } catch (error) {
      const cognitoError = handleCognitoError(error);
      setErrors({
        [cognitoError.type]: cognitoError.message
      });
      throw error;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isInValid = validateForm(userData);
    if (isInValid) {
      return;
    }
    try {
      setErrors({});
      await login(userData.user, userData.currentPassword);
      await updateCredentials(userData.currentPassword, userData.newPassword);
      setUpdateSuccess(true);
    } catch (error) {
      setUpdateSuccess(false);
    }
  };

  const handleInputChange = evt => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  if (updateSuccess) {
    return <Redirect to="/login?title=your password has been changed" />;
  }

  const renderUserError = () => {
    return (
      <Fragment>
        <h1
          className="text-center"
          css={css`
            font-size: 1.2rem;
          `}
        >
          Wrong user or password
        </h1>
        <p className="p-2">
          {" reenter, or recover your password in 'forgot password' or get registered"}
        </p>
      </Fragment>
    );
  };

  const isUserCredentialsError = () => {
    return errors[errorTypes.USER] || errors[errorTypes.NOT_AUTHORIZED];
  };

  return (
    <FormContainer width={'33rem'} tall onSubmit={handleSubmit}>
      {isUserCredentialsError() ? (
        renderUserError()
      ) : (
        <p className="text-center" style={{ fontSize: '1.5rem' }}>
          Change password
        </p>
      )}
      <div className="inputsContainer" style={{ marginTop: '50px' }}>
        <InLineInput
          label="Mail"
          noMargin
          type="text"
          id="user"
          name="user"
          value={userData.user}
          hasError={errors.user}
          onChange={handleInputChange}
        ></InLineInput>
        <InLineInput
          label="Current password"
          type="password"
          noMargin
          id="currentPassword"
          name="currentPassword"
          value={userData.currentPassword}
          hasError={errors.currentPassword}
          onChange={handleInputChange}
        ></InLineInput>
        <InLineInput
          label="New Password"
          type="password"
          id="newPassword"
          name="newPassword"
          noMargin
          value={userData.newPassword}
          hasError={errors.newPassword}
          onChange={handleInputChange}
        ></InLineInput>
        <InLineInput
          label="New Password"
          type="password"
          id="repeatNewPassword"
          name="repeatNewPassword"
          noMargin
          value={userData.repeatNewPassword}
          hasError={errors.repeatNewPassword}
          onChange={handleInputChange}
        ></InLineInput>
        <FormNotification
          show={errors[errorTypes.PASSWORD]}
          className="pl-1 text-left mt-3 mb-1"
        >
          {errors[errorTypes.PASSWORD] || userErrors.WRONG_PASSWORD_MSG}
        </FormNotification>
        <FormNotification
          show={errors[errorTypes.SERVER_ERROR]}
          className="pl-1 text-left"
        >
          {errors[errorTypes.SERVER_ERROR]}
        </FormNotification>
      </div>
      <div className="d-flex justify-content-between p-2 " css={userOptions}>
        <Link className="login-form-links" to="/forgot-password">
          Forgot password
        </Link>
        <Link className="login-form-links" to="/sign-up">
          Register
        </Link>
        <button className="login-form-links" type="submit">
          Enter
        </button>
      </div>
    </FormContainer>
  );
};

export default UpdatePassword;
