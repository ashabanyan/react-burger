import { IOrder } from '../../types/common';

export const WS_CONNECTION_START: 'WS_CONNECTION_START'  = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';

export type TWsConnectionStart = {
  readonly type: typeof WS_CONNECTION_START;
  readonly url: string;
  readonly connection: string;
}

export type TWsConnectionSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export type TWsConnectionClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export type TWsGetMessage = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: {
    orders: IOrder[];
    success: boolean;
    total: number;
    totalToday: number;
  }
}

export type TWsConnectionError = {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export type TWsActionsUnionType = 
  | TWsConnectionStart
  | TWsConnectionSuccess
  | TWsConnectionClosed
  | TWsGetMessage
  | TWsConnectionError

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export enum Sockets {
  AllOrders = 'all_orders',
  UserOrders = 'user_orders'
}
