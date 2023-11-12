import React from 'react';
import uploadPictureIcon from '../../../../assets/upload-picture-icon.svg';
import takePictureIcon from '../../../../assets/take-picture-icon.svg';
import '../../../../StudentProfile.scss';
import styles from './RenderUploadPicture.module.scss';
import { useUserRole } from 'services/cognito.service';
import { useUser } from 'components/UserManagment/UserProvider';

const RenderUploadPictureOptions = ({
  clearState,
  setIsUsingCamera,
  setPreviewImage,
  setProfilePictureBlob,
  onSelectImageHandler
}) => {
  const userRole = useUserRole();
  const { user } = useUser();
  return (
    <div className={styles.uploadPicture}>
      <div>
        <img
          className={styles.uploadPictureTakePicture}
          src={takePictureIcon}
          onClick={() => {
            clearState();
            setIsUsingCamera(true);
          }}
          alt="take picture with the camera"
          title="take a picture using your camera"
        />
      </div>
      <div className={styles.userData}>
        <p>{user.attributes.name}</p>
        <p>Role: {userRole.toLowerCase()}</p>
      </div>
      <div>
        <label htmlFor="upload-profile-picture">
          <img
            className={styles.uploadPictureTakePicture}
            src={uploadPictureIcon}
            alt="upload a picture"
            title="upload a picture"
          />
        </label>
        <input
          id="upload-profile-picture"
          className={styles.labelInput}
          type="file"
          onChange={onSelectImageHandler}
          onClick={e => {
            e.target.value = null;
          }}
        />
      </div>
    </div>
  );
};

export default RenderUploadPictureOptions;
