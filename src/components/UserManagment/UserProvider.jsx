import React, { useState, useEffect, useContext } from 'react';
import { S3Service, ACCESS_LEVELS } from '../../services/S3.service';
import { UPDATE_PROFILE_PICTURE } from './graphQL/mutations';
import { GET_USER } from './graphQL/queries';
import { useMutation, useLazyQuery } from '@apollo/client';
import { v1 as uuidv1 } from 'uuid';

export const userContext = React.createContext(null);
const s3Service = new S3Service();
const DEFAULT_PROFILE_PICTURE = '/static/img/student-profile/default-profile-picture.svg';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingPicture, setLoadingPicture] = useState(true);
  const [updatingPicture, setUpdatingPicture] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [deletingPicture, setDeletingPicture] = useState(false);

  const [updateProfilePictureMutation] = useMutation(UPDATE_PROFILE_PICTURE);
  const [getUser, { data }] = useLazyQuery(GET_USER);

  /**
   * Queries user info
   */
  useEffect(() => {
    if (user) {
      getUser({
        variables: { id: user.attributes?.sub }
      });
    }
  }, [user]);

  /**
   * Sets profilePicture after query results
   */
  useEffect(() => {
    if (data && !updatingPicture) {
      initializeProfilePicture();
    }
  }, [data, updatingPicture]);

  /**
   * Initializes profile picture with the esults from the query
   */
  const initializeProfilePicture = async () => {
    if (data.getUser?.profilePicture) {
      const url = await getProfilePictureUrl(data.getUser?.profilePicture);
      setProfilePictureUrl(url);
    } else {
      setProfilePictureUrl(DEFAULT_PROFILE_PICTURE);
    }
    setLoadingPicture(false);
  };

  /**
   * Deletes profilePicture image from s3 and DynamoDB
   * @returns
   */
  const deletePicture = async () => {
    try {
      setDeletingPicture(true);
      const fileName = data.getUser?.profilePicture;
      fileName && (await s3Service.deleteFileByName(fileName, ACCESS_LEVELS.PROTECTED));
      await updateProfilePictureMutation({
        variables: {
          userId: user.attributes.sub,
          profilePicture: ''
        }
      });
      setProfilePictureUrl(DEFAULT_PROFILE_PICTURE);
    } catch (error) {
      console.error(error);
    }
    setDeletingPicture(false);
  };

  /**
   *
   * @param {String} profilePicture profilePicture name
   * @returns Profile picture presigned url
   */
  const getProfilePictureUrl = async profilePicture => {
    const url = await s3Service.getPresignedUrl(profilePicture, ACCESS_LEVELS.PROTECTED);
    return url;
  };

  /**
   * Uploads an image to s3 and DynamoDB first deleting the old image
   * @param {Blob} blob image to upload
   */
  const uploadProfilePicture = async blob => {
    const name = `profile-picture__${uuidv1()}`;
    try {
      setUpdatingPicture(true);
      const fileName = data.getUser?.profilePicture;
      fileName && (await s3Service.deleteFileByName(fileName, ACCESS_LEVELS.PROTECTED));
      await Promise.all([
        s3Service.uploadImage({ name, blob }, ACCESS_LEVELS.PROTECTED),
        updateProfilePictureMutation({
          variables: {
            userId: user.attributes.sub,
            profilePicture: name
          }
        })
      ]);
      const url = await getProfilePictureUrl(name);
      window.localStorage.setItem('avatar', url);
      setProfilePictureUrl(url);
      setUpdatingPicture(false);
      return url;
    } catch (error) {
      if (error.message === 'Choose an image file') {
        alert('Select an image file');
      } else {
        throw error;
      }
      console.error(error);
      setUpdatingPicture(false);
    }
  };

  const contextData = {
    user,
    setUser,
    loadingPicture,
    profilePictureUrl,
    setProfilePictureUrl,
    uploadProfilePicture,
    updatingPicture,
    deletePicture,
    deletingPicture
  };

  return <userContext.Provider value={contextData}>{children}</userContext.Provider>;
};

export const useUser = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error('useUser can only be used inside UserProvider');
  }
  return context;
};

export default UserProvider;
