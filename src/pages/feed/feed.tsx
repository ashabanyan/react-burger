import { useEffect } from "react";
import { useDispatch, useSelector } from "../../redux/hooks";
// ---------- LOCAL ----------
import OrderPanel from "../../components/order-panel/order-panel";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  Sockets,
} from "../../redux/actions/wsActions";
import { RootState } from "../../redux/types";
import styles from "./feed.module.css";
import OrderReadyStatus from "../../components/order-ready-status/order-ready-status";
import OrdersCounter from "../../components/orders-counter/orders-counter";
import { OrdersCounterTypes } from "../../constants/constants";

const FeedPage = () => {
  const dispatch = useDispatch();
  const { messages, total, totalToday } = useSelector(
    (store: RootState) => store.ws
  );

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      url: "wss://norma.nomoreparties.space/orders/all",
      connection: Sockets.AllOrders,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
      <div className={styles.content_container}>
        {messages && (
          <div className={styles.ingredients_wrapper}>
            {messages.map((item, index) => (
              <OrderPanel order={item} key={index} wsType={Sockets.AllOrders} />
            ))}
          </div>
        )}

        <div className={`ml-15`} style={{ width: "50%" }}>
          <OrderReadyStatus />
          <OrdersCounter title={OrdersCounterTypes.total} count={total ?? 0} />
          <OrdersCounter
            title={OrdersCounterTypes.totalToday}
            count={totalToday ?? 0}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
