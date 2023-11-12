import { combineReducers } from 'redux';
import whiteBoard from './whiteBoardReducer';
import whiteBoardToolkit from '../reduxToolkit/whiteboard/actions';

import audioOrVideoReducer from './audioOrVideoReducer';

const rootReducer = combineReducers({
  whiteBoard,
  whiteBoardToolkit,
  audioOrVideoReducer
});

export default rootReducer;
