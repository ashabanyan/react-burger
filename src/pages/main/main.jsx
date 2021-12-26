import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// ---------- LOCAL ----------
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from "../main/main.module.css";

const MainPage = () => {
  return (
    <main className={styles.main_container}>
      <div className={`${styles.ingredients_block}`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </main>
  );
};

export default MainPage;
