import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import LiveIcon from './liveIcon/liveIcon';
import SatelliteIcon from './satelliteIcon/satelliteIcon';
import { VideoConferenceContext } from './VideoConferenceContext';
import { useUserClassRoom } from '../UserManagment/hooks/useUserClassRoom';

const VideoConectIcon = () => {
  let data = useSelector(({ audioOrVideoReducer }) => audioOrVideoReducer);
  const { token, animation } = useContext(VideoConferenceContext);

  const { iconsColor } = useUserClassRoom();

  return token !== null ? (
    <SatelliteIcon />
  ) : data.hideIcon ? (
    <LiveIcon color={iconsColor} animation={animation} />
  ) : null;
};

export default VideoConectIcon;
