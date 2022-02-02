import { useSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import IngredientLogo from "../ingredient-logo/ingredient-logo";
import styles from "../order-ingredient-info/order-ingredient-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface OrderIngredientInfoProps {
  ingredients: string[];
}

const OrderIngredientInfo: React.FC<OrderIngredientInfoProps> = ({
  ingredients,
}) => {
  const [currentOrder, setCurrentOrder] = useState<any[]>();
  const { allIngredients } = useSelector((store) => store.ingredients);

  const uniqueArray = (arr: string[]) => {
    let result: string[] = [];
    for (let i of arr) {
      if (!result.includes(i)) {
        result.push(i);
      }
    }
    return result;
  };

  useEffect(() => {
    const arr = uniqueArray(ingredients);
    const order = arr.map((id, index) => {
      const countIng = ingredients.filter((item) => item === id).length;
      const ingredient = allIngredients!.find((item) => item._id === id);
      const currentIngredient = { ...ingredient, count: countIng };
      return currentIngredient;
    });

    setCurrentOrder(order);
  }, [allIngredients, ingredients]);

  return (
    <div className={styles.ingredients_wrapper}>
      {currentOrder &&
        currentOrder.map((item, index) => (
          <div key={index} className={`mb-4 mr-4 ${styles.ingredient_wrapper}`}>
            <IngredientLogo ingredient={item._id} />
            <div className={`ml-6 ${styles.name_block}`}>
              <p className="text text_type_main-default">{item.name}</p>
            </div>

            <div className={styles.price_block}>
              <p className={`ml-6 mr-2 text text_type_digits-default`}>
                {item.count} x {item.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderIngredientInfo;
