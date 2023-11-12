import React, { useState, useEffect } from 'react';
import styles from './styles/styles.module.scss';
import editProfileIcon from './assets/plus-icon.svg';
import closed from './assets/plus-icon.svg';
import noteIcon from './assets/note-icon.svg';
import { useUserRole } from 'services/cognito.service';
import { USER_ROLES } from 'enums/constants.enum';
import { ReceivedMessages } from './components/receivedMessages';
import { CreateMessages } from './components/createMessages';
import { UpdateMessages } from './components/updateMessages';
import { BackgroundNote } from './components/backgroundNote';
import { useSubscription, useQuery } from '@apollo/client';
import { ON_CHANGE_BACKGROUND_NOTA } from '../../graphql/subscription';
import { GET_BACKGROUND_NOTE } from '../../graphql/queries';

export const Notes = () => {
  const role = useUserRole();

  const { data: dataQuery } = useQuery(GET_BACKGROUND_NOTE, {
    variables: { id: '1' }
  });

  const { data } = useSubscription(ON_CHANGE_BACKGROUND_NOTA, {
    variables: { id: '1' }
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(null);
  const [isPhone, setIsPhone] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const BGColor =
    data?.onChangeBackgroundNote?.BackgroundColor ||
    dataQuery?.getBackgroundNote?.BackgroundColor;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const backgroundColor = windowWidth < 901 && !isPhone ? 'transparent' : BGColor;

  const isLargeScreen = !isPhone && windowWidth > 900 ? true : false;

  const openCreateNote = () => {
    setIsEditMode(true);
  };

  const closedCreateNote = () => {
    setIsUpdate(false);
    setIsEditMode(false);
  };

  const activePhoneMode = () => {
    setIsPhone(!isPhone);
  };

  return (
    <div
      className={isPhone ? styles.notesTrue : styles.notes}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={isPhone ? styles.createModeTrue : styles.createMode}>
        {!isEditMode ? (
          <img
            src={editProfileIcon}
            alt="Create a note"
            title="Create a note"
            onClick={openCreateNote}
            className={isPhone ? styles.createTrue : styles.create}
          />
        ) : (
          <img
            src={closed}
            alt="Closed a note"
            title="Closed a note"
            onClick={closedCreateNote}
            className={isPhone ? styles.closedTrue : styles.closed}
          />
        )}

        {(!isEditMode || (isEditMode && !isPhone)) && (
          <img
            src={isPhone ? closed : noteIcon}
            className={isPhone ? styles.closedTrueNote : styles.noteIcon}
            onClick={activePhoneMode}
          />
        )}

        {isEditMode && isPhone && role === USER_ROLES.ADMINS && <BackgroundNote />}
        {isEditMode && isLargeScreen && role === USER_ROLES.ADMINS && <BackgroundNote />}
      </div>

      {!isEditMode ? (
        <div className={styles.notesNormal}>
          <ReceivedMessages
            activePhoneMode={activePhoneMode}
            setIsEditMode={setIsEditMode}
            setIsUpdate={setIsUpdate}
            setIdUpdate={setIdUpdate}
            isPhone={isPhone}
          />
        </div>
      ) : (
        <div className={isPhone ? styles.notesEditTrue : styles.notesEdit}>
          {!isPhone && !isUpdate && <p className={styles.createNote}>Create</p>}
          {!isPhone && isUpdate && <p className={styles.createNote}>Edit</p>}
          {isEditMode === true && isUpdate === true ? (
            <UpdateMessages
              setIsEditMode={setIsEditMode}
              idUpdate={idUpdate}
              isPhone={isPhone}
              setIsUpdate={setIsUpdate}
            />
          ) : (
            <CreateMessages
              setIsEditMode={setIsEditMode}
              isPhone={isPhone}
              setIdUpdate={setIdUpdate}
            />
          )}
        </div>
      )}
    </div>
  );
};
