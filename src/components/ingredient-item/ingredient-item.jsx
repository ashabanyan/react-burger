import React, { useState, useEffect } from 'react';
import styles from '../ingredient-item/ingredient-item.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../modal/modal'
import IngredientsDetails from '../ingredient-details/ingredient-details'

const IngredientItem = (props) => {
  const [active, setActive] = useState(false);

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setActive(true);
  }

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setActive(false);
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setActive(false)
      }
    })
  }, []);

  return (
    <li className={`${styles.ingredient_item} mb-10`} onClick={handleOpenModal}>
      <img className={styles.image} src={props.ingredient.image} alt={props.ingredient.name}/>

      <div className={styles.price}>
        <p className={`${styles.price_text} text text_type_main-small mr-1`}>{props.ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className={`${styles.name_text} text text_type_main-default mt-1`}>{props.ingredient.name}</p>

      <Counter count={1} size="default" />

      {active && (
        <Modal onClick={handleCloseModal}>
          <IngredientsDetails itemData={props.ingredient} />
        </Modal>
        )
      }
    </li>
  )
}

export default IngredientItem;