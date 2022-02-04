import { 
  GET_ORDER_NUMBER_REQUEST, 
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  CLEAR_ORDER_NUMBER
} from '../actions/makingOrder';
import { TMakingOrderAction } from '../actions/makingOrder';

type TMakingOrderState = {
  getOrderRequest: boolean;
  getOrderFailed: boolean;
  orderNumber: string | number,
}

const initialState: TMakingOrderState = {
  getOrderRequest: false,
  getOrderFailed: false,
  orderNumber: '',
}

export const makingOrderReducer = (state = initialState, action: TMakingOrderAction): TMakingOrderState => {

  switch(action.type) {
    case GET_ORDER_NUMBER_REQUEST:
      return {
        ...state, 
        getOrderRequest: true,
      }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        getOrderFailed: true,
        getOrderRequest: false,
      }
    }
    case GET_ORDER_NUMBER_SUCCESS:
      return {
        ...state, 
        orderNumber: action.data.order.number,
        getOrderRequest: false,
      }
    case CLEAR_ORDER_NUMBER: {
      return {
        ...state, 
        orderNumber: '',
      }
    }
    default: return state;
  }
}