const initialState = {
  hideIcon: true
};

const audioOrVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUDIO_OR_VIDEO': {
      return {
        ...state,
        hideIcon: action.payload
      };
    }
    default:
      return state;
  }
};

export default audioOrVideoReducer;
