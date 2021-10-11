import React from 'react';
import styles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon, CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Scrollbar } from "react-scrollbars-custom";
import PropTypes from 'prop-types';

const BurgetConstructor = (props) => {
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
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgetConstructor;