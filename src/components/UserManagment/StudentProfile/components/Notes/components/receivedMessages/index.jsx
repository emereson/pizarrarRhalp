import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useUserRole } from 'services/cognito.service';
import { useUser } from 'components/UserManagment/UserProvider';
import { RenderMenssages } from '../renderMenssages';
import { useQuery } from '@apollo/client';
import { LIST_NOTES } from 'components/UserManagment/StudentProfile/graphql/queries';
import { USER_ROLES } from 'enums/constants.enum';
import moment from 'moment-timezone';

export const ReceivedMessages = ({
  activePhoneMode,
  setIsEditMode,
  setIsUpdate,
  setIdUpdate,
  isPhone
}) => {
  const role = useUserRole();
  const { user } = useUser();
  const [isWriting, setIsWriting] = useState(false);
  const { data: note, loading } = useQuery(LIST_NOTES, { pollInterval: 2000 });

  const data = note?.listTextNotes?.items;

  // UseEffect encargado de hacer scroll automatico
  useEffect(() => {
    const id = setInterval(() => {
      const animatedText = document.querySelector('.animated-text:first-child');
      if (!isWriting) {
        animatedText?.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    }, 1000);
    return () => clearInterval(id);
  }, [isWriting]);

  // Array donde se guardaran los objetos filtrados
  const filterNote = [];

  // Funcion que guarda el objeto en el array
  const lastNoteTest = note => {
    filterNote.push(note);
  };

  // Hora de santo domingo en milisegundos
  const date = moment().tz('America/Santo_Domingo');
  const dateMilisecond = date.valueOf();

  // Tiempo de duracion de las notas
  const days = 10;

  // Filtra las notas de los ultimos 10 dias
  const filterNotesLastDays = (days, data) => {
    if (data === undefined) {
      // Si data es undefined, devolver un arreglo vacío
      return [];
    }
    const milliseconds = days * 24 * 60 * 60 * 1000;
    const lastDays = dateMilisecond - milliseconds;
    const notesLastDays = data.filter(message => parseInt(message.date) >= lastDays);
    return notesLastDays;
  };

  let notes = filterNotesLastDays(days, data);
  if (notes.length === 0) {
    notes[0] = {
      id: '1',
      message: 'No hay notas disponibles...',
      role: 'default'
    };
  }

  // Detiene el scroll automatico con un click
  const scrollDefault = () => {
    setIsWriting(true);
  };

  // La fecha se guarda en milisegundos y esta funcion la convierte a formato legible DD/MM/AA
  const convertDate = milliseconds => {
    const date = new Date(parseInt(milliseconds));
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div className={styles.divTitleNote}>
        <p
          onClick={activePhoneMode}
          className={isPhone ? styles.titleNoteTrue : styles.titleNote}
        >
          Notes
        </p>
      </div>

      {notes
        .sort((a, b) => b.date - a.date)
        .map((note, i) => {
          return (
            <>
              {note.createBy === user?.attributes?.sub ? (
                <div
                  key={i}
                  className={isPhone ? styles.cardNoteTrue : styles.cardNote}
                  onClick={scrollDefault}
                  onLoad={lastNoteTest(note)}
                >
                  <RenderMenssages
                    note={note}
                    convertDate={convertDate}
                    setIsEditMode={setIsEditMode}
                    setIsUpdate={setIsUpdate}
                    setIdUpdate={setIdUpdate}
                    setIsWriting={setIsWriting}
                    filterNote={filterNote}
                  />
                </div>
              ) : note.role === role ? (
                <div
                  key={i}
                  className={isPhone ? styles.cardNoteTrue : styles.cardNote}
                  onClick={scrollDefault}
                  onLoad={lastNoteTest(note)}
                >
                  <RenderMenssages
                    note={note}
                    convertDate={convertDate}
                    setIsEditMode={setIsEditMode}
                    setIsUpdate={setIsUpdate}
                    setIdUpdate={setIdUpdate}
                    setIsWriting={setIsWriting}
                    filterNote={filterNote}
                  />
                </div>
              ) : note.role === user?.attributes?.sub ? (
                <div
                  key={i}
                  className={isPhone ? styles.cardNoteTrue : styles.cardNote}
                  onClick={scrollDefault}
                  onLoad={lastNoteTest(note)}
                >
                  <RenderMenssages
                    note={note}
                    convertDate={convertDate}
                    setIsEditMode={setIsEditMode}
                    setIsUpdate={setIsUpdate}
                    setIdUpdate={setIdUpdate}
                    setIsWriting={setIsWriting}
                    filterNote={filterNote}
                  />
                </div>
              ) : note.role === 'ALL' ? (
                <div
                  key={i}
                  className={isPhone ? styles.cardNoteTrue : styles.cardNote}
                  onClick={scrollDefault}
                  onLoad={lastNoteTest(note)}
                >
                  <RenderMenssages
                    note={note}
                    convertDate={convertDate}
                    setIsEditMode={setIsEditMode}
                    setIsUpdate={setIsUpdate}
                    setIdUpdate={setIdUpdate}
                    setIsWriting={setIsWriting}
                    filterNote={filterNote}
                  />
                </div>
              ) : role === USER_ROLES.ADMINS && note.role !== 'default' ? (
                <div
                  key={i}
                  className={isPhone ? styles.cardNoteTrue : styles.cardNote}
                  onClick={scrollDefault}
                  onLoad={lastNoteTest(note)}
                >
                  <RenderMenssages
                    note={note}
                    convertDate={convertDate}
                    setIsEditMode={setIsEditMode}
                    setIsUpdate={setIsUpdate}
                    setIdUpdate={setIdUpdate}
                    setIsWriting={setIsWriting}
                    filterNote={filterNote}
                  />
                </div>
              ) : null}
            </>
          );
        })}
    </div>
  );
};
