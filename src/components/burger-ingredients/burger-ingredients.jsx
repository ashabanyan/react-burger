import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from 'react';
import styles from "../burger-ingredients/burger-ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { Scrollbar } from "react-scrollbars-custom";
import PropTypes from 'prop-types';
import Modal from '../modal/modal'
import IngredientsDetails from '../ingredient-details/ingredient-details'

const tab_items = ["Булки", "Соусы", "Начинки"];

const BurgerIngredients = ({ingredients}) => {
  const [currentTab, setCurrentTab] = useState("Булки");
  const [active, setActive] = useState(false);
  const [modalData, setModalData] = useState();
  
  const handleOpenModal = (data) => {
    setActive(true);
    setModalData(data)
  }

  const handleCloseModal = () => {
    setActive(false);
  }

  const changeTab = (value) => {
    setCurrentTab(value)
  };
  
  return (
      <section className={styles.section_container}>
        <p className="text text_type_main-large mt-10">Соберите бургер</p>

        <div className={`${styles.tab_block} mt-5`}>
          {tab_items.map((item, index) => (
            <Tab
              key={index}
              value={item}
              active={currentTab === tab_items[index]}
              onClick={() => changeTab(tab_items[index])}
            >
              {item}
            </Tab>
          ))}
        </div>
        
        <Scrollbar style={{ height: 700 }}>
          
            <p className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`}>Булки</p>
            <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
              {ingredients && ingredients.map((item, index) => item.type === "bun" && <IngredientItem onClick={handleOpenModal} key={index} ingredient={item}  />)}
            </ul>

            <p className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`}>Соусы</p>
            <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
              {ingredients && ingredients.map((item, index) => item.type === "sauce" && <IngredientItem onClick={handleOpenModal} key={index} ingredient={item}  />)}
            </ul>

            <p className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`}>Начинки</p>
            <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
              {ingredients && ingredients.map((item, index) => item.type === 'main' && <IngredientItem onClick={handleOpenModal} key={index} ingredient={item}  />)}
            </ul>
          
        </Scrollbar>

        {active && (
          <Modal onClick={handleCloseModal}>
            <IngredientsDetails itemData={modalData} />
          </Modal>
          )
        }
      </section>
  );
  
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(
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
  )
}

export default BurgerIngredients;
