import styles from './styles.module.scss';
import { UPDATE_TEXT_NOTE } from 'components/UserManagment/StudentProfile/graphql/mutation';
import { GET_NOTES } from 'components/UserManagment/StudentProfile/graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import text_icon from '../../assets/text-icon.svg';
import typing_icon from '../../assets/typing.svg';
import typing_activated_icon from '../../assets/typing-activated.svg';
import plus from '../../assets/plus-icon.svg';
import minus from '../../assets/minus-icon.svg';
import save from '../../assets/save-icon.svg';
import { ColorPalette } from '../colorPalette';
import { Fonts } from '../fonts';

export const UpdateMessages = ({ setIsEditMode, idUpdate, setIsUpdate, isPhone }) => {
  const [updateTextNote] = useMutation(UPDATE_TEXT_NOTE);
  const [editText, setEditText] = useState(false);
  const [fontSizes, setFontSizes] = useState(14);
  const [fontFamily, setFontFamily] = useState('Digital-7');
  const [color, setColor] = useState('#032993');
  const [typing, setTyping] = useState(false);
  const [isHomework, setIsHomework] = useState(false);
  const { data, loading } = useQuery(GET_NOTES, {
    variables: { id: idUpdate }
  });

  useEffect(() => {
    setFontSizes(data?.getTextNote?.fontSize);
    setFontFamily(data?.getTextNote?.fontFamily);
    setColor(data?.getTextNote?.fontColor);
    setTyping(data?.getTextNote?.typing);
  }, [data]);

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
  const updateMessage = e => {
    e.preventDefault();

    const data = new FormData(e.target);

    updateTextNote({
      variables: {
        id: idUpdate,
        message: data.get('message'),
        type: data.get('type'),
        fontSize: fontSizes,
        fontFamily: fontFamily,
        fontColor: color,
        deadline: data.get('deadline'),
        typing: typing
      }
    });

    setIsEditMode(false);
    setIsUpdate(false);
  };

  if (loading) {
    return null;
  }

  return (
    <form className={isPhone ? styles.formTrue : styles.form} onSubmit={updateMessage}>
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
        <p>{data?.getTextNote?.for}</p>
      </div>

      <textarea
        required
        name="message"
        className={styles.textArea}
        style={{ fontSize: `${fontSizes}px`, fontFamily: fontFamily, color: color }}
        defaultValue={data?.getTextNote?.message}
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
              value={data?.getTextNote?.deadline}
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
