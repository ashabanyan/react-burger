import { GET_INGREDIENTS_URL } from '../../constants/constants';

// --------------- Получение ингридиентов от API ---------------
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_ERROR';

export const getIngredients = () => {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    })

    fetch(GET_INGREDIENTS_URL)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
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

// --------------- Экшен для конвертации ингридиентов в текущий заказ ---------------
export const CONVERT_DATA_TO_ORDER = 'CONVERT_DATA_TO_ORDER';

// --------------- Экшен для получение номера заказа с сервера ---------------
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export const getOrderNumber = (currentBurgerIngredients) => {
  return async function(dispatch) {
    dispatch({type: GET_ORDER_NUMBER_REQUEST});

    try {
      const response = await fetch("https://norma.nomoreparties.space/api/orders", 
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


// --------------- Экшен для сохранения данных ингредиента для модального окна ---------------
export const SET_INGREDIENT_MODAL_DATA = 'SET_INGREDIENT_MODAL_DATA';

// --------------- Экшен для удаления данных ингредиента для модального окна ---------------
export const DELETE_INGREDIENT_MODAL_DATA = 'DELETE_INGREDIENT_MODAL_DATA';