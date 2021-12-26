import { GET_INGREDIENTS_URL } from '../../constants/constants';

// --------------- Получение ингридиентов от API ---------------
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_ERROR';
export const SET_INGREDIENT_MODAL_DATA = 'SET_INGREDIENT_MODAL_DATA';
export const DELETE_INGREDIENT_MODAL_DATA = 'DELETE_INGREDIENT_MODAL_DATA';

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