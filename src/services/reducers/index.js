import { burgerReducer } from './burger';

import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  burger: burgerReducer,
})