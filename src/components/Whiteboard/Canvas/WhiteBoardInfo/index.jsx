// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { useUserClassRoom } from 'components/UserManagment/hooks/useUserClassRoom';
import { useUser } from 'components/UserManagment/UserProvider';
import { useUserRole } from 'services/cognito.service';
import HomeIcon from './HomeIcon';
import { Link } from 'react-router-dom';

const WhiteBoardInfo = ({ page }) => {
  const { iconsColor, isCrystalTheme, classRoomName } = useUserClassRoom();
  const userRole = useUserRole();
  const { user } = useUser();

  const styles = css`
    .page {
      color: ${iconsColor};
    }
    .info {
      color: ${isCrystalTheme ? 'white' : 'black'};
    }
  `;

  return (
    <section css={styles} className="d-flex flex-row">
      <p className="page">{page}</p>
      {
        <Link to="/">
          <HomeIcon color={iconsColor} />
        </Link>
      }
      <span className="info font-weight-bold align-self-center ml-2">
        {user.attributes?.name} - {userRole.toLowerCase()} - {classRoomName.toLowerCase()}
      </span>
    </section>
  );
};

export default WhiteBoardInfo;
