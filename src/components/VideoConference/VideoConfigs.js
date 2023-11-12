// Recomended setting from TWILIO
// see https://www.twilio.com/docs/video/tutorials/developing-high-quality-video-applications#desktop-browser-collaboration-recommended-settings

export const GRID_DESKTOP_CONFIG = roomName => ({
  name: roomName,
  audio: true,
  video: { height: 480, frameRate: 24, width: 640 }, // using VGA resolution
  bandwidthProfile: {
    video: {
      mode: 'grid'
    }
  },
  maxAudioBitrate: 16000, //For music remove this line
  //For multiparty rooms (participants>=3) uncomment the line below
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
  networkQuality: { local: 1, remote: 1 }
});
