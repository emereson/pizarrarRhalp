import React, { Fragment, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import MicIcon from '../../assets/admin/green-mic.svg';

const MicStatus = ({}) => {
  return <img height={'22px'} src={MicIcon} alt="mic icon" />;
};

export default MicStatus;
