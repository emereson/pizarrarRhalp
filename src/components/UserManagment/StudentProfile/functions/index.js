import { userErrors, errorTypes } from 'enums/userErrors.enum';
import { UseUpdateUserPassword } from 'components/UserManagment/hooks/useUpdateUserPassword';
import {
  useUserRole,
  updateUserAttributes,
  getCurrentUser
} from 'services/cognito.service';
const { updateCredentials } = UseUpdateUserPassword();

//avatarRef
export const getAvatarBlob = avatarRef => {
  return new Promise(resolve => {
    const canvas = avatarRef.current?.getImageScaledToCanvas();
    if (canvas) {
      canvas.toBlob(blob => {
        resolve(blob);
      });
    }
  });
};

export const updateUserPassword = async (userData, setErrors, errors) => {
  try {
    await updateCredentials(userData.currentPassword, userData.newPassword);
  } catch (error) {
    switch (error.type) {
      case errorTypes.NOT_AUTHORIZED: {
        setErrors({
          ...errors,
          [errorTypes.NOT_AUTHORIZED]: error.message
        });
        break;
      }
      default: {
        setErrors({
          ...errors,
          [errorTypes.PASSWORD]: error.message
        });
      }
    }
    throw error;
  }
};

export const updateUserData = async (userData, user, setUser, setErrors, errors) => {
  try {
    if (userData.user && userData.user !== user.attributes.name) {
      await updateUserAttributes({ name: userData.user });
      const user = await getCurrentUser(true);
      setUser(user);
    }
  } catch (error) {
    console.error(error);
    setErrors({
      ...errors,
      username: error.message
    });
    throw error;
  }
};

export const updateProfilePictureFlow = async (
  avatarRef,
  isUsingCamera,
  setPreviewImage,
  uploadProfilePicture,
  setErrors,
  errors
) => {
  let blob = null;
  try {
    if (isUsingCamera) {
      const webCamPicture = avatarRef.current.getScreenshot();
      const response = await fetch(webCamPicture);
      blob = await response.blob();
      setPreviewImage(URL.createObjectURL(blob));
      window.localStorage.setItem('avatar', URL.createObjectURL(blob));
    } else {
      blob = await getAvatarBlob();
      blob && (await uploadProfilePicture(blob));
      setPreviewImage(null);
    }
  } catch (error) {
    setErrors({
      ...errors,
      profilePicture: error.message
    });
    throw error;
  }
};

export const validateForm = (
  userData,
  isPasswordLongEnough,
  setErrors,
  isPasswordValid
) => {
  const foundErrors = {};
  const shouldValidate = userData.currentPassword !== '';
  if (!shouldValidate) {
    return false;
  }
  if (!isPasswordLongEnough(userData.newPassword)) {
    foundErrors[errorTypes.PASSWORD] = userErrors.WRONG_PASSWORD_LENGTH;
  }
  if (!isPasswordValid(userData.newPassword, userData.repeatNewPassword)) {
    foundErrors[errorTypes.PASSWORD] = userErrors.WRONG_PASSWORD_MSG;
  }
  setErrors(foundErrors);
  return Object.keys(foundErrors).length > 0;
};
