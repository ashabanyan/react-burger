import { useEffect, useMemo } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "../../redux/hooks";
import { RootState } from "../../redux/types";
import { dateConverter, priceCounter } from "../../utils/js-utils";
import OrderIngredientInfo from "../order-ingredient-info/order-ingredient-info";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../order-information/order-information.module.css";
import { getOrderStatusName } from "../../utils/js-utils";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  Sockets,
} from "../../redux/actions/wsActions";

interface IMatchParams {
  orderId?: string;
}

interface OrderInformationProps {
  type?: string;
  wsType?: string;
}

const OrderInformation: React.FC<OrderInformationProps> = ({
  type,
  wsType,
}) => {
  const dispatch = useDispatch();
  const { messages } = useSelector((store: RootState) => store.ws);
  const { allIngredients } = useSelector((store) => store.ingredients);

  useEffect(() => {
    if (type === "single") {
      dispatch({
        type: WS_CONNECTION_START,
        url:
          wsType === Sockets.AllOrders
            ? "wss://norma.nomoreparties.space/orders/all"
            : wsType === Sockets.UserOrders
            ? "wss://norma.nomoreparties.space/orders"
            : "",
        connection: wsType,
      });
      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const match = useRouteMatch<IMatchParams>();

  const orderId = useMemo(() => {
    return match.params.orderId;
  }, [match]);

  const currentOrder = useMemo(() => {
    return messages && messages.find((item) => item._id === orderId);
  }, [orderId, messages]);

  const price = useMemo(
    () =>
      allIngredients &&
      currentOrder &&
      priceCounter(currentOrder.ingredients, allIngredients),
    [allIngredients, currentOrder]
  );

  return (
    <>
      {currentOrder && (
        <div
          className={
            type === "single" ? styles.single_container : styles.container
          }
        >
          <p
            className={`text text_type_digits-default ${
              type === "single" ? styles.number_block : ""
            }`}
          >
            #{currentOrder.number}
          </p>
          <p className="text text_type_main-medium mt-10">
            {currentOrder.name}
          </p>
          <p
            className="text text_type_main-default mt-3"
            style={{ color: "#00CCCC" }}
          >
            {getOrderStatusName(currentOrder.status)}
          </p>
          <div className="mt-15 mb-6">
            <p className="text text_type_main-medium">Состав:</p>
          </div>

          <OrderIngredientInfo ingredients={currentOrder.ingredients} />

          <div className={`mt-6 ${styles.bottom_block}`}>
            <p className="text text_type_main-default text_color_inactive">
              {dateConverter(currentOrder.createdAt)}
            </p>
            <div className={styles.price_block}>
              <p className={`mr-2  text text_type_digits-default`}>{price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderInformation;
