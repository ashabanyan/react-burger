import React from 'react';
import styles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon, CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Scrollbar } from "react-scrollbars-custom";

class BurgetConstructor extends React.Component {
  render() {
    return (
      <section className={`${styles.section_container} mt-25`}>

        <div className="ml-10 mr-5 mb-4">
          <ConstructorElement
            text={this.props.orderInfo.top_bun.name  + '(верх)'}
            price={this.props.orderInfo.top_bun.price}
            thumbnail={this.props.orderInfo.top_bun.image}
            isLocked={true}
          />
        </div>
        
        <Scrollbar style={{ height: 180 }}>
          <div className={styles.main_block}>
            {this.props.orderInfo.other.map((item, index) => (
              <div className={`${styles.element_block} mb-4 mr-2`} >
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
            text={this.props.orderInfo.bottom_bun.name  + '(низ)'}
            price={this.props.orderInfo.bottom_bun.price}
            thumbnail={this.props.orderInfo.bottom_bun.image}
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
}

export default BurgetConstructor;

//          <ConstructorElement
//           type="top"
//           isLocked={true}
//           text="Краторная булка N-200i (верх)"
//           price={200}
//           thumbnail={'https://yandex-praktikum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png'}
//         />
//         <ConstructorElement
//           text="Краторная булка N-200i (верх)"
//           price={50}
//           thumbnail={'https://yandex-praktikum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png'}
//         />
//         <ConstructorElement
//           type="bottom"
//           isLocked={true}
//           text="Краторная булка N-200i (низ)"
//           price={200}
//           thumbnail={'https://yandex-praktikum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png'}
//         />