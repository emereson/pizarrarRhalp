import React from 'react';
import LoadingSpinner from '../../common/LoadingSpinner';

const ShowLoading = props => {
  return (
    <div style={props.styles}>
      <LoadingSpinner />
    </div>
  );
};

export default ShowLoading;
