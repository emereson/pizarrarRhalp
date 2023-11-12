// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { device } from '../../utils/cssBreakpoints';
import GoBackButton from '../common/BackButton';
import { formContainer, goBackButton, formBody } from './styles';

const getFormHeight = (props, isLaptop = false) => {
  if (props.short) {
    return isLaptop ? '260px' : '280px';
  }
  if (props.tall) {
    return '400px';
  } else {
    return 'auto';
  }
};

const StyledFrom = styled.form`
  width: ${props => (props.width ? props.width : '30rem')};
  margin: auto;
  margin-left: 1.8rem;
  margin-right: 1.8rem;
  background-color: rgba(3, 0, 252, 0.2);

  color: white;
  height: ${props => getFormHeight(props)};
  @media ${device.laptop} {
    margin: auto;
    height: ${props => getFormHeight(props, true)};
  }
  position: relative;

  @media (max-width: 400px) {
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 0.8rem;
  }
`;

const FormContainer = ({ children, unhideIcons, onSubmit, ...rest }) => {
  return (
    <div
      css={formContainer}
      id="loginFormContainer"
      className={
        'form-container d-flex flex-row mx-auto my-auto w-100 h-100 position-absolute'
      }
    >
      <StyledFrom noValidate onSubmit={onSubmit} {...rest}>
        <GoBackButton
          unhideIcons={unhideIcons}
          type="button"
          style={{ marginTop: '5px', marginLeft: '10px' }}
        />
        <div css={formBody}>{children}</div>
      </StyledFrom>
    </div>
  );
};

export default FormContainer;
