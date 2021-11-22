import React, { useState, useEffect,useMemo } from 'react';
import styles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon, CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Scrollbar } from "react-scrollbars-custom";
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details';
import {useDispatch, useSelector} from 'react-redux';
import { CONVERT_DATA_TO_ORDER } from '../../services/actions/burger';
import { getOrderNumber } from '../../services/actions/burger';

const BurgetConstructor = () => {
  const dispatch = useDispatch();
  const { allIngredients, currentBurgerIngredients, orderNumber } = useSelector(store => store.burger);
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (allIngredients && allIngredients.length ) {
      dispatch({type: CONVERT_DATA_TO_ORDER})
    }
  }, [allIngredients]);

  const totalPrice = useMemo(() => 
    currentBurgerIngredients && 
    currentBurgerIngredients.length && 
    currentBurgerIngredients.map(item => item.price).reduce((sum, item) => sum + item)
    ,[currentBurgerIngredients])

  const handleOpenModal = () => {
    dispatch(getOrderNumber(currentBurgerIngredients))
    setActive(true)
  };

  const handleCloseModal = () => setActive(false);

  return (
    <section className={`${styles.section_container} mt-25`}>
      
      {currentBurgerIngredients && currentBurgerIngredients.length && (
          
          <>
            <div className="ml-10 mr-5 mb-4">
              <ConstructorElement
                type="top"
                text={currentBurgerIngredients.find(item => item.type === 'bun').name  + '(верх)'}
                price={currentBurgerIngredients.find(item => item.type === 'bun').price}
                thumbnail={currentBurgerIngredients.find(item => item.type === 'bun').image}
                isLocked={true}
              />
            </div>

            <Scrollbar style={{ height: 180 }}>
              <div className={styles.main_block}>
                {currentBurgerIngredients.filter(item => item.type !== 'bun').map((item, index) => (
                <div key={index} className={`${styles.element_block} mb-4 mr-4`} >
                  <DragIcon type="primary"  />
                  <ConstructorElement
            
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  />
                </div>
                ))}
              </div>
            </Scrollbar>

            <div className="ml-10 mt-4">
              <ConstructorElement
                type="bottom"
                text={currentBurgerIngredients.find(item => item.type === 'bun').name  + '(верх)'}
                price={currentBurgerIngredients.find(item => item.type === 'bun').price}
                thumbnail={currentBurgerIngredients.find(item => item.type === 'bun').image}
                isLocked={true}
              />
            </div>
          </>
      )}
      
      {totalPrice && (
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