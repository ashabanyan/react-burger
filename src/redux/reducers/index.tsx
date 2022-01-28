import { ingredientReducer } from "./ingredients";
import { orderConstructorReducer } from "./orderConstructor";
import { makingOrderReducer } from "./makingOrder";
import { forgotPasswordReducer } from "./forgotPassword";
import { authReducer } from "./auth";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  order: orderConstructorReducer,
  makingOrder: makingOrderReducer,
  forgotPassword: forgotPasswordReducer,
  auth: authReducer,
});
