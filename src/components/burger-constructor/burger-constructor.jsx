import React, { useState, useEffect, useContext, useReducer } from 'react';
import styles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon, CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Scrollbar } from "react-scrollbars-custom";
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details';
import { BurgerContext } from "../../context/burgerContext";

const initialTotalPrice = { count: 0};

const totalPriceCounter = (state, action) => action.map(item => item.price).reduce((sum, item) => sum + item)


const BurgetConstructor = () => {
  const [active, setActive] = useState(false)
  const [orderNumber, setOrderNumber] = useState();
  const [orderInfo, setOrderInfo] = useContext(BurgerContext);

  const [totalPrice, dispatch] = useReducer(totalPriceCounter, initialTotalPrice );
  
  useEffect(() => {
    orderInfo && dispatch(orderInfo)
  }, [orderInfo])

  const handleOpenModal = async () => {
    const response = await fetch("https://norma.nomoreparties.space/api/orders", 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      method: 'POST', 
      body: JSON.stringify({ "ingredients": orderInfo && orderInfo.map(item => item._id)})
    });
    const result = await response.json();
    setOrderNumber(result.order.number);

    setActive(true)
  };
  const handleCloseModal = () => setActive(false);

  return (
    <section className={`${styles.section_container} mt-25`}>
      
      {orderInfo && (
          
          <>
            <div className="ml-10 mr-5 mb-4">
              <ConstructorElement
                type="top"
                text={orderInfo.find(item => item.type === 'bun').name  + '(верх)'}
                price={orderInfo.find(item => item.type === 'bun').price}
                thumbnail={orderInfo.find(item => item.type === 'bun').image}
                isLocked={true}
              />
            </div>

            <Scrollbar style={{ height: 180 }}>
              <div className={styles.main_block}>
                {orderInfo.filter(item => item.type !== 'bun').map((item, index) => (
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
                text={orderInfo.find(item => item.type === 'bun').name  + '(верх)'}
                price={orderInfo.find(item => item.type === 'bun').price}
                thumbnail={orderInfo.find(item => item.type === 'bun').image}
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
          <OrderDetails orderNumber={orderNumber}/>
        </Modal>
        )
      }
          
      
    </section>
  )
}

export default BurgetConstructor;