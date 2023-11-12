const mediaErrors = [
  'NotAllowedError',
  'NotFoundError',
  'NotReadableError',
  'OverconstrainedError',
  'TypeError',
  'SignalingConnectionError',
  'SignalingServerBusyError',
  'RoomMaxParticipantsExceededError',
  'RoomNotFoundError',
  'MediaConnectionError'
];

export const resolverMediaError = (error, callback) => {
  if (mediaErrors.includes(error.name)) {
    console.error('ERROR NAME:', error.name);
    callback(error);
  }
};
