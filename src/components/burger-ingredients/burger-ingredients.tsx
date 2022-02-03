import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useSelector } from "../../redux/hooks";
// ---------- LOCAL ----------
import styles from "../burger-ingredients/burger-ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { tab_items } from "../../constants/constants";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("Булки");

  const { allIngredients } = useSelector((store) => store.ingredients);

  const tabsRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const changeTab = (value: string) => {
    setCurrentTab(value);
    switch (value) {
      case tab_items[0]: {
        if (bunsRef) bunsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      }
      case tab_items[1]: {
        if (sauceRef) sauceRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      }
      case tab_items[2]: {
        if (mainRef) mainRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      }
    }
  };

  const distanseCalc = (target: any) => {
    return (
      tabsRef.current &&
      Math.abs(
        tabsRef.current.getBoundingClientRect().y -
          target.current.getBoundingClientRect().y
      )
    );
  };

  const handleScroll = () => {
    const bunsDistance: number | null = distanseCalc(bunsRef);
    const sauceDistance: number | null = distanseCalc(sauceRef);
    const mainDistance: number | null = distanseCalc(mainRef);

    const minDistanse: number | null = Math.min(
      bunsDistance ?? 0,
      mainDistance ?? 0,
      sauceDistance ?? 0
    );

    if (bunsDistance === minDistanse) {
      setCurrentTab("Булки");
    } else if (sauceDistance === minDistanse) {
      setCurrentTab("Соусы");
    } else {
      setCurrentTab("Начинки");
    }
  };

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

      <div className={styles.ingredients_wrapper} onScroll={handleScroll}>
        <p
          className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`}
          ref={bunsRef}
        >
          Булки
        </p>
        <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
          {allIngredients &&
            allIngredients.map(
              (item, index) =>
                item.type === "bun" && (
                  <IngredientItem key={index} ingredient={item} />
                )
            )}
        </ul>

        <p
          className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`}
          ref={sauceRef}
        >
          Соусы
        </p>
        <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
          {allIngredients &&
            allIngredients.map(
              (item, index) =>
                item.type === "sauce" && (
                  <IngredientItem key={index} ingredient={item} />
                )
            )}
        </ul>

        <p
          className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`}
          ref={mainRef}
        >
          Начинки
        </p>
        <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
          {allIngredients &&
            allIngredients.map(
              (item, index) =>
                item.type === "main" && (
                  <IngredientItem key={index} ingredient={item} />
                )
            )}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
