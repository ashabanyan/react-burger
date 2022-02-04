import React, { useMemo } from "react";
import styles from "../order-panel/order-panel.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
// ----- Local -----
import { IOrder } from "../../types/common";
import { dateConverter, priceCounter } from "../../utils/js-utils";
import { useSelector } from "../../redux/hooks";
import IngredientLogo from "../ingredient-logo/ingredient-logo";
import { Sockets } from "../../redux/actions/wsActions";

interface OrderPanelProps {
  order: IOrder;
  wsType: string;
}

const OrderPanel: React.FC<OrderPanelProps> = ({ order, wsType }) => {
  const { ingredients, name, number, createdAt, _id } = order;
  const { allIngredients } = useSelector((store) => store.ingredients);

  const restNumber = useMemo(() => `+${ingredients.length - 5}`, [ingredients]);

  const location = useLocation();

  const getPathname = () => {
    if (wsType === Sockets.AllOrders) {
      return `/feed/${_id}`;
    }

    if (wsType === Sockets.UserOrders) {
      return `/profile/orders/${_id}`;
    }
  };

  const price = useMemo(
    () => allIngredients && priceCounter(order.ingredients, allIngredients),
    [allIngredients, order]
  );

  return (
    <Link
      to={{ pathname: getPathname(), state: { background: location } }}
      className={styles.link}
    >
      <div className={`${styles.order_block} p-6 mb-3`}>
        <div className={`${styles.number_date_block} mb-6`}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {dateConverter(createdAt)}
          </p>
        </div>

        <p className="text text_type_main-medium mb-6">{name}</p>

        <div className={styles.bottom_block}>
          <div className={styles.ingredients_block}>
            {allIngredients &&
              ingredients.map((ing, index) => {
                // eslint-disable-next-line array-callback-return
                if (index > 5) return;
                return (
                  <IngredientLogo
                    key={index}
                    isShifted
                    ingredient={ing}
                    index={index + 1}
                    restNumber={restNumber}
                  />
                );
              })}
          </div>

          <div className={styles.price_block}>
            <p className="text text_type_main-default mr-1">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderPanel;
