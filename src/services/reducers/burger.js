import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED, 
  CONVERT_DATA_TO_ORDER, 
  GET_ORDER_NUMBER_SUCCESS, 
  SET_INGREDIENT_MODAL_DATA,
  DELETE_INGREDIENT_MODAL_DATA,
} from '../actions/burger';
import { convertDataToOrder } from '../../utils/convertDataToOrder';
const initialState = {
  ingRequest: false,
  ingError: false,

  allIngredients: [],
  currentBurgerIngredients: [],
  currentViewIngredient: {},
  orderNumber: '',
}

export const burgerReducer = (state = initialState, action) => {
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
    case CONVERT_DATA_TO_ORDER:
      return {
        ...state,
        currentBurgerIngredients: convertDataToOrder(state.allIngredients),
      }
    case GET_ORDER_NUMBER_SUCCESS:
      return {
        ...state, 
        orderNumber: action.data.order.number
      }
    case SET_INGREDIENT_MODAL_DATA:
      return {
        ...state, 
        currentViewIngredient: action.ingredient
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