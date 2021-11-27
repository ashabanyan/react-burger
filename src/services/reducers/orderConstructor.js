import { 
  ADD_INGREDIENT_INTO_ORDER,
  DELETE_INGREDIENT_FROM_ORDER,
  UPDATE_ORDER_AFTER_DROP,
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
    case UPDATE_ORDER_AFTER_DROP: {
      return {
        ...state, 
        currentOrderIngredients: action.data
      }
    }
    default: return { ...state }
  }

}