import { useState, useMemo } from "react";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../redux/hooks";
import { useDrop } from "react-dnd";
// ---------- LOCAL ----------
import styles from "../burger-constructor/burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { randomKeyGenerate } from "../../utils/js-utils";
import IngredientItemConstructor from "../ingredient-item-constructor/ingredient-item-constructor";
import { DND_TYPES } from "../../constants/constants";
import { useHistory } from "react-router-dom";
// ---------- REDUX ACTIONS ----------
import { getOrderNumber } from "../../redux/actions/makingOrder";
import {
  ADD_INGREDIENT_INTO_ORDER,
  DELETE_INGREDIENT_FROM_ORDER,
} from "../../redux/actions/orderConstructor";
import {
  UPDATE_ORDER_AFTER_DROP,
  CLEAR_ORDER,
} from "../../redux/actions/orderConstructor";
import { CLEAR_ORDER_NUMBER } from "../../redux/actions/makingOrder";
// ---------- TYPES ----------
import { IDragItem } from "../../types/common";
import { useSelector } from "../../redux/hooks";
import Preloader from "../preloader/preloader";

const BurgetConstructor = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentOrderBun, currentOrderIngredients } = useSelector(
    (store) => store.order
  );
  const { getOrderRequest } = useSelector((store) => store.makingOrder);
  const { allIngredients } = useSelector((store) => store.ingredients);

  const { user } = useSelector((store) => store.auth);
  const [active, setActive] = useState(false);

  const [{ isOver }, dropTarget] = useDrop({
    accept: DND_TYPES.ingredient,
    drop(item: IDragItem) {
      const ingObj = allIngredients!.find((ing) => ing._id === item.id);
      if (ingObj) {
        dispatch({
          type: ADD_INGREDIENT_INTO_ORDER,
          ingType: item.type,
          data: {
            ...ingObj,
            id: randomKeyGenerate(),
          },
        });
      }
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
  });

  const totalPrice = useMemo(() => {
    const bunPrice = currentOrderBun ? currentOrderBun.price : 0;

    const mainPrice = currentOrderIngredients
      ? currentOrderIngredients
          .map((item) => item.price)
          .reduce((sum, item) => sum + item)
      : 0;

    return bunPrice + mainPrice;
  }, [currentOrderIngredients, currentOrderBun]);

  const handleOpenModal = () => {
    if (user) {
      if (currentOrderBun && currentOrderIngredients) {
        const currentIngredientsIds = [
          ...currentOrderIngredients,
          currentOrderBun,
        ];
        dispatch(getOrderNumber(currentIngredientsIds));
        setActive(true);
      }
    } else {
      history.replace({ pathname: "/login" });
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: CLEAR_ORDER });
    dispatch({ type: CLEAR_ORDER_NUMBER });
    setActive(false);
  };

  const deleteIngredient = (id: string) =>
    dispatch({
      type: DELETE_INGREDIENT_FROM_ORDER,
      ingId: id,
    });

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    if (currentOrderIngredients) {
      const dragCard = currentOrderIngredients[dragIndex];
      const newOrderIngredients = [...currentOrderIngredients];
      newOrderIngredients.splice(dragIndex, 1);
      newOrderIngredients.splice(hoverIndex, 0, dragCard);

      dispatch({
        type: UPDATE_ORDER_AFTER_DROP,
        data: newOrderIngredients,
      });
    }
  };

  return (
    <section
      ref={dropTarget}
      className={`${styles.section_container} ${
        isOver ? styles.section_border : ""
      } mt-25`}
    >
      {currentOrderBun && (
        <div className="ml-10 mr-5 mb-4">
          <ConstructorElement
            type="top"
            key={currentOrderBun.id + "верх"}
            text={currentOrderBun.name + "(верх)"}
            price={currentOrderBun.price}
            thumbnail={currentOrderBun.image}
            isLocked={true}
          />
        </div>
      )}

      {currentOrderIngredients && (
        <div className={styles.ingredients_wrapper}>
          {currentOrderIngredients.map((item, index) => (
            <IngredientItemConstructor
              key={item.id}
              item={item}
              id={item.id ?? ""}
              index={index}
              deleteIngredient={deleteIngredient}
              moveCard={moveCard}
            />
          ))}
        </div>
      )}

      {currentOrderBun && (
        <div className="ml-10 mt-3">
          <ConstructorElement
            type="bottom"
            key={currentOrderBun.id + "низ"}
            text={currentOrderBun.name + "(низ)"}
            price={currentOrderBun.price}
            thumbnail={currentOrderBun.image}
            isLocked={true}
          />
        </div>
      )}

      {!!totalPrice && (
        <div className={`${styles.total} mt-10 mr-4`}>
          <div className={`${styles.total_price} mr-10`}>
            <p
              className={`${styles.total_price_number} text text_type_main-default mr-2`}
            >{`${totalPrice}`}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={handleOpenModal} type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      )}

      {active &&
        (getOrderRequest ? (
          <Preloader />
        ) : (
          <Modal onClick={handleCloseModal}>
            <OrderDetails />
          </Modal>
        ))}
    </section>
  );
};

export default BurgetConstructor;
