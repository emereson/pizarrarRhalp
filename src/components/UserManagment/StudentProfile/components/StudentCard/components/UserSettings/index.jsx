import React from 'react';
import InLineInput from './components/InlineInput';
import { useUser } from 'components/UserManagment/UserProvider';
import styles from './styles/styles.module.scss';
import { style } from 'd3';

const UserSettings = ({
  handleInputChange,
  userData,
  showChangePassword,
  setShowChangePassword
}) => {
  const { user } = useUser();

  return (
    // <section className="container-fluid d-flex flex-column justify-content-center p-1">
    <div className={styles.userSettings}>
      <InLineInput
        className={styles.input}
        inputColSize={3}
        label="User:"
        type="text"
        name="user"
        placeholder={user.attributes.name}
        noPadding
        userSettingsMode
        autocomplete="off"
        value={userData.user}
        onChange={handleInputChange}
        borderColor="#fff"
        borderBottom
        inputId="user"
      ></InLineInput>
      {showChangePassword && (
        <>
          <InLineInput
            autoFocus
            inputColSize={3}
            label="Current password:"
            type="password"
            name="currentPassword"
            noPadding
            userSettingsMode
            autocomplete="off"
            defaultValue={userData.currentPassword}
            onChange={handleInputChange}
            borderColor="#fff"
            borderBottom
            inputId="current-password"
          ></InLineInput>
          <InLineInput
            inputColSize={3}
            label="Type new password:"
            type="password"
            name="newPassword"
            autocomplete="off"
            userSettingsMode
            noPadding
            value={userData.newPassword}
            onChange={handleInputChange}
            borderColor="#fff"
            inputId="new-password"
            borderBottom
          ></InLineInput>
          <InLineInput
            inputColSize={3}
            label="Re-enter new password:"
            type="password"
            name="repeatNewPassword"
            autocomplete="off"
            userSettingsMode
            noPadding
            value={userData.repeatNewPassword}
            onChange={handleInputChange}
            borderColor="#fff"
            inputId="repeat-new-password"
            borderBottom
          ></InLineInput>
        </>
      )}
      {!showChangePassword && (
        <p
          className={styles.buttons}
          onClick={() => setShowChangePassword(!showChangePassword)}
        >
          Change Password
        </p>
      )}
    </div>
    // </section>
  );
};

export default UserSettings;
