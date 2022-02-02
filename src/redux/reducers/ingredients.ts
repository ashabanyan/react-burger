import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED, 
  SET_INGREDIENT_MODAL_DATA,
  DELETE_INGREDIENT_MODAL_DATA,
} from '../actions/ingredients';

import { IIngredient } from '../../types/common';
import { TIngredientsActions } from '../actions/ingredients';

export type TIngredientsState = {
  ingRequest: boolean;
  ingError: boolean;
  allIngredients: Array<IIngredient> | null;
  currentViewIngredient: IIngredient | null | undefined ;
}

const initialState: TIngredientsState = {
  ingRequest: false,
  ingError: false,
  allIngredients: null,
  currentViewIngredient: null,
}

export const ingredientReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch(action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingRequest: true,
        ingError: false,
      }
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingRequest: false,
        ingError: true,
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingRequest: false,
        ingError: false,
        allIngredients: action.ingredientsData
      }
    case SET_INGREDIENT_MODAL_DATA:
      return {
        ...state, 
        currentViewIngredient: state.allIngredients ? state.allIngredients.find(el => el._id === action.id) : null
      }
    case DELETE_INGREDIENT_MODAL_DATA: {
      return {
        ...state,
        currentViewIngredient: null
      }
    }
    default: return state;
  }
}