import styles from './styles.module.scss';
import pencil from '../../assets/edit-icon.svg';
import { useUserRole } from 'services/cognito.service';
import { useUser } from 'components/UserManagment/UserProvider';
import { DeleteMessages } from '../deleteMessages';
import { TypeAnimation } from 'react-type-animation';
import { USER_ROLES } from 'enums/constants.enum';

export const RenderMenssages = ({
  note,
  convertDate,
  setIsEditMode,
  setIsUpdate,
  setIdUpdate,
  setIsWriting,
  filterNote
}) => {
  const role = useUserRole();
  const { user } = useUser();

  const update = id => {
    setIsEditMode(true);
    setIsUpdate(true);
    setIdUpdate(id);
  };

  return (
    <>
      {note.typing && filterNote[0]?.id === note.id ? (
        <>
          <TypeAnimation
            key={`${note.message}${note.fontSize}${note.fontFamily}${note.fontColor}`}
            cursor={true}
            sequence={[note.message, 3000, () => setIsWriting(true)]}
            wrapper="p"
            speed={50}
            className={`animated-text`}
            style={{
              fontSize: `${note.fontSize}px`,
              fontFamily: note.fontFamily,
              color: note.fontColor,
              whiteSpace: 'pre-line',
              wordWrap: 'break-word',
              width: '100%',
              paddingBottom: '15%'
            }}
          />
        </>
      ) : (
        <p
          style={{
            fontSize: `${note.fontSize}px`,
            fontFamily: note.fontFamily,
            color: note.fontColor
          }}
          className={styles.message}
        >
          {note.message}
        </p>
      )}
      {note.type === 'homework' && (
        <>
          <br />
          <p className={styles.postedBy}>For {note.deadline}</p>
          <p className={styles.postedBy}>
            {'Posted by ' + note.from + ' ' + convertDate(note.date)}
          </p>
        </>
      )}
      {note.createBy !== user?.attributes?.sub &&
        note.type !== 'homework' &&
        role === USER_ROLES.ADMINS && (
          <p className={styles.postedBy}>{note.from + ' ' + convertDate(note.date)}</p>
        )}
      <div className={styles.iconContainer}>
        {(user?.attributes?.sub === note.createBy || role === USER_ROLES.ADMINS) && (
          <div className={styles.iconOptions}>
            <DeleteMessages id={note.id} />
          </div>
        )}
        {(user?.attributes?.sub === note.createBy || role === USER_ROLES.ADMINS) && (
          <div className={styles.iconOptions}>
            <img
              src={pencil}
              alt="update icon"
              className={styles.pencil}
              onClick={() => update(note.id)}
            />
          </div>
        )}
      </div>
    </>
  );
};
