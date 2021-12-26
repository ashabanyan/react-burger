import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from 'react';
import { Scrollbar } from "react-scrollbars-custom";
import { useSelector} from 'react-redux';

// ---------- LOCAL ----------
import styles from "../burger-ingredients/burger-ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { tab_items } from '../../constants/constants';
// ---------- REDUX ACTIONS ----------


const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("Булки");

  const { allIngredients } = useSelector(store => store.ingredients)

  const changeTab = (value) => {
    setCurrentTab(value)
  };

  const tabsRef = useRef();
  const bunsRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const distanseCalc = (target) => {
    return Math.abs(tabsRef.current.getBoundingClientRect().y - target.current.getBoundingClientRect().y)
  }

  const handleScroll = () => {
    const bunsDistance = distanseCalc(bunsRef);
    const sauceDistance = distanseCalc(sauceRef);
    const mainDistance = distanseCalc(mainRef);
    
    const minDistanse = Math.min(bunsDistance, mainDistance, sauceDistance);

    if (bunsDistance === minDistanse) {
      setCurrentTab('Булки')
    } else if (sauceDistance === minDistanse) {
      setCurrentTab('Соусы')
    } else {
      setCurrentTab('Начинки')
    }
  }

  return (
      <section className={styles.section_container}>
        <p className="text text_type_main-large mt-10">Соберите бургер</p>

        <div ref={tabsRef} className={`${styles.tab_block} mt-5`}>
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
        
        <Scrollbar onScroll={handleScroll} style={{ height: 600 }}>
            <p className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`} ref={bunsRef}>Булки</p>
            <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
              {allIngredients && allIngredients.map((item, index) => item.type === "bun" && <IngredientItem  key={index} ingredient={item}  />)}
            </ul>

            <p className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`} ref={sauceRef}>Соусы</p>
            <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
              {allIngredients && allIngredients.map((item, index) => item.type === "sauce" && <IngredientItem  key={index} ingredient={item}  />)}
            </ul>

            <p className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`} ref={mainRef}>Начинки</p>
            <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
              {allIngredients && allIngredients.map((item, index) => item.type === 'main' && <IngredientItem key={index} ingredient={item}  />)}
            </ul>
        </Scrollbar>
      </section>
  );
  
}

export default BurgerIngredients;
