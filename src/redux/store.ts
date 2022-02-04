import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "../redux/reducers/index";
import { socketMiddleware } from './middleware/socketMiddleware';
import thunkMiddleware from 'redux-thunk';
import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE} from "./actions/wsActions";

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(composeEnhancers(applyMiddleware(thunkMiddleware, socketMiddleware(wsActions))))
);
