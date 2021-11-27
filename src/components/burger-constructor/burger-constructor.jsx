import{ useState ,useMemo, useEffect } from 'react';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Scrollbar } from "react-scrollbars-custom";
import {useDispatch, useSelector} from 'react-redux';
import { useDrop } from 'react-dnd';
// ---------- LOCAL ----------
import styles from '../burger-constructor/burger-constructor.module.css';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details';
import { isObjectEmpty } from '../../utils/js-utils';
import { randomKeyGenerate } from '../../utils/js-utils'
import IngredientItemConstructor from '../ingredient-item-constructor/ingredient-item-constructor';
import { DND_TYPES } from '../../constants/constants';
// ---------- REDUX ACTIONS ----------
import { getOrderNumber } from '../../services/actions/makingOrder';
import { ADD_INGREDIENT_INTO_ORDER, DELETE_INGREDIENT_FROM_ORDER } from '../../services/actions/orderConstructor';
import { UPDATE_ORDER_AFTER_DROP, CLEAR_ORDER } from '../../services/actions/orderConstructor';
import { CLEAR_ORDER_NUMBER } from '../../services/actions/makingOrder';

const BurgetConstructor = () => {
  const dispatch = useDispatch();
  const { currentOrderBun, currentOrderIngredients } = useSelector(store => store.order);
  const {allIngredients} = useSelector(store => store.ingredients);
  const [active, setActive] = useState(false)

  const [{isOver}, dropTarget] = useDrop({
    accept: DND_TYPES.ingredient, 
    drop(item) {
       dispatch({
        type: ADD_INGREDIENT_INTO_ORDER,
        ingType: item.type,
        data: {...allIngredients.find(ing => ing._id === item.id ), id: randomKeyGenerate() }
      })
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver()
      }
    }
  })

  const totalPrice = useMemo(() => {
    const bunPrice = currentOrderBun && currentOrderBun.price;
    const mainPrice = currentOrderIngredients.length && currentOrderIngredients.map(item => item.price).reduce((sum, item) => sum + item);
    return bunPrice + mainPrice;
  } ,[currentOrderIngredients, currentOrderBun])

  const handleOpenModal = () => {
    const currentIngredientsIds = [
      ...currentOrderIngredients,
      currentOrderBun,
    ]
    dispatch(getOrderNumber(currentIngredientsIds))
    setActive(true)
  };

  const handleCloseModal = () => {
    dispatch({type: CLEAR_ORDER})
    dispatch({type: CLEAR_ORDER_NUMBER})
    setActive(false)
  };

  const deleteIngredient = (id) => dispatch({
    type: DELETE_INGREDIENT_FROM_ORDER,
    ingId: id,
  })

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = currentOrderIngredients[dragIndex];
    const newOrderIngredients = [...currentOrderIngredients];
    newOrderIngredients.splice(dragIndex, 1);
    newOrderIngredients.splice(hoverIndex, 0, dragCard);

    dispatch({
      type: UPDATE_ORDER_AFTER_DROP,
      data: newOrderIngredients,
    })
  }

  const constuctorHeight = useMemo(() => currentOrderIngredients.length > 2 ? 265 : 88 * currentOrderIngredients.length, [currentOrderIngredients]) ;

  return (
    <section ref={dropTarget} className={`${styles.section_container} ${isOver ? styles.section_border : ''} mt-25`}>

      {!isObjectEmpty(currentOrderBun) &&
      <div className="ml-10 mr-5 mb-4">
        <ConstructorElement
          type="top"
          key={currentOrderBun.id + 'верх'}
          text={currentOrderBun.name  + '(верх)'}
          price={currentOrderBun.price}
          thumbnail={currentOrderBun.image}
          isLocked={true}
        />
      </div>}
      
      {!!currentOrderIngredients.length && 
        <Scrollbar style={{ height: constuctorHeight }}>
          <div className={styles.main_block} >
            {currentOrderIngredients.map((item, index) => (<IngredientItemConstructor key={item.id} item={item} id={item.id} index={index} deleteIngredient={deleteIngredient} moveCard={moveCard}/>))}
          </div>
        </Scrollbar>}
      
      {!isObjectEmpty(currentOrderBun) &&
      <div className="ml-10 mt-4">
        <ConstructorElement
          type="bottom"
          key={currentOrderBun.id + 'низ'}
          text={currentOrderBun.name  + '(низ)'}
          price={currentOrderBun.price}
          thumbnail={currentOrderBun.image}
          isLocked={true}
        />
      </div>}

      {!!totalPrice && (
        <div className={`${styles.total} mt-10 mr-4`}>
          <div className={`${styles.total_price} mr-10`}>
            <p className={`${styles.total_price_number} text text_type_main-default mr-2`}>{`${totalPrice}`}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <Button onClick={handleOpenModal} type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      )}

      {active && (
        <Modal onClick={handleCloseModal}>
          <OrderDetails />
        </Modal>
        )
      }
    </section>
  )
}

export default BurgetConstructor;