import { BackgroundTool } from './components/BackgroundTool';
import ProfilePicture from './components/ProfilePicture';
import CrystalButton from 'components/common/CrystalButton/CrystalButton';
import { Link } from 'react-router-dom';

import {
  useUserRole,
  updateUserAttributes,
  getCurrentUser
} from 'services/cognito.service';
import { useUser } from 'components/UserManagment/UserProvider';
import React, { useState, useRef } from 'react';
import { errorTypes, userErrors } from '../../../../../enums/userErrors.enum';
import editProfileIcon from '../../assets/edit-profile-icon.png';
import {
  isPasswordLongEnough,
  isPasswordValid
} from 'components/UserManagment/validators';
import { UseUpdateUserPassword } from 'components/UserManagment/hooks/useUpdateUserPassword';

import styles from './style/styles.module.scss';
import '../../StudentProfile.scss';

import { UserProfile } from './components/UserProfile';

import RenderUploadPictureOptions from './components/RenderUploadPictureOptions/index';

export const StudentCard = ({ isEditMode, setIsEditMode }) => {
  const userRole = useUserRole();
  const { user, setUser, uploadProfilePicture, updatingPicture } = useUser();
  const avatarRef = useRef(null);
  const [isUsingCamera, setIsUsingCamera] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [profilePictureBlob, setProfilePictureBlob] = useState(null);
  const [ShowChangePassword, setShowChangePassword] = useState(false);
  const { updateCredentials } = UseUpdateUserPassword();

  const INITIAL_USER_DATA = {
    user: '',
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  };

  const INITIAL_ERRORS = {
    username: '',
    profilePicture: '',
    [errorTypes.PASSWORD]: '',
    serverError: ''
  };

  const [userData, setUserData] = useState(INITIAL_USER_DATA);
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  // const handleInputChange = evt => {
  //     const { name, value } = evt.target;
  //     setUserData({
  //       ...userData,
  //       [name]: value
  //     });
  //   };

  const clearState = () => {
    setUserData(INITIAL_USER_DATA);
    setErrors(INITIAL_ERRORS);
  };

  const onSelectImageHandler = async e => {
    const blob = e.target.files[0];
    if (blob.type.match(/image.*/)) {
      const previewImage = URL.createObjectURL(blob);
      setPreviewImage(previewImage);
      setProfilePictureBlob(blob);
    } else {
      alert('Select an image file');
    }
  };

  const clickOnPicture = () => {
    if (isEditMode && !isUsingCamera) {
      const element = document.getElementById('upload-profile-picture');
      element.click();
    }
  };

  // const getFirstError = () => {
  //   const error = Object.entries(errors).find(([, value]) => value !== '');
  //   return error ? error[1] : '';
  // };

  const validateForm = formData => {
    const foundErrors = {};
    const shouldValidate = userData.currentPassword !== '';
    if (!shouldValidate) {
      return false;
    }
    if (!isPasswordLongEnough(formData.newPassword)) {
      foundErrors[errorTypes.PASSWORD] = userErrors.WRONG_PASSWORD_LENGTH;
    }
    if (!isPasswordValid(formData.newPassword, formData.repeatNewPassword)) {
      foundErrors[errorTypes.PASSWORD] = userErrors.WRONG_PASSWORD_MSG;
    }
    setErrors(foundErrors);
    return Object.keys(foundErrors).length > 0;
  };

  const updateUserData = async () => {
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

  const getAvatarBlob = () => {
    return new Promise(resolve => {
      const canvas = avatarRef.current?.getImageScaledToCanvas();
      if (canvas) {
        canvas.toBlob(blob => {
          resolve(blob);
        });
      }
    });
  };

  const updateProfilePictureFlow = async () => {
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

  const updateUserPassword = async () => {
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

  const submitUserDataHandler = async e => {
    e.preventDefault();
    setErrors({});
    const hasErrors = validateForm(userData);
    if (!hasErrors) {
      try {
        await Promise.all([updateUserData(), updateProfilePictureFlow()]);
        const shouldUpdatePassword = userData.currentPassword !== '';
        shouldUpdatePassword && (await updateUserPassword());
        if (isUsingCamera) {
          setIsUsingCamera(false);
        } else {
          setIsEditMode(false);
        }
        clearState();
      } catch (error) {
        setIsEditMode(true);
      }
    }
  };

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={submitUserDataHandler}
        className={isEditMode ? styles.container : null}
      >
        <div className={isEditMode ? styles.divTop : null}>
          <ProfilePicture
            ref={avatarRef}
            setProfilePictureBlob={setProfilePictureBlob}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            isEditMode={isEditMode}
            isUsingCamera={isUsingCamera}
            setIsUsingCamera={setIsUsingCamera}
            setIsEditMode={setIsEditMode}
            clickOnPicture={clickOnPicture}
          />
        </div>
        {!isEditMode ? (
          <div>
            <div className={styles.userName}>
              <p>
                <CrystalButton type="button">
                  <img
                    className={styles.imgPencil}
                    onClick={() => {
                      setIsEditMode(true);
                    }}
                    style={{ opacity: isEditMode ? 0 : 1 }}
                    src={editProfileIcon}
                    alt="Edit your profile"
                    title="edit your profile"
                  />
                </CrystalButton>
                {user.attributes.name.length > 15
                  ? user.attributes.name.slice(0, 15)
                  : user.attributes.name}
              </p>
            </div>
          </div>
        ) : (
          <div>
            {isEditMode && !isUsingCamera && (
              <RenderUploadPictureOptions
                clearState={clearState}
                setIsUsingCamera={setIsUsingCamera}
                setPreviewImage={setPreviewImage}
                setProfilePictureBlob={setProfilePictureBlob}
                onSelectImageHandler={onSelectImageHandler}
              />
            )}
            {
              <UserProfile
                isUsingCamera={isUsingCamera}
                userData={userData}
                setUserData={setUserData}
                errors={errors}
                setErrors={setErrors}
                ShowChangePassword={ShowChangePassword}
                setShowChangePassword={setShowChangePassword}
                updatingPicture={updatingPicture}
                submitUserDataHandler={submitUserDataHandler}
              />
            }
          </div>
        )}
      </form>
    </>
  );
};
