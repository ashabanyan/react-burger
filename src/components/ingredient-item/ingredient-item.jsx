import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from 'react';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
// ---------- LOCAL ----------
import styles from '../ingredient-item/ingredient-item.module.css'
import IngredientType from '../../utils/types'
import { DND_TYPES } from '../../constants/constants';

const IngredientItem = ({ ingredient }) => {
  const id = ingredient._id;
  const type = ingredient.type;
  const [{isDrag}, dragRef] = useDrag({
    type: DND_TYPES.ingredient,
    item: {id, type },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    })
  })

  const {currentOrderBun, currentOrderIngredients } = useSelector(store => store.order);

  const counter = useMemo(() => {
    if (type === 'bun' && id === currentOrderBun._id) {
      return 1;
    } else return currentOrderIngredients.filter(item => item._id === id).length;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrderBun, currentOrderIngredients]) 

  const location = useLocation();

  return (
      <Link key={id} to={{ pathname: `/ingredients/${id}`, state: { background: location } }} className={styles.link}>
        {!isDrag &&
        <li ref={dragRef} className={`${styles.ingredient_item} mb-10`} >
          <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>

          <div className={styles.price}>
            <p className={`${styles.price_text} text text_type_main-small mr-1`}>{ingredient.price}</p>
            <CurrencyIcon type="primary" />
          </div>

          <p className={`${styles.name_text} text text_type_main-default mt-1`}>{ingredient.name}</p>

          <Counter count={counter} size="default" />
        </li>}
      </Link>
  )
}

IngredientItem.propTypes = {
  ingredient: PropTypes.shape(IngredientType)
}

export default IngredientItem;