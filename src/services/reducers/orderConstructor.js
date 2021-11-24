import { 
  ADD_INGREDIENT_INTO_ORDER,
  DELETE_INGREDIENT_FROM_ORDER,
} from '../actions/orderConstructor';

const initialState = {
  currentOrderBun: {},
  currentOrderIngredients: [],
}


export const orderConstructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT_INTO_ORDER: {
      if (action.ingType === 'bun') {
        return {
          ...state,
          currentOrderBun: action.data,
        }
      } else return {
        ...state,
        currentOrderIngredients: [...state.currentOrderIngredients, action.data], 
      }
    }
    case DELETE_INGREDIENT_FROM_ORDER: {
      return {
        ...state,
        currentOrderIngredients: state.currentOrderIngredients.filter(item => item.id !== action.ingId)
      }
    }
    default: return { ...state }
  }

}