import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];
export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares))
  // other store enhancers if any
);
