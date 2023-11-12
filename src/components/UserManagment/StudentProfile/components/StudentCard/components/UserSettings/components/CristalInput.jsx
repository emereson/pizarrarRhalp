// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const StyledInput = styled.input`
    border: ${props => (props.hasError ? '1px solid red !important' : 'none')};
    border-bottom: ${props =>
      props.hasError ? null : `1px solid ${props.borderColor || 'white'}`};
    outline: none;
    color: white;
    font-size: 12px;
    background-color: transparent;
    font-weight: 500;
    width: 100%;

}
`;

const CrystalInput = props => {
  return <StyledInput {...props} />;
};

export default CrystalInput;
