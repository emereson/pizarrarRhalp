import {
  userErrors,
  AWS_COGNITO_ERROR_CODES,
  errorTypes
} from '../enums/userErrors.enum';

export const handleCognitoError = error => {
  switch (error.code) {
    case AWS_COGNITO_ERROR_CODES.USER_NOT_FOUND: {
      return { type: errorTypes.USER, message: userErrors.USER_NOT_FOUND };
    }
    case AWS_COGNITO_ERROR_CODES.LIMIT_EXCEEDED: {
      return { type: errorTypes.SERVER_ERROR, message: userErrors.LIMIT_EXCEEDED_ERROR };
    }
    case AWS_COGNITO_ERROR_CODES.CODE_MISMATCH: {
      return { type: errorTypes.SERVER_ERROR, message: userErrors.CODE_MISMATCH };
    }
    case AWS_COGNITO_ERROR_CODES.USERNAME_EXIST: {
      return { type: errorTypes.SERVER_ERROR, message: userErrors.USER_ALREADY_EXIST };
    }
    case AWS_COGNITO_ERROR_CODES.NOT_AUTHORIZED: {
      return { type: errorTypes.NOT_AUTHORIZED, message: userErrors.NOT_AUTHORIZED };
    }
    default: {
      return { type: errorTypes.SERVER_ERROR, message: userErrors.DEFAULT_ERROR };
    }
  }
};
