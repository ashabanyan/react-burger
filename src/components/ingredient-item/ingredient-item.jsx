import React from 'react';
import styles from '../ingredient-item/ingredient-item.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

class IngredientItem extends React.Component {
  render() {
    return (
      <li className={`${styles.ingredient_item} mb-10`}>
        <img className={styles.image} src={this.props.ingredient.image} alt={this.props.ingredient.name}/>

        <div className={styles.price}>
          <p className={`${styles.price_text} text text_type_main-small mr-1`}>{this.props.ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>

        <p className={`${styles.name_text} text text_type_main-default mt-1`}>{this.props.ingredient.name}</p>

        <Counter count={1} size="default" />
      </li>
    )
  }
}

export default IngredientItem;