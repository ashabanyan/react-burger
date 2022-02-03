import { GET_INGREDIENTS_URL } from '../../constants/constants';
import { IIngredient } from '../../types/common';
import { checkResponse } from '../../utils/js-utils';
import { AppThunk, AppDispatch } from '../types/index';

// --------------- Получение ингридиентов от API ---------------
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';

export const SET_INGREDIENT_MODAL_DATA: 'SET_INGREDIENT_MODAL_DATA' = 'SET_INGREDIENT_MODAL_DATA';
export const DELETE_INGREDIENT_MODAL_DATA: 'DELETE_INGREDIENT_MODAL_DATA' = 'DELETE_INGREDIENT_MODAL_DATA';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredientsData: Array<IIngredient>
}

export interface ISetIngredientModalDataAction {
  readonly type: typeof SET_INGREDIENT_MODAL_DATA;
  readonly id: string;
}

export interface IDeleteIngredientModalDataAction {
  readonly type: typeof DELETE_INGREDIENT_MODAL_DATA;
}

export const getIngredients: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    })

    fetch(GET_INGREDIENTS_URL)
      .then(checkResponse)
      .then(result => {
        dispatch({ 
          type: GET_INGREDIENTS_SUCCESS,
          ingredientsData: result.data,
        })
      })
      .catch(err => {
        dispatch({ type: GET_INGREDIENTS_FAILED,})
      })
  }
}

export type TIngredientsActions = 
| IGetIngredientsRequestAction
| IGetIngredientsFailedAction
| IGetIngredientsSuccessAction
| ISetIngredientModalDataAction
| IDeleteIngredientModalDataAction
