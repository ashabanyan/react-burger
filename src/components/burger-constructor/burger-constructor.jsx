import React, { useState, useEffect } from 'react';
import styles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon, CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Scrollbar } from "react-scrollbars-custom";
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';


const BurgetConstructor = ({orderInfo}) => {
  const [active, setActive] = useState(false)
  const [order, setOrder] = useState(
    {
      number: "034536", 
    }
  )

  const handleOpenModal = () => setActive(true);
  const handleCloseModal = () => setActive(false);

  return (
    <section className={`${styles.section_container} mt-25`}>

      <div className="ml-10 mr-5 mb-4">
        <ConstructorElement
          type="top"
          text={orderInfo.top_bun.name  + '(верх)'}
          price={orderInfo.top_bun.price}
          thumbnail={orderInfo.top_bun.image}
          isLocked={true}
        />
      </div>
      
      <Scrollbar style={{ height: 180 }}>
        <div className={styles.main_block}>
          {orderInfo.other.map((item, index) => (
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
          text={orderInfo.bottom_bun.name  + '(низ)'}
          price={orderInfo.bottom_bun.price}
          thumbnail={orderInfo.bottom_bun.image}
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
          <OrderDetails orderNumber={order.number}/>
        </Modal>
        )
      }
    </section>
  )
}

BurgetConstructor.propTypes = {
  orderInfo: PropTypes.exact({
    top_bun: PropTypes.exact({
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    }),
    other: PropTypes.arrayOf(PropTypes.shape(
      {
        calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
      })
    ), 
    bottom_bun: PropTypes.exact({
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    })
  })
}

export default BurgetConstructor;