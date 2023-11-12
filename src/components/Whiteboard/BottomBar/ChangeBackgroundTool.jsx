import React, { Fragment, useState } from 'react';
import { ReactComponent as BackgroundIconBlack } from 'assets/whiteboard/black/background-icon-black.svg';
import { ReactComponent as BackgroundIconGrey } from 'assets/whiteboard/grey/background-icon-grey.svg';
import { ReactComponent as BackgroundIconWhite } from 'assets/whiteboard/white/background-icon-white.svg';
import { ICONS_COLORS } from '../../../enums/constants.enum';
import { useUserRole } from '../../../services/cognito.service';
import { USER_ROLES } from '../../../enums/constants.enum';
import { useUserClassRoom } from '../../UserManagment/hooks/useUserClassRoom';
import { S3Service } from '../../../services/S3.service';
import { useUpdateClassRoomBackground } from '../hooks/useUpdateClassRoomBackground';
import LoadingSpinner from '../../common/LoadingSpinner';
import ClickNHold from 'react-click-n-hold';

const s3Service = new S3Service('public');

const ChangeBackgroundTool = ({ color }) => {
  const userRole = useUserRole();
  const { assignedClassRoom, backgroundUrl, isCrystalTheme } = useUserClassRoom();
  const { applyToAllChangeBackground } = useUpdateClassRoomBackground();
  const [updateSate, setUpdateState] = useState({ loading: false });

  const removeBackground = async () => {
    if (backgroundUrl) {
      return s3Service.deleteFile(backgroundUrl);
    }
  };

  const resetBackground = async () => {
    setUpdateState({ loading: true });
    try {
      applyToAllChangeBackground(null);
      await removeBackground();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdateState({ loading: false });
    }
  };

  const onChange = async e => {
    setUpdateState({ loading: true });
    const blob = e.target.files[0];
    const name = `classRooms/${assignedClassRoom.classRoomId}/${blob.name}`.replace(
      /\s/g,
      ''
    );
    try {
      await removeBackground();
      const { fileUrl } = await s3Service.uploadImage({ name, blob });
      applyToAllChangeBackground(fileUrl);
    } catch (error) {
      if (error.message === 'Choose an image file') {
        // TODO use custom alert component
        alert('choose an image file');
      } else {
        console.error('error updating image', error);
      }
    } finally {
      setUpdateState({ loading: false });
    }
  };

  if (![USER_ROLES.ADMINS].includes(userRole)) {
    return null;
  }

  if (updateSate.loading) {
    return <LoadingSpinner customClasses={isCrystalTheme ? 'text-light' : null} />;
  }

  return (
    <ClickNHold time={2} onClickNHold={resetBackground}>
      <>
        <label
          htmlFor="uploadBackground"
          className="m-0"
          style={{
            width: '100%',
            height: '100%',
            cursor: 'pointer'
          }}
        >
          C. Whiteboard
          {color === ICONS_COLORS.BLACK && (
            <BackgroundIconBlack className="page-icon-item" />
          )}
          {color === ICONS_COLORS.WHITE && (
            <BackgroundIconWhite className="page-icon-item" />
          )}
          {color === ICONS_COLORS.GREY && (
            <BackgroundIconGrey className="page-icon-item" />
          )}
        </label>
        <input
          id="uploadBackground"
          className=""
          type="file"
          style={{ display: 'none' }}
          onChange={onChange}
        />
      </>
    </ClickNHold>
  );
};

export default ChangeBackgroundTool;
