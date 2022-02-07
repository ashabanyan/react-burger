import { WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_CONNECTION_ERROR } from '../actions/wsActions';
import { TWsActionsUnionType } from '../actions/wsActions';
import { IOrder } from '../../types/common';

type TWsState = {
  messages: IOrder[] | null;
  isConnected: boolean;
  isFailed: boolean;
  total: number | null;
  totalToday: number | null;
  isFirstLoading: boolean;
}

const initialState: TWsState = {
  messages: null,
  isConnected: false,
  isFailed: false,
  total: null,
  totalToday: null,
  isFirstLoading: false,
}

export const wsReducer = (state = initialState, action: TWsActionsUnionType) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        isConnected: true,
        isFailed: false
      }
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state, 
        isConnected: false,
        isFailed: false,
      }
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state, 
        isConnected: false,
        isFailed: true,
      }
    }
    case WS_GET_MESSAGE: {
        return {
          ...state,
          messages: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          isFirstLoading: !!state.messages
        }

    }
    default: return { ...state }
  }
}
