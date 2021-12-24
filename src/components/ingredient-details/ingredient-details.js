import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// ---------- LOCAL ----------
import styles from '../ingredient-details/ingredient-details.module.css'
import { SET_INGREDIENT_MODAL_DATA } from '../../services/actions/ingredients';

const IngredientDetails = ({ type }) => {
  const { allIngredients, currentViewIngredient} = useSelector(store => store.ingredients);
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const ingredientId = useMemo(() => {
    return match.params.ingredientId
  }, [match])

  useEffect(() => {
    dispatch({ type: SET_INGREDIENT_MODAL_DATA, id: ingredientId });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allIngredients])

  return (
    <>
      {currentViewIngredient && (
        <div className={`${styles.ingredient_container} ${type ? styles.ingredient_single_container : ''}`}>
          <p className={`text text_type_main-large ${!type ? "ml-10" : ''} ${type ? styles.single_heading : ''}`} >Детали ингредиента</p>
          <div className={`${styles.content_block} ml-25 mr-25 mb-15`}>
            <img src={currentViewIngredient.image_large} alt={currentViewIngredient.name}/>
            <p className={`${styles.ingredient_name} text text_type_main-medium mt-4`}>{currentViewIngredient.name}</p>

            <div className={`${styles.info} mt-8`}>
              <div className={styles.info_block}>
                <p className="text text_type_main-default">Каллории,ккал</p>
                <p className="text text_type_main-default">{currentViewIngredient.calories}</p>
              </div>
              <div className={styles.info_block}>
                <p className="text text_type_main-default">Белки, г</p>
                <p className="text text_type_main-default">{currentViewIngredient.proteins}</p>
              </div>
              <div className={styles.info_block}>
                <p className="text text_type_main-default">Жиры, г</p>
                <p className="text text_type_main-default">{currentViewIngredient.fat}</p>
              </div>
              <div className={styles.info_block}>
                <p className="text text_type_main-default">Углеводы, г</p>
                <p className="text text_type_main-default">{currentViewIngredient.carbohydrates}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

IngredientDetails.propTypes = {
  type: PropTypes.string,
}

export default IngredientDetails;