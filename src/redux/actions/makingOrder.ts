import { GET_ORDER_NUMBER_URL } from "../../constants/constants";
import { IIngredient, IOrder2 } from '../../types/common';
import { AppDispatch } from '../types/index';
// --------------- Экшен для получение номера заказа с сервера ---------------
export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED'  = 'GET_ORDER_NUMBER_FAILED';
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const CLEAR_ORDER_NUMBER: 'CLEAR_ORDER_NUMBER'  = 'CLEAR_ORDER_NUMBER';

export interface IGetOrderNumberRequestAction {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IGetOrderNumberSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly data: IOrder2;
}

export interface IClearOrderNumberAction {
  readonly type: typeof CLEAR_ORDER_NUMBER;
}

export const getOrderNumber = (currentBurgerIngredients: Array<IIngredient>) => {
  return async function(dispatch: AppDispatch) {
    
    dispatch({type: GET_ORDER_NUMBER_REQUEST});

    try {
      const response = await fetch(GET_ORDER_NUMBER_URL, 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + localStorage.getItem('accessToken'),
      }, 
      method: 'POST', 
      body: JSON.stringify({ "ingredients": currentBurgerIngredients && currentBurgerIngredients.map(item => item._id)})
    });
    const result = await response.json();
    dispatch({
      type: GET_ORDER_NUMBER_SUCCESS,
      data: result,
    })
    }
    catch(e) {
      dispatch({ type: GET_ORDER_NUMBER_FAILED})
    }
  } 
}

export type TMakingOrderAction = 
  | IGetOrderNumberRequestAction
  | IGetOrderNumberFailedAction
  | IGetOrderNumberSuccessAction
  | IClearOrderNumberAction
