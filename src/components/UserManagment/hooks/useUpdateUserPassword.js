import { handleCognitoError } from '../../../utils/awsCognito';
import { updatePassword } from '../../../services/cognito.service';

export const UseUpdateUserPassword = () => {
  const updateCredentials = async (oldPassword, newPassword) => {
    try {
      return await updatePassword({ oldPassword, newPassword });
    } catch (error) {
      console.error(error);
      const cognitoError = handleCognitoError(error);
      throw cognitoError;
    }
  };
  return { updateCredentials };
};
