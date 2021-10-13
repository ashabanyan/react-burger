import React, { useState, useEffect } from 'react';
import styles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon, CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Scrollbar } from "react-scrollbars-custom";
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'

const BurgetConstructor = (props) => {
  const [active, setActive] = useState(false)
  const [order, setOrder] = useState(
    {
      number: "034536", 
    }
  )

  const handleOpenModal = () => setActive(true);

  const handleCloseModal = () => setActive(false);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setActive(false)
      }
    })
  }, []);

  return (
    <section className={`${styles.section_container} mt-25`}>

      <div className="ml-10 mr-5 mb-4">
        <ConstructorElement
          type="top"
          text={props.orderInfo.top_bun.name  + '(верх)'}
          price={props.orderInfo.top_bun.price}
          thumbnail={props.orderInfo.top_bun.image}
          isLocked={true}
        />
      </div>
      
      <Scrollbar style={{ height: 180 }}>
        <div className={styles.main_block}>
          {props.orderInfo.other.map((item, index) => (
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
          text={props.orderInfo.bottom_bun.name  + '(низ)'}
          price={props.orderInfo.bottom_bun.price}
          thumbnail={props.orderInfo.bottom_bun.image}
          isLocked={true}
        />
      </div>

      <div className={`${styles.total} mt-10 mr-4`}>
        <div className={`${styles.total_price} mr-10`}>
          <p className={`${styles.total_price_number} text text_type_main-default mr-2`}>610</p>
          <CurrencyIcon type="primary"/>
        </div>
        <Button onClick={handleOpenModal} type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>

      {active && (
        <Modal onClick={handleCloseModal}>
          <OrderDetails number={order.number}/>
        </Modal>
        )
      }
    </section>
  )
}

export default BurgetConstructor;