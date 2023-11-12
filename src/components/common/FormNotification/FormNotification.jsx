// eslint-disable-next-line no-unused-vars
import React from 'react';
import styled from '@emotion/styled';

const FormNotification = styled.p`
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  color: ${props => (props.color ? props.color : 'white')};
  line-height: 1rem;
`;

export default FormNotification;
