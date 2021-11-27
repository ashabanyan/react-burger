import { 
  GET_ORDER_NUMBER_REQUEST, 
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  CLEAR_ORDER_NUMBER
} from '../actions/makingOrder';

const initialState = {
  getOrderRequest: false,
  getOrderFailed: false,
  orderNumber: '',
}

export const makingOrderReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ORDER_NUMBER_SUCCESS:
      return {
        ...state, 
        orderNumber: action.data.order.number,
        getOrderRequest: false,
      }
    case GET_ORDER_NUMBER_REQUEST:
      return {
        ...state, 
        getOrderRequest: false,
      }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        getOrderFailed: true,
        getOrderRequest: false,
      }
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