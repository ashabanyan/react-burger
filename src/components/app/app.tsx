import { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "../app/app.module.css";
import { GET_INGREDIENTS_URL } from "../../constants/constants";
import { BurgerContext } from "../../context/burgerContext";

const App = () => {
  const orderState = useState();
  const [orderInfoState, setOrderInfoState] = orderState;

  useEffect(() => {
    try {
      fetch(GET_INGREDIENTS_URL)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((result) => {
          setOrderInfoState(result.data);
        });
    } catch (error) {
      console.error("При выполнении запроса возникла ошибка: ", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main_container}>
        <div className={`${styles.ingredients_block}`}>
          {/* <BurgerContext.Provider value={orderState}> */}
          <BurgerIngredients />
          <BurgerConstructor />
          {/* </BurgerContext.Provider> */}
        </div>
      </main>
    </>
  );
};

export default App;
