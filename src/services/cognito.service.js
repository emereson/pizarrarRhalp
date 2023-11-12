import { Auth, API } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { USER_ROLES } from '../enums/constants.enum';
import HTTP from '../services/conn';
import { isTeacher, getAdminSecret } from '../utils/util';
import constants from '../enums/constants.enum';

const API_NAME = 'AdminQueries';

export async function signUp({ username, password, attributes }) {
  try {
    return await Auth.signUp({
      username: username.replace(constants.TEACHER_REGEX, '').toLowerCase(),
      password,
      attributes: {
        email: attributes.email.replace(constants.TEACHER_REGEX, ''),
        name: attributes.name
      }
    });
  } catch (error) {
    console.log('error signing up:', error);
    throw error;
  }
}

export async function confirmSignUp({ username, code }) {
  try {
    return await Auth.confirmSignUp(username.replace(constants.TEACHER_REGEX, ''), code, {
      clientMetadata: {
        isTeacher: isTeacher(username).toString(),
        adminSecret: getAdminSecret(username)
      }
    });
  } catch (error) {
    console.log('error confirming sign up', error);
    throw error;
  }
}

export async function updatePassword({ oldPassword, newPassword }) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.changePassword(user, oldPassword, newPassword);
  } catch (error) {
    console.log('error updating password', error);
    throw error;
  }
}

export async function forgotPassword(username) {
  try {
    return await Auth.forgotPassword(username);
  } catch (error) {
    console.log('error forgot password request', error);
    throw error;
  }
}

export async function forgotPasswordSubmit({ username, code, newPassword }) {
  try {
    return await Auth.forgotPasswordSubmit(username, code, newPassword);
  } catch (error) {
    console.log('error forgot password submit', error);
    throw error;
  }
}

export const login = async ({ username, password }) => {
  try {
    return await Auth.signIn(username.toLowerCase(), password);
  } catch (error) {
    console.log('error signing in', error);
    throw error;
  }
};

export const uploadAvatar = async ({ avatar, user }) => {
  const response = await HTTP.post('user/avatar', { avatar, user });
  return response.data;
};

export const listUsersInGroup = async groupName => {
  let path = '/listUsersInGroup';
  let params = {
    queryStringParameters: {
      groupname: groupName
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
    }
  };
  const response = await API.get(API_NAME, path, params);
  return response;
};

export const deleteUser = async userName => {
  let path = '/deleteUser';
  let params = {
    body: {
      username: userName
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
    }
  };
  return await API.post(API_NAME, path, params);
};

export const getCurrentUser = (noCache = false) => {
  return Auth.currentAuthenticatedUser({
    bypassCache: noCache
  });
};

export const getUserAccessToken = async () => {
  try {
    const user = await getCurrentUser();
    const token = user.signInUserSession.accessToken.jwtToken;
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const getUserIdToken = async () => {
  try {
    const user = await getCurrentUser();
    const token = user.signInUserSession.idToken.jwtToken;
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const isUserAdmin = async () => {
  const user = await getCurrentUser();
  const userGroups = user.signInUserSession.idToken.payload['cognito:groups'] || [];
  return userGroups.includes('administrators');
};

export const isUserTeacher = async () => {
  const user = await getCurrentUser();
  const userGroups = user.signInUserSession.idToken.payload['cognito:groups'] || [];
  return userGroups.includes('teachers');
};

export const isUserStudent = async () => {
  const user = await getCurrentUser();
  const userGroups = user.signInUserSession.idToken.payload['cognito:groups'] || [];
  return userGroups.includes('students');
};

export const updateUserAttributes = async attributes => {
  const user = await getCurrentUser();
  return Auth.updateUserAttributes(user, attributes);
};

// Custom hook - returns userRole [Admins , teachers, students]
export const useUserRole = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const initUserRole = async () => {
      try {
        const [isAdmin, isTeacher] = await Promise.all([isUserAdmin(), isUserTeacher()]);
        if (isAdmin) {
          setUserRole(USER_ROLES.ADMINS);
        } else if (isTeacher) {
          setUserRole(USER_ROLES.TEACHERS);
        } else {
          setUserRole(USER_ROLES.STUDENTS);
        }
      } catch (err) {
        console.error(err);
      }
    };
    initUserRole();
  }, []);

  return userRole;
};
