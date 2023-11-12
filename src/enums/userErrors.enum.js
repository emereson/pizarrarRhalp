export const userErrors = {
  DEFAULT_ERROR: '*An error occurred, please contact the administrator',
  WRONG_EMAIL_MSG: '*enter a valid email address',
  WRONG_PASSWORD_MSG: '*passwords must be the same',
  WRONG_PASSWORD_LENGTH: '*password must be at least 6 characters long',
  USER_ALREADY_EXIST: '*User already exist',
  REQUIRED_ERROR: 'required',
  INVALID_CODE_ERROR: '*Invalid code, try again please',
  LOGIN_ERROR: '*Invalid username or password',
  LIMIT_EXCEEDED_ERROR: '*Limit tries exceeded try again in a couple of minutes',
  USER_NOT_FOUND: '*User not found',
  CODE_MISMATCH: '*Invalid verification code provided, please try again.',
  NOT_AUTHORIZED: '*Wrong password.'
};

export const errorTypes = {
  USER: 'USER',
  PASSWORD: 'PASSWORD',
  EMAIL: 'EMAIL',
  SERVER_ERROR: 'SERVER_ERROR',
  NOT_AUTHORIZED: 'NOT_AUTHORIZED'
};

export const AWS_COGNITO_ERROR_CODES = {
  USER_NOT_FOUND: 'UserNotFoundException',
  LIMIT_EXCEEDED: 'LimitExceededException',
  CODE_MISMATCH: 'CodeMismatchException',
  USERNAME_EXIST: 'UsernameExistsException',
  USER_NOT_CONFIRMED: 'UserNotConfirmedException',
  NOT_AUTHORIZED: 'NotAuthorizedException'
};
