import React, { Fragment, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import CameraIcon from '../../assets/admin/satellite-dish.svg';

const CameraStatus = ({}) => {
  return <img height={'22px'} src={CameraIcon} alt="camera icon" />;
};

export default CameraStatus;
