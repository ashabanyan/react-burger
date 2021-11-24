import{ useState ,useMemo } from 'react';
import styles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon, CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Scrollbar } from "react-scrollbars-custom";
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details';
import {useDispatch, useSelector} from 'react-redux';
import { getOrderNumber } from '../../services/actions/makingOrder';
import { useDrop } from 'react-dnd';
import { isObjectEmpty } from '../../utils/js-utils';
import { ADD_INGREDIENT_INTO_ORDER, DELETE_INGREDIENT_FROM_ORDER } from '../../services/actions/orderConstructor';
import { randomKeyGenerate } from '../../utils/js-utils'

const BurgetConstructor = () => {
  const dispatch = useDispatch();
  const { currentOrderBun, currentOrderIngredients } = useSelector(store => store.order);
  const {allIngredients} = useSelector(store => store.ingredients);
  const [active, setActive] = useState(false)

  const [, dropTarget] = useDrop({
    accept: 'ingredient', 
    drop(item) {
       dispatch({
        type: ADD_INGREDIENT_INTO_ORDER,
        ingType: item.type,
        data: {...allIngredients.find(ing => ing._id === item.id ), id: randomKeyGenerate() }
      })
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

  const handleCloseModal = () => setActive(false);

  const deleteIngredient = (id) => dispatch({
    type: DELETE_INGREDIENT_FROM_ORDER,
    ingId: id,
  })

  return (
    <section ref={dropTarget} className={`${styles.section_container} mt-25`}>

      {!isObjectEmpty(currentOrderBun) &&
      <div className="ml-10 mr-5 mb-4">
        <ConstructorElement
          type="top"
          text={currentOrderBun.name  + '(верх)'}
          price={currentOrderBun.price}
          thumbnail={currentOrderBun.image}
          isLocked={true}
        />
      </div>}
      
      {!!currentOrderIngredients.length && 
        <Scrollbar style={{ height: 180 }}>
          <div className={styles.main_block}>
            {currentOrderIngredients.map((item) => (
            <div key={item.id} className={`${styles.element_block} mb-4 mr-4`} >
              <DragIcon type="primary"  />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => deleteIngredient(item.id)}
              />
            </div>
            ))}
          </div>
        </Scrollbar>
      }
      
      {!isObjectEmpty(currentOrderBun) &&
      <div className="ml-10 mt-4">
        <ConstructorElement
          type="bottom"
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