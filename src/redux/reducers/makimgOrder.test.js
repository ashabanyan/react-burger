import { makingOrderReducer } from './makingOrder';
import * as types from '../actions/makingOrder';
import { newCreatedOrderData } from '../../constants/test-constants/reducer';


describe('making order reducer', () => {
  it('should return the initial state', () => {
    expect(makingOrderReducer(undefined, {})).toEqual(
      {
        getOrderRequest: false,
        getOrderFailed: false,
        orderNumber: '',
      }
    )
  })

  it('should handle GET_ORDER_NUMBER_REQUEST', () => {
    expect(makingOrderReducer(undefined, { type: types.GET_ORDER_NUMBER_REQUEST })).toEqual({
      getOrderRequest: true,
      getOrderFailed: false,
      orderNumber: '',
    })
  })

  it('should handle GET_ORDER_NUMBER_FAILED', () => {
    expect(makingOrderReducer(undefined, { type: types.GET_ORDER_NUMBER_FAILED })).toEqual({
      getOrderRequest: false,
      getOrderFailed: true,
      orderNumber: '',
    })
  })

  it('should handle GET_ORDER_NUMBER_SUCCESS', () => {
    expect(makingOrderReducer(undefined, { type: types.GET_ORDER_NUMBER_SUCCESS, data: newCreatedOrderData })).toEqual({
      getOrderRequest: false,
      getOrderFailed: false,
      orderNumber: newCreatedOrderData.order.number,
    })
  })

  it('should handle CLEAR_ORDER_NUMBER', () => {
    expect(makingOrderReducer(undefined, { type: types.CLEAR_ORDER_NUMBER })).toEqual({
      getOrderRequest: false,
      getOrderFailed: false,
      orderNumber: '',
    })
  })
})