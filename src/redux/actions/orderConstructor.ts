import { IIngredient } from '../../types/common';
// --------------- Экшен для добавления и удаления ингридиента в заказе ---------------
export const ADD_INGREDIENT_INTO_ORDER = 'ADD_INGRIDIENT_INTO_ORDER';
export const DELETE_INGREDIENT_FROM_ORDER = 'DELETE_INGRIDIENT_FROM_ORDER';
export const UPDATE_ORDER_AFTER_DROP = 'UPDATE_ORDER_AFTER_DROP';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export interface IAddIngredientIntoOrderAction {
  readonly type: typeof ADD_INGREDIENT_INTO_ORDER;
  readonly ingType: string;
  readonly data: IIngredient
}

export interface IDeleteIngredientFromOrderAction {
  readonly type: typeof DELETE_INGREDIENT_FROM_ORDER;
  readonly ingId: string;
}

export interface IUpdateOrderAfterDropAction {
  readonly type: typeof UPDATE_ORDER_AFTER_DROP;
  readonly data: Array<IIngredient>
}

export interface IClearOrderAction {
  readonly type: typeof CLEAR_ORDER;
}

export type TOrderConstructorActions = 
  | IAddIngredientIntoOrderAction
  | IDeleteIngredientFromOrderAction
  | IUpdateOrderAfterDropAction
  | IClearOrderAction