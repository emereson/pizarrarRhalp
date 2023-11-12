import { VoiceType } from './enum';

const {
  TOKEN,
  ON_MICRO_MUTED,
  ON_SILENCE_REMOTE,
  ON_SPEAKER_MUTED,
  STATE_LIVE_ICON,
  ON_CALL,
  INCOMING_CALL,
  SHOW_ICON,
  GUEST_CONNECTED,
  EXIT_CALL
} = VoiceType;

const voiceInitialState = {
  token: null,
  liveIconState: true,
  onCall: true,
  showIcon: false,
  inComingCall: false,
  micMuted: true,
  speakerMuted: false,
  exitCall: false,
  guestConnected: false,
  onSilence: false
};

const voiceReducer = (state, action) => {
  switch (action.type) {
    case TOKEN: {
      return {
        ...state,
        token: action.playload
      };
    }

    case ON_MICRO_MUTED: {
      return {
        ...state,
        micMuted: action.playload
      };
    }

    case ON_SILENCE_REMOTE: {
      return {
        ...state,
        onSilence: action.playload
      };
    }

    case ON_SPEAKER_MUTED: {
      return {
        ...state,
        speakerMuted: action.playload
      };
    }

    case STATE_LIVE_ICON: {
      return {
        ...state,
        liveIconState: action.playload
      };
    }

    case ON_CALL: {
      return {
        ...state,
        onCall: action.playload
      };
    }

    case INCOMING_CALL: {
      return {
        ...state,
        inComingCall: action.playload
      };
    }

    case SHOW_ICON: {
      return {
        ...state,
        showIcon: action.playload
      };
    }

    case GUEST_CONNECTED: {
      return {
        ...state,
        guestConnected: action.playload
      };
    }

    case EXIT_CALL: {
      return {
        ...state,
        exitCall: action.playload
      };
    }

    default: {
      return state;
    }
  }
};

export { voiceInitialState, voiceReducer };
