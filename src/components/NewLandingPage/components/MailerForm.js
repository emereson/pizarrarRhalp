import React, { useCallback, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { sendEmail } from 'services/email';
import { landingConstants } from '../constants';
import styles from '../NewLandingPage.module.scss';

const INITIAL_FORM_DATA = {
  optPhone: '',
  optWhoReq: '',
  persoName: '',
  personLastName: '',
  personEmail: '',
  personCountry: 'Pais',
  phoneCodeArea: '',
  phoneInitNum: '',
  phoneExtNum: ''
};

export default function MailerForm({ setfloating, floating }) {
  const [FormData, setFormData] = useState(INITIAL_FORM_DATA);
  const [emailStatus, setEmailStatus] = useState({
    message: '',
    sending: false,
    error: false
  });
  const [Message, setMessage] = useState('');

  const handleSubmitForm = useCallback(
    async e => {
      e.preventDefault();

      let contactInformation = {
        first_name: FormData.persoName,
        last_name: FormData.personLastName,
        email: FormData.personEmail,
        country: FormData.personCountry,
        phone_type: FormData.optPhone,
        person_who_req: FormData.optWhoReq,
        phone:
          FormData.phoneCodeArea +
          '-' +
          FormData.phoneInitNum +
          '-' +
          FormData.phoneExtNum
      };

      if (
        FormData.phoneCodeArea.length > 0 &&
        FormData.phoneInitNum.length > 0 &&
        FormData.phoneExtNum.length > 0
      ) {
        setEmailStatus({
          ...emailStatus,
          sending: true
        });
        try {
          await sendEmail({ ...contactInformation, type: 'landing-page' });
          setEmailStatus({
            ...emailStatus,
            sending: false,
            message:
              'Uno de nuestros asesores se pondra en contacto con usted gracias por visitar Branak'
          });
          setFormData(INITIAL_FORM_DATA);
          setMessage(
            'Uno de nuestros asesores se pondra en contacto con usted gracias por visitar Branak'
          );
          setTimeout(() => {
            setMessage('');
          }, 3000);
        } catch (error) {
          console.log('error', error);
          setEmailStatus({
            ...emailStatus,
            sending: false,
            error: true,
            message: 'Hubo un error por favor intente nuevamente'
          });
          setMessage('Hubo un error por favor intente nuevamente');
          setTimeout(() => {
            setEmailStatus({
              ...emailStatus,
              error: false,
              message: ''
            });
            setMessage('');
          }, 4000);
        }
      } else {
        setEmailStatus({
          ...emailStatus,
          sending: false,
          error: true,
          message: 'Agrega tu numero de telefono!'
        });
        setMessage('Agrega tu numero de telefono!');
        setTimeout(() => {
          setEmailStatus({
            ...emailStatus,
            error: false,
            message: ''
          });
          setMessage('');
        }, 3000);
      }
    },
    [FormData]
  );

  const onFocusBlur = () => {
    if (floating) setfloating(false);
    else setfloating(true);
  };

  return (
    <div className={styles.mailerFormComponent}>
      <p className={styles.title}>{Message ? Message : 'Empieza a Aprender'}</p>
      <form className={styles.form} id="mailer-form" onSubmit={handleSubmitForm}>
        <div className={styles.rowInputs}>
          <input
            placeholder="Nombre *"
            className={styles.inputs}
            name="name"
            onFocus={onFocusBlur}
            onBlur={onFocusBlur}
            value={FormData.persoName}
            onChange={e => setFormData({ ...FormData, persoName: e.target.value })}
          />
          <input
            placeholder="Apellido"
            className={styles.inputs}
            name="lastname"
            onFocus={onFocusBlur}
            onBlur={onFocusBlur}
            value={FormData.personLastName}
            onChange={e => setFormData({ ...FormData, personLastName: e.target.value })}
          />
        </div>
        <input
          placeholder="Correo Electronico *"
          value={FormData.personEmail}
          onChange={e => setFormData({ ...FormData, personEmail: e.target.value })}
          name="email"
          onFocus={onFocusBlur}
          onBlur={onFocusBlur}
          className={styles.inputs}
        />
        <select
          className={styles.countrySelector}
          value={FormData.personCountry}
          onChange={e => setFormData({ ...FormData, personCountry: e.target.value })}
        >
          <option hidden selected>
            Pais
          </option>
          {landingConstants.mailer.countrySelector.map((item, index) => {
            return (
              <option value={item} key={index}>
                {item}
              </option>
            );
          })}
        </select>
        <div className={styles.rowBtns}>
          {landingConstants.mailer.optPhone.map((item, index) => (
            <div
              className={FormData.optPhone === item ? styles.btns__selected : styles.btns}
              key={index}
              onClick={() => setFormData({ ...FormData, optPhone: item })}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
        <div className={styles.rowInputsPhone}>
          <input
            placeholder="XXX"
            name="prefix"
            value={FormData.phoneCodeArea}
            className={styles.inputs}
            onFocus={onFocusBlur}
            onBlur={onFocusBlur}
            onChange={e => setFormData({ ...FormData, phoneCodeArea: e.target.value })}
          />
          <input
            placeholder="XXX"
            name="initialnumber"
            value={FormData.phoneInitNum}
            className={styles.inputs}
            onFocus={onFocusBlur}
            onBlur={onFocusBlur}
            onChange={e => setFormData({ ...FormData, phoneInitNum: e.target.value })}
          />
          <input
            placeholder="XXX"
            className={styles.inputs}
            value={FormData.phoneExtNum}
            name="endnumber"
            onFocus={onFocusBlur}
            onBlur={onFocusBlur}
            onChange={e => setFormData({ ...FormData, phoneExtNum: e.target.value })}
          />
        </div>
        <div className={styles.rowBtns2}>
          {landingConstants.mailer.optWhoReq.map((item, index) => (
            <div
              className={
                FormData.optWhoReq === item ? styles.btns__selected : styles.btns
              }
              key={index}
              onClick={() => setFormData({ ...FormData, optWhoReq: item })}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.btnSubmit}>
            {emailStatus.sending ? (
              <Spinner className="bran-spinner" animation="border" />
            ) : (
              'Comienza'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
