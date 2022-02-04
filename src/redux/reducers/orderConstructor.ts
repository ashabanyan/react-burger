import { 
  ADD_INGREDIENT_INTO_ORDER,
  DELETE_INGREDIENT_FROM_ORDER,
  UPDATE_ORDER_AFTER_DROP,
  CLEAR_ORDER
} from '../actions/orderConstructor';
import { IIngredient } from '../../types/common';
import { TOrderConstructorActions } from '../actions/orderConstructor';

type TOrderConstructorState = {
  currentOrderBun: IIngredient | null;
  currentOrderIngredients: Array<IIngredient> | null ;
}

const initialState: TOrderConstructorState = {
  currentOrderBun: null,
  currentOrderIngredients: null,
}

export const orderConstructorReducer = (state = initialState, action: TOrderConstructorActions): TOrderConstructorState => {
  switch(action.type) {
    case ADD_INGREDIENT_INTO_ORDER: {
      if (action.ingType === 'bun') {
        return {
          ...state,
          currentOrderBun: action.data,
        }
      } else return {
        ...state,
        currentOrderIngredients: state.currentOrderIngredients ? [...state.currentOrderIngredients, action.data] : [ action.data ], 
      }
    }
    case DELETE_INGREDIENT_FROM_ORDER: {
      return {
        ...state,
        currentOrderIngredients: state.currentOrderIngredients && state.currentOrderIngredients.filter(item => item.id !== action.ingId)
      }
    }
    case UPDATE_ORDER_AFTER_DROP: {
      return {
        ...state, 
        currentOrderIngredients: action.data
      }
    }
    case CLEAR_ORDER: {
      return {
        ...state, 
        currentOrderBun: null,
        currentOrderIngredients: null,
      }
    }
    default: return { ...state }
  }
}