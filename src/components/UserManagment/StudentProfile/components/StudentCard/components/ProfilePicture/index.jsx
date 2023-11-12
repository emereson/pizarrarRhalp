import React, { useState, forwardRef } from 'react';
import LoadingSpinner from 'components/common/LoadingSpinner';
import AvatarEditor from 'react-avatar-editor';
import ZoomInIcon from '../../../../assets/zoom-in-icon.svg';
import ZoomOutIcon from '../../../../assets/zoom-out-icon.svg';
import erasePictureIcon from '../../../../assets/erase-picture-icon.svg';
import { useUser } from 'components/UserManagment/UserProvider';
import GoBackButton from 'components/common/BackButton/GoBackButton';
import Webcam from 'react-webcam';

const MAX_ZOOM_LEVEL = 3.0;
const MIN_ZOOM_LEVEL = 0.4;

const PictureContainer = ({
  children,
  setIsEditMode,
  setIsUsingCamera,
  showGoBack = true
}) => {
  return (
    <section className="picture-container">
      <div className="picture-container__go-back">
        {showGoBack && (
          <GoBackButton
            purple
            goBackCallback={() => {
              setIsEditMode(false);
              setIsUsingCamera(false);
            }}
          />
        )}
      </div>
      <div className="picture-container__picture mx-auto">{children}</div>
    </section>
  );
};

const ProfilePictureReadMode = () => {
  const { profilePictureUrl, loadingPicture } = useUser();

  const renderPicture = () => (
    <img
      className="read-only-img"
      src={profilePictureUrl}
      crossOrigin="anonymous"
      alt="Picture Profile"
    />
  );

  return (
    <PictureContainer showGoBack={false}>
      {loadingPicture ? null : renderPicture()}
      <div className="picture-circle-shadow" />
    </PictureContainer>
  );
};

// eslint-disable-next-line react/display-name
const WebCamMode = forwardRef(({ setIsEditMode, setIsUsingCamera }, _ref) => {
  const videoConstraints = {
    width: { min: 100 },
    heigth: { min: 100 }
  };

  return (
    <PictureContainer setIsEditMode={setIsEditMode} setIsUsingCamera={setIsUsingCamera}>
      <div className="webcam-container">
        <Webcam
          audio={false}
          className="webcam"
          ref={_ref}
          videoConstraints={videoConstraints}
          onUserMediaError={e => alert(e)}
        />
      </div>
    </PictureContainer>
  );
});

// eslint-disable-next-line react/display-name
const ProfilePictureEditMode = forwardRef(
  (
    { setIsEditMode, previewImage, setPreviewImage, setIsUsingCamera, clickOnPicture },
    _ref
  ) => {
    const [zoomLevel, setZoomLevel] = useState(1.0);
    const { deletePicture, deletingPicture, profilePictureUrl } = useUser();

    const onDeleteHandler = () => {
      if (previewImage) {
        setPreviewImage(null);
      } else {
        deletePicture();
      }
    };

    return (
      <div
        className="edit-mode"
        style={{
          padding: ' 0 3% 0 2.5%'
        }}
      >
        <PictureContainer
          setIsEditMode={setIsEditMode}
          setIsUsingCamera={setIsUsingCamera}
        >
          <div className="erase-picture">
            {deletingPicture ? (
              <LoadingSpinner />
            ) : (
              profilePictureUrl && (
                <img
                  onClick={onDeleteHandler}
                  src={erasePictureIcon}
                  alt="erase picture"
                  title="erase picture"
                />
              )
            )}
          </div>
          <div
            onClick={
              !profilePictureUrl.includes('static') || previewImage
                ? null
                : clickOnPicture
            }
          >
            {
              <AvatarEditor
                image={previewImage || profilePictureUrl}
                crossOrigin="anonymous"
                ref={_ref}
                width={100}
                height={100}
                border={0}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={zoomLevel}
                className={
                  !profilePictureUrl.includes('static') || previewImage
                    ? null
                    : 'editor-container'
                }
                rotate={0}
              />
            }
          </div>
          <img
            className="zoom-control zoom-control--in"
            onClick={() => {
              setZoomLevel(Math.min(zoomLevel + 0.1, MAX_ZOOM_LEVEL));
            }}
            src={ZoomInIcon}
            alt="zoom in"
            title="zoom in"
          />
          <img
            className="zoom-control zoom-control--out"
            onClick={() => {
              setZoomLevel(Math.max(zoomLevel - 0.1, MIN_ZOOM_LEVEL));
            }}
            src={ZoomOutIcon}
            alt="zoom out"
            title="zoom out"
          />
        </PictureContainer>
      </div>
    );
  }
);

// eslint-disable-next-line react/display-name
const ProfilePicture = forwardRef(
  (
    {
      setProfilePictureBlob,
      previewImage,
      setPreviewImage,
      isEditMode,
      setIsEditMode,
      isUsingCamera,
      setIsUsingCamera,
      clickOnPicture
    },
    _ref
  ) => {
    const renderEditMode = () => {
      return isUsingCamera ? (
        <WebCamMode
          setIsEditMode={setIsEditMode}
          setIsUsingCamera={setIsUsingCamera}
          ref={_ref}
        />
      ) : (
        <ProfilePictureEditMode
          setProfilePictureBlob={setProfilePictureBlob}
          setIsEditMode={setIsEditMode}
          isUsingCamera={isUsingCamera}
          setIsUsingCamera={setIsUsingCamera}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          clickOnPicture={clickOnPicture}
          ref={_ref}
        />
      );
    };

    return (
      <div
        className="profile-avatar"
        onClick={
          !isEditMode
            ? () => {
                setIsEditMode(true);
              }
            : null
        }
      >
        {isEditMode ? renderEditMode() : <ProfilePictureReadMode />}
      </div>
    );
  }
);

export default ProfilePicture;
