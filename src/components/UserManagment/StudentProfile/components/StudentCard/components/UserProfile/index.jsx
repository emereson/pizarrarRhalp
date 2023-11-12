import React from 'react';
import styles from './styles/styles.module.scss';
import LoadingSpinner from 'components/common/LoadingSpinner';
import FormNotification from 'components/common/FormNotification/FormNotification';
import UserSettings from '../UserSettings';
// import '../../../../StudentProfile.scss';

export const UserProfile = ({
  isUsingCamera,
  userData,
  setUserData,
  errors,
  setErrors,
  ShowChangePassword,
  setShowChangePassword,
  updatingPicture
}) => {
  const handleInputChange = evt => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const getFirstError = () => {
    const error = Object.entries(errors).find(([, value]) => value !== '');
    return error ? error[1] : '';
  };

  return (
    <div>
      {!isUsingCamera && (
        <div className={styles.userData}>
          <UserSettings
            userData={userData}
            handleInputChange={handleInputChange}
            errors={errors}
            setErrors={setErrors}
            showChangePassword={ShowChangePassword}
            setShowChangePassword={setShowChangePassword}
          />
        </div>
      )}
      <div className={styles.save}>
        <div>
          {updatingPicture ? (
            <LoadingSpinner />
          ) : (
            <button type="submit" className={styles.saveButton}>
              save
            </button>
          )}
        </div>
        <div className={styles.formNotification}>
          <FormNotification show={getFirstError} color="#2605fb">
            {getFirstError()}
          </FormNotification>
        </div>
      </div>
    </div>
  );
};
