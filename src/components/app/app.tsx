import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "../app/app.module.css";
import data from "../../utils/data.js";
import order from "../../utils/order.js";

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main_container}>
        <div className={`${styles.ingredients_block}`}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor orderInfo={order} />
        </div>
      </main>
    </>
  );
};

export default App;
