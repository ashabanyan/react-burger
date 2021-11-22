import {useEffect} from 'react';
import styles from '../ingredient-details/ingredient-details.module.css'
import PropTypes from 'prop-types';
import IngredientType from '../../utils/types'
import {useDispatch, useSelector} from 'react-redux';

const IngredientDetails = () => {
  const ingredient = useSelector(store => store.burger.currentViewIngredient);
  
  return (
    <div className="mt-10">
      <p className="text text_type_main-large ml-10">Детали ингредиента</p>
      <div className={`${styles.content_block} ml-25 mr-25 mb-15`}>
        <img src={ingredient.image_large} alt={ingredient.name}/>
        <p className={`${styles.ingredient_name} text text_type_main-medium mt-4`}>{ingredient.name}</p>

        <div className={`${styles.info} mt-8`}>
          <div className={styles.info_block}>
            <p className="text text_type_main-default">Каллории,ккал</p>
            <p className="text text_type_main-default">{ingredient.calories}</p>
          </div>
          <div className={styles.info_block}>
            <p className="text text_type_main-default">Белки, г</p>
            <p className="text text_type_main-default">{ingredient.proteins}</p>
          </div>
          <div className={styles.info_block}>
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_main-default">{ingredient.fat}</p>
          </div>
          <div className={styles.info_block}>
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_main-default">{ingredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;