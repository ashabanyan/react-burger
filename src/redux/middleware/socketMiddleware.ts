import { Middleware, MiddlewareAPI } from 'redux';
import { wsActions, Sockets } from '../actions/wsActions';


export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI) => {
      
    return (next) => (action: any) => {
      const { dispatch } = store;
      let ws: WebSocket | null = null;

      const { type, url, connection } = action
      const { wsInit, onOpen, onClose, onMessage } = wsActions

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
      }
      next(action)
    }
 
  })
}
