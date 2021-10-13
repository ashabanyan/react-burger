import { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "../app/app.module.css";
import order from "../../utils/order.js";
import { GET_INGREDIENTS_URL } from "../../constants/constants";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      fetch(GET_INGREDIENTS_URL)
        .then((res) => res.json())
        .then((result) => {
          // console.log(result);
          setData(result.data);
        });
    } catch (error) {
      console.error("При выполнении запроса возникла ошибка: ", error);
    }
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main_container}>
        <div className={`${styles.ingredients_block}`}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor orderInfo={order} />
        </div>
      </main>

      <div id="react-modals"></div>
    </>
  );
};

export default App;
