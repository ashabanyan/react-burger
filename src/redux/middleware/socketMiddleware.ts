import { Middleware, MiddlewareAPI } from 'redux';
import { Sockets, wsActionsType } from '../actions/wsActions';
import { AppDispatch, RootState } from '../types';


export const socketMiddleware = (wsActions: wsActionsType): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
      
    return (next) => (action) => {
      const { dispatch } = store;
      let ws: WebSocket | null = null;

      const { type, url, connection } = action
      const { wsInit, onOpen, onClose, onMessage, onError } = wsActions

      if ( type === wsInit) {
        const token = localStorage.getItem('accessToken');
        const WS_URL: string = connection === Sockets.AllOrders ? url : url + `?token=${token}`
        ws = new WebSocket(WS_URL)
      }

      if (type === onClose) {
        ws?.close();
      }

      if (ws) {
        ws.onopen = () => dispatch({ type: onOpen })

        ws.onclose = () => {
          dispatch({ type: onClose })
        }

        ws.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData})
        }

        ws.onerror = () => {
          dispatch({ type: onError })
        }
      }
      next(action)
    }
 
  })
}
