import styles from './styles.module.scss';
import { useUser } from 'components/UserManagment/UserProvider';
import { useUserRole } from 'services/cognito.service';
import { CREATE_TEXT_NOTE } from 'components/UserManagment/StudentProfile/graphql/mutation';
import { CLASS_ROOMS_LIST } from 'components/UserManagment/StudentProfile/graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import text_icon from '../../assets/text-icon.svg';
import typing_icon from '../../assets/typing.svg';
import typing_activated_icon from '../../assets/typing-activated.svg';
import plus from '../../assets/plus-icon.svg';
import minus from '../../assets/minus-icon.svg';
import save from '../../assets/save-icon.svg';
import { ColorPalette } from '../colorPalette';
import { PeopleList } from '../peopleList/adminPeopleList';
import { StudentPeopleList } from '../peopleList/studentPeopleList';
import { TeacherPeopleList } from '../peopleList/teacherPeopleList';
import { Fonts } from '../fonts';
import moment from 'moment-timezone';

export const CreateMessages = ({ setIsEditMode, isPhone, setIdUpdate }) => {
  const { user } = useUser();
  const role = useUserRole();
  const [createTextNote] = useMutation(CREATE_TEXT_NOTE);
  const { data: classRoomsList } = useQuery(CLASS_ROOMS_LIST);
  const [editText, setEditText] = useState(false);
  const [fontSizes, setFontSizes] = useState(14);
  const [fontFamily, setFontFamily] = useState('larabiefont');
  const [color, setColor] = useState('#032993');
  const [selectedValue, setSelectedValue] = useState(`${user?.attributes?.sub}|Myself`);
  const [typing, setTyping] = useState(false);
  const [isHomework, setIsHomework] = useState(false);

  const date = moment().tz('America/Santo_Domingo');
  const dateMilisecond = date.valueOf();

  const values = selectedValue.split('|');

  const forRole = values[0];
  const forUser = values[1];

  // La funcion activeEditText oculta o muestras las herramientas de edicion de texto
  const activeEditText = () => {
    setEditText(!editText);
  };

  // La funcion increaseFontSizes incrementa el tamaño de la fuente que usara la nota
  const increaseFontSizes = () => {
    fontSizes < 26 ? setFontSizes(fontSizes + 2) : setFontSizes(14);
  };

  // La funcion decreaseFontSizes decrementa el tamaño de la fuente que usara la nota
  const decreaseFontSizes = () => {
    fontSizes > 14 ? setFontSizes(fontSizes - 2) : setFontSizes(26);
  };

  // La funcion isTyping define si se usara la animacion de escritura
  const isTyping = () => {
    setTyping(!typing);
  };

  const homework = e => {
    e.target.value === 'homework' ? setIsHomework(true) : setIsHomework(false);
  };

  // La funcion sendMessage toma los datos del formulario los guarda en AWS usando useMutation
  const sendMessage = e => {
    e.preventDefault();

    const data = new FormData(e.target);

    createTextNote({
      variables: {
        id: data.get('id'),
        message: data.get('message'),
        from: data.get('from'),
        for: forUser,
        date: data.get('date'),
        role: forRole,
        type: data.get('type'),
        createBy: data.get('createBy'),
        fontSize: fontSizes,
        fontFamily: fontFamily,
        fontColor: color,
        deadline: data.get('deadline'),
        typing: typing
      }
    });

    setIsEditMode(false);
    setIdUpdate(false);
  };

  return (
    <form className={isPhone ? styles.formTrue : styles.form} onSubmit={sendMessage}>
      <input required type="hidden" name="date" value={dateMilisecond} />
      <input required type="hidden" name="createBy" value={user?.attributes?.sub} />
      <input
        required
        type="hidden"
        name="from"
        value={`${role.toLowerCase()}: ${user?.attributes?.name}`}
      />
      <input required type="hidden" name="id" value={uuidv4()} />

      <div className={styles.typeNote}>
        <div className={styles.typeItem}>
          <label className={styles.typeLabel} htmlFor="note">
            NOTE
          </label>
          <input
            className={styles.typeRadio}
            required
            type="radio"
            name="type"
            id="note"
            value={'note'}
            onChange={homework}
          />
        </div>
        <div className={styles.typeItem}>
          <label className={styles.typeLabel} htmlFor="homework">
            HOMEWORK
          </label>
          <input
            className={styles.typeRadio}
            type="radio"
            name="type"
            id="homework"
            value={'homework'}
            onChange={homework}
          />
        </div>
      </div>

      <div className={styles.containerPeopleList}>
        {role === 'ADMIN' && (
          <PeopleList
            classRoomsList={classRoomsList?.listClassRooms?.items}
            mySelf={user?.attributes?.sub}
            setSelectedValue={setSelectedValue}
          />
        )}
        {role === 'TEACHER' && (
          <TeacherPeopleList
            mySelf={user?.attributes?.sub}
            setSelectedValue={setSelectedValue}
          />
        )}
        {role === 'STUDENT' && (
          <StudentPeopleList
            mySelf={user?.attributes?.sub}
            setSelectedValue={setSelectedValue}
          />
        )}
      </div>

      <textarea
        required
        name="message"
        className={styles.textArea}
        style={{ fontSize: `${fontSizes}px`, fontFamily: fontFamily, color: color }}
      ></textarea>

      <div className={styles.containerEditText}>
        {editText && (
          <>
            <div className={styles.fonts}>
              <Fonts setFontFamily={setFontFamily} />
            </div>

            <div onClick={decreaseFontSizes} className={styles.icon}>
              <img src={minus} alt="minus icon" />
            </div>
            <div onClick={increaseFontSizes} className={styles.icon}>
              <img src={plus} alt="plus icon" />
            </div>

            <ColorPalette setColor={setColor} />
          </>
        )}
      </div>
      <div className={styles.containerDeadline}>
        {isHomework && (
          <>
            <label htmlFor="deadline" className={styles.labelDeadline}>
              For
            </label>
            <input
              type="text"
              id="deadline"
              name="deadline"
              className={styles.inputDeadline}
              required
            />
          </>
        )}
      </div>

      <div className={styles.buttonsEdit}>
        <img
          src={text_icon}
          alt="text_icon"
          className={styles.textIcon}
          onClick={activeEditText}
        />
        <img
          src={typing ? typing_activated_icon : typing_icon}
          alt="typing_icon"
          className={styles.typingIcon}
          onClick={isTyping}
        />
        <button type="submit" className={styles.saveButton}>
          <img src={save} alt="typing_icon" className={styles.saveIcon} />
        </button>
      </div>
    </form>
  );
};
