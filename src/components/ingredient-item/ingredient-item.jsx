import React from 'react';
import styles from '../ingredient-item/ingredient-item.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';


const IngredientItem = ({ onClick, ingredient }) => {

  return (
    <>
      <li className={`${styles.ingredient_item} mb-10`} onClick={() => onClick(ingredient)}>
        <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>

        <div className={styles.price}>
          <p className={`${styles.price_text} text text_type_main-small mr-1`}>{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>

        <p className={`${styles.name_text} text text_type_main-default mt-1`}>{ingredient.name}</p>

        <Counter count={1} size="default" />

      </li>
    </>
  )
}

IngredientItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  ingredient: PropTypes.shape(
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
}

export default IngredientItem;