import { GET_ORDER_NUMBER_URL } from "../../constants/constants";
// --------------- Экшен для получение номера заказа с сервера ---------------
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const CLEAR_ORDER_NUMBER = 'CLEAR_ORDER_NUMBER';

export const getOrderNumber = (currentBurgerIngredients) => {
  return async function(dispatch) {
    dispatch({type: GET_ORDER_NUMBER_REQUEST});

    try {
      const response = await fetch(GET_ORDER_NUMBER_URL, 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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