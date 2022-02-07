import { wsReducer } from './wsReducer';
import * as types from '../actions/wsActions';
import { wsReducerInitialState, getMessagesData } from '../../constants/test-constants/reducer';

describe('wsActions reducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(wsReducerInitialState)
  })

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer(undefined, { type: types.WS_CONNECTION_SUCCESS })).toEqual({
      ...wsReducerInitialState, 
      isConnected: true,
      isFailed: false
    })
  })

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(wsReducer(undefined, { type: types.WS_CONNECTION_CLOSED })).toEqual({
      ...wsReducerInitialState, 
      isConnected: false,
      isFailed: false
    })
  })

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(wsReducer(undefined, { type: types.WS_CONNECTION_ERROR })).toEqual({
      ...wsReducerInitialState, 
      isConnected: false,
      isFailed: true,
    })
  })

  it('should handle WS_GET_MESSAGE', () => {
    expect(wsReducer(undefined, { type: types.WS_GET_MESSAGE, payload: getMessagesData })).toEqual({
      ...wsReducerInitialState, 
      messages: getMessagesData.orders,
      total: getMessagesData.total,
      totalToday: getMessagesData.totalToday,
      isFirstLoading: !!getMessagesData.messages
    })
  })
})