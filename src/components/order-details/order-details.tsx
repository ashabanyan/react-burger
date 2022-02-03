import { useSelector } from "../../redux/hooks";

// ---------- LOCAL ----------
import styles from "../order-details/order-details.module.css";
import DONE_IMAGE from "../../images/done.png";
// ---------- TYPES ----------
import { useEffect } from "react";

const OrderDetails = () => {
  const { orderNumber, getOrderRequest } = useSelector(
    (store) => store.makingOrder
  );

  useEffect(() => console.log(getOrderRequest), [getOrderRequest]);

  return (
    <div className={`${styles.content_block} mt-30 mb-30 mr-25 ml-25`}>
      <p className={`${styles.order_number} text text_type_digits-large`}>
        {orderNumber}
      </p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img src={DONE_IMAGE} alt="галочка" className="mt-15" />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.grey_text} text text_type_main-default mt-2`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
