// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import FormContainer from './FormContainer';
/** @jsxImportSource @emotion/react */
import { userOptions } from './styles';
import InLineInput from './InlineInput';
import FormNotification from '../common/FormNotification/FormNotification';
import * as cognitoService from '../../services/cognito.service';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { useUser } from './UserProvider';
import { useQuery } from '../../hooks/useQuery';
import { AWS_COGNITO_ERROR_CODES, errorTypes } from '../../enums/userErrors.enum';
import { validateRequiredFields } from './validators';
import keyIcon from '../../assets/icons/key1.svg';
import './styles.css';
import LoadingSpinner from '../common/LoadingSpinner';
import CrystalButton from '../common/CrystalButton/CrystalButton';
import { useEffect } from 'react';
import { isUserAdmin } from '../../services/cognito.service';

const Login = ({ unhideIcons, hideIcons }) => {
  const query = useQuery();
  const history = useHistory();
  let location = useLocation();
  const { setUser } = useUser();
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = evt => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  useEffect(() => {
    hideIcons();
  }, []);

  const validateForm = formData => {
    const foundErrors = validateRequiredFields(formData, ['username', 'password']);
    setErrors(foundErrors);
    return Object.keys(foundErrors).length > 0;
  };

  const redirectUser = async from => {
    history.replace(from);
  };

  const login = async ({ username, password }) => {
    try {
      const isInValid = validateForm(userData);
      if (isInValid) {
        return;
      }
      setIsRequestSent(true);
      const user = await cognitoService.login({ username, password });
      setUser(user);
      //no tocar es para la conexion de video y voice twilio **MEJORAR A CUSTOM HOOKS
      window.sessionStorage.setItem('state_video_call', 'disconected');
      window.sessionStorage.setItem('state_voice_call', 'disconected');
      setIsRequestSent(false);
      const isAdmin = await isUserAdmin();
      let { from } = location.state || {
        from: { pathname: isAdmin ? '/admin-chat' : '/student-profile' }
      };

      redirectUser(from);
    } catch (error) {
      if (error.code === AWS_COGNITO_ERROR_CODES.USER_NOT_CONFIRMED) {
        return history.push(`/confirm-user/${username}`);
      }
      setErrors({
        [errorTypes.USER]: error
      });
      setIsRequestSent(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!isRequestSent) {
      login({ username: userData.username, password: userData.password });
    }
  };

  return (
    <FormContainer
      width={'30rem'}
      unhideIcons={unhideIcons}
      short
      onSubmit={handleSubmit}
    >
      <p className="text-center">{query.get('title')}</p>
      <div className="container d-flex flex-column">
        <div className="movillogin">
          <InLineInput
            label="User"
            type="text"
            id="username"
            name="username"
            value={userData.username}
            hasError={errors.username}
            onChange={handleInputChange}
          ></InLineInput>
          <InLineInput
            label="Password"
            type="password"
            id="password"
            name="password"
            value={userData.password}
            hasError={errors.password}
            onChange={handleInputChange}
          ></InLineInput>
        </div>
        <div
          className="text-center d-flex flex-column align-items-center"
          style={{ marginTop: 10 }}
        >
          <CrystalButton className="text-center text-white" type="submit">
            {isRequestSent ? (
              <LoadingSpinner></LoadingSpinner>
            ) : (
              <img alt="key" src={keyIcon} className="login-key-icon" />
            )}
          </CrystalButton>
        </div>
        <FormNotification
          show={errors[errorTypes.USER] && !isRequestSent ? true : false}
          className="text-center"
        >
          Wrong user or password <br />
          {"recover you password in 'forgot password', or register"}
        </FormNotification>
      </div>
      <div className="d-flex justify-content-between p-2 " css={userOptions}>
        <Link className="login-form-links" to="/forgot-password">
          Forgot password
        </Link>
        <Link className="login-form-links" to="/update-password">
          Change password
        </Link>
        <Link className="login-form-links" to="/sign-up">
          Register
        </Link>
      </div>
    </FormContainer>
  );
};

export default Login;
