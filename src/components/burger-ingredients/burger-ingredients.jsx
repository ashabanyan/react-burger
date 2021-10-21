import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useContext } from 'react';
import styles from "../burger-ingredients/burger-ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { Scrollbar } from "react-scrollbars-custom";
import Modal from '../modal/modal'
import IngredientsDetails from '../ingredient-details/ingredient-details'
import { BurgerContext } from "../../context/burgerContext";

const tab_items = ["Булки", "Соусы", "Начинки"];

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("Булки");
  const [active, setActive] = useState(false);
  const [modalData, setModalData] = useState();
  const [orderInfo, setOrderInfo] = useContext(BurgerContext);

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
        
        <Scrollbar style={{ height: 600 }}>
          
            <p className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`}>Булки</p>
            <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
              {orderInfo && orderInfo.map((item, index) => item.type === "bun" && <IngredientItem onClick={handleOpenModal} key={index} ingredient={item}  />)}
            </ul>

            <p className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`}>Соусы</p>
            <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
              {orderInfo && orderInfo.map((item, index) => item.type === "sauce" && <IngredientItem onClick={handleOpenModal} key={index} ingredient={item}  />)}
            </ul>

            <p className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`}>Начинки</p>
            <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
              {orderInfo && orderInfo.map((item, index) => item.type === 'main' && <IngredientItem onClick={handleOpenModal} key={index} ingredient={item}  />)}
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

export default BurgerIngredients;
