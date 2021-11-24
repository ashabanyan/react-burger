import { 
  SET_INGREDIENT_MODAL_DATA,
  DELETE_INGREDIENT_MODAL_DATA,
} from '../actions/ingredientModal';

const initialState = {
  currentViewIngredient: {},
}

export const ingredientModalReducer = (state = initialState, action) => {
  switch(action.type) {
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