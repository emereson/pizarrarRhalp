import React, { useState } from 'react';
import { UPDATE_GLOBAL } from 'components/UserManagment/graphQL/mutations';
import { GET_GLOBALS } from 'components/UserManagment/graphQL/queries';
import { CREATE_GLOBAL } from 'components/UserManagment/graphQL/mutations';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { S3Service } from 'services/S3.service';
import styles from './styles.module.scss'

const s3Service = new S3Service('public');

export const BackgroundTool = ({ address, storage }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const { data: globalVar } = useQuery(GET_GLOBALS);
  const [updateGlobal, { datas }] = useMutation(UPDATE_GLOBAL);
  const [createGlobal, { data }] = useMutation(CREATE_GLOBAL);

  let timer = null;

  const upsertImage = e => {
    if (globalVar.getGlobal?.id) {
      uploadFile(e);
    } else {
      createFile(e);
    }
  };

  const createFile = async e => {
    const file = e.target.files[0];
    const name = (file?.name || 'background').replace(/\s/g, '_');
    try {
      const { fileUrl } = await s3Service.uploadImage({ name, blob: file });
      setFileUrl(fileUrl);
      await createGlobal({ variables: { [address]: fileUrl } });
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async e => {
    const file = e.target.files[0];
    const name = (file?.name || 'background').replace(/\s/g, '_');
    try {
      const { fileUrl } = await s3Service.uploadImage({ name, blob: file });
      setFileUrl(fileUrl);
      await updateGlobal({ variables: { [address]: fileUrl } });
    } catch (error) {
      console.error(error);
    }
  };

  const startTimer = e => {
    timer = setTimeout(() => {
      setIsDisabled(true);
      setTimeout(() => {
        setIsDisabled(false);
      }, 2000);
      removeFile(e);
    }, 2000);
  };

  const cancelTimer = () => {
    clearTimeout(timer);
  };

  const removeFile = async e => {
    try {
      await s3Service.deleteFile(localStorage.getItem(storage));
      await updateGlobal({ variables: { [address]: '' } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label
        htmlFor="fileInput"
        className={styles.backgroundToolLabel}
        onMouseDown={startTimer}
        onMouseUp={cancelTimer}
        onMouseLeave={cancelTimer}
      >
        Chng Profile
      </label>
      <input
        type="file"
        accept=".jpg,.png,.jpeg,.gif"
        id="fileInput"
        onChange={upsertImage}
        disabled={isDisabled}
        className={styles.backgroundToolInput}
      />
    </div>
  );
};
