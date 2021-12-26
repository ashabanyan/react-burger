
import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED, 
  SET_INGREDIENT_MODAL_DATA,
  DELETE_INGREDIENT_MODAL_DATA,
} from '../actions/ingredients';

const initialState = {
  ingRequest: false,
  ingError: false,
  allIngredients: [],
  currentViewIngredient: {},
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
    case SET_INGREDIENT_MODAL_DATA:
      return {
        ...state, 
        currentViewIngredient: state.allIngredients.find(el => el._id === action.id)
      }
    case DELETE_INGREDIENT_MODAL_DATA: {
      return {
        ...state,
        currentViewIngredient: {}
      }
    }
    default: return state;
  }
}