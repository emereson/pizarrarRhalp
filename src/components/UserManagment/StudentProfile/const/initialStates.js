import { errorTypes } from 'enums/userErrors.enum';

export const INITIAL_USER_DATA = {
  user: '',
  currentPassword: '',
  newPassword: '',
  repeatNewPassword: ''
};

export const INITIAL_ERRORS = {
  username: '',
  profilePicture: '',
  [errorTypes.PASSWORD]: '',
  serverError: ''
};
