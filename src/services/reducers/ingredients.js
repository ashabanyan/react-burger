
import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED, 
} from '../actions/ingredients';

const initialState = {
  ingRequest: false,
  ingError: false,
  allIngredients: [],
}

export const ingredientReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingRequest: true,
        ingError: false,
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingRequest: false,
        ingError: false,
        allIngredients: action.ingredientsData
      }
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingRequest: false,
        ingError: true,
      }
    default: return state;
  }
}