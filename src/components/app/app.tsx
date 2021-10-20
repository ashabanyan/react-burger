import { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "../app/app.module.css";
import { GET_INGREDIENTS_URL } from "../../constants/constants";
import { OrderContext } from "../../context/orderContext";

const App = () => {
  const [data, setData] = useState();
  const orderState = useState();

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
          setData(result.data);
        });
    } catch (error) {
      console.error("При выполнении запроса возникла ошибка: ", error);
    }
  }, []);

  useEffect(() => {
    const [orderInfoState, setOrderInfoState] = orderState;
    data && setOrderInfoState(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <AppHeader />
      <main className={styles.main_container}>
        <div className={`${styles.ingredients_block}`}>
          <BurgerIngredients ingredients={data} />
          <OrderContext.Provider value={orderState}>
            <BurgerConstructor />
          </OrderContext.Provider>
        </div>
      </main>
    </>
  );
};

export default App;
