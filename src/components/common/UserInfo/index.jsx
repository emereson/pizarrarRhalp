// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxImportSource @emotion/react */
import {
  input_container,
  container,
  already_container,
  icon_img,
  require_container,
  lower_inputs,
  first_input_container,
  container_mail_confirmation
} from './styles';
import human from 'assets/icons/human.svg';
import TransparentInput from '../TransparentInput';
import RadioInput from './components/RadioInput';

const UserInfo = ({ userInfo, onChange, fullWidth }) => {
  return (
    <div
      css={container}
      style={{
        width: fullWidth ? '100%' : 'initial',
        justifyContent: fullWidth ? 'space-between' : 'inherit'
      }}
    >
      <div
        style={{
          width: '100%',
          padding: window.innerWidth < 750 ? '0 10px' : 'inherit',
          marginBottom: window.innerWidth < 750 ? '10px' : 'inherit',
          marginTop: '15px'
        }}
      >
        <img src={human} alt="icon" css={icon_img} />
      </div>
      <div css={lower_inputs}>
        <div css={already_container}>
          <span className="userinfo-tags" style={{ marginLeft: '5px' }}>
            Already a student?
          </span>
          <div css={already_container} style={{ justifyContent: 'flex-end' }}>
            <span className="userinfo-tags">yes</span>
            <RadioInput
              type="radio"
              name="isStudent"
              value="yes"
              style={{ marginRight: 20 }}
              checked={userInfo.isStudent === 'yes'}
              onChange={onChange}
            />
            <span className="userinfo-tags">no yet</span>
            <RadioInput
              style={{ marginRight: 10 }}
              type="radio"
              name="isStudent"
              value="no"
              checked={userInfo.isStudent === 'no'}
              onChange={onChange}
            />
          </div>
        </div>
        <div css={[input_container, first_input_container]}>
          <TransparentInput
            label={'Country:'}
            value={userInfo.country}
            name={'country'}
            onChange={onChange}
          />
        </div>
        <div css={input_container}>
          <TransparentInput
            label={'Name:'}
            value={userInfo.name}
            name={'name'}
            onChange={onChange}
          />
        </div>
        <div css={input_container}>
          <TransparentInput
            label={'Email:'}
            value={userInfo.email}
            name={'email'}
            onChange={onChange}
          />
        </div>
        <div css={input_container}>
          <TransparentInput
            label={'Phone:'}
            value={userInfo.tel}
            name={'tel'}
            onChange={onChange}
          />
        </div>
        <div css={input_container}>
          <TransparentInput
            label="Notes:"
            value={userInfo.notes}
            name="notes"
            onChange={onChange}
          />
        </div>
        <div
          css={require_container}
          style={{ marginTop: window.innerWidth < 750 ? '7px' : '0' }}
        >
          <span
            className="userinfo-tags"
            style={{ fontSize: '1.1rem', marginLeft: '3px' }}
          >
            Do you require mail confirmation?
          </span>
          <div css={container_mail_confirmation}>
            <span className="userinfo-tags">yes</span>
            <RadioInput
              type="radio"
              name="requireMail"
              value="yes"
              style={{ marginRight: 20 }}
              checked={userInfo.requireMail === 'yes'}
              onChange={onChange}
            />
            <span className="userinfo-tags">no</span>
            <RadioInput
              style={{ marginRight: 10 }}
              type="radio"
              name="requireMail"
              value="no"
              checked={userInfo.requireMail === 'no'}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
