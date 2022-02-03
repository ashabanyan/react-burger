import { useMemo } from "react";
import { useSelector } from "../../redux/hooks";
import { RootState } from "../../redux/types";
import styles from "./order-ready-status.module.css";

const OrderReadyStatus: React.FC = () => {
  const { messages } = useSelector((store) => store.ws);

  const readyOrdersNumber = useMemo(
    () => messages && messages.filter((item) => item.status === "done"),
    [messages]
  );

  const progressOrdersNumber = useMemo(
    () => messages && messages.filter((item) => item.status === "pending"),
    [messages]
  );

  return (
    <div className={styles.container}>
      <div className={styles.orders_status_block_wrapper}>
        <p className="text text_type_main-medium mb-6">Готовы:</p>
        <ul className={styles.orders_status_block}>
          {!!readyOrdersNumber?.length ? (
            readyOrdersNumber.map((item, index) => (
              <li key={index}>
                <p className="text text_type_main-small">{item.number}</p>
              </li>
            ))
          ) : (
            <p className="text text_type_main-default">Нет готовых заказов</p>
          )}
        </ul>
      </div>

      <div className={styles.orders_status_block_wrapper}>
        <p className="text text_type_main-medium mb-6">В работе:</p>
        <ul className={styles.orders_status_block}>
          {!!progressOrdersNumber?.length ? (
            progressOrdersNumber.map((item, index) => (
              <li key={index}>
                <p className="text text_type_main-small">{item.number}</p>
              </li>
            ))
          ) : (
            <p className="text text_type_main-default">Нет заказов в работе</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default OrderReadyStatus;
