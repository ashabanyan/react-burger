import styles from "./order-history.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../redux/hooks";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  Sockets,
} from "../../redux/actions/wsActions";
import OrderPanel from "../order-panel/order-panel";
import { RootState } from "../../redux/types";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((store: RootState) => store.ws);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      url: "wss://norma.nomoreparties.space/orders",
      connection: Sockets.UserOrders,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.orders_container}>
      {messages && (
        <div className={styles.ingredients_wrapper}>
          {messages.map((item, index) => (
            <OrderPanel order={item} key={index} wsType={Sockets.UserOrders} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
