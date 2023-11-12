import { DELETE_TEXT_NOTE } from 'components/UserManagment/StudentProfile/graphql/mutation';
import { useMutation } from '@apollo/client';
import trash from '../../assets/trash.svg';
import styles from './styles.module.scss';

export const DeleteMessages = ({ id }) => {
  const [deleteTextNote] = useMutation(DELETE_TEXT_NOTE);

  const deleteNote = id => {
    deleteTextNote({ variables: { noteID: id } });
  };

  return (
    <img
      src={trash}
      alt="trash icon"
      className={styles.trash}
      onClick={() => deleteNote(id)}
    />
  );
};
