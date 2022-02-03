import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "../redux/reducers/index";
import { socketMiddleware } from './middleware/socketMiddleware';
import thunkMiddleware from 'redux-thunk';
import { wsActions } from "./actions/wsActions";


export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(composeEnhancers(applyMiddleware(thunkMiddleware, socketMiddleware(wsActions))))
);
