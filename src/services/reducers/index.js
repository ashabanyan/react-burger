import { ingredientModalReducer } from './ingredientModal'
import { ingredientReducer } from './ingredients';
import { orderConstructorReducer } from './orderConstructor';
import { makingOrderReducer } from './makingOrder';

import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  ingredientModal: ingredientModalReducer,
  ingredients: ingredientReducer,
  order: orderConstructorReducer,
  makingOrder: makingOrderReducer,
})