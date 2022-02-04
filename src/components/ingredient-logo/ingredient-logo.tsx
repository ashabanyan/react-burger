import styles from "./ingredient-logo.module.css";
import { useSelector } from "../../redux/hooks";
import { ingredientPanelIndex } from "../../utils/js-utils";
import { useMemo } from "react";

interface IngredientLogoProps {
  isShifted?: boolean;
  index?: number;
  ingredient: string;
  restNumber?: string;
}

const IngredientLogo: React.FC<IngredientLogoProps> = ({
  index,
  ingredient,
  isShifted,
  restNumber,
}) => {
  const { allIngredients } = useSelector((store) => store.ingredients);

  const ingredientInfo = useMemo(() => {
    return (
      allIngredients && allIngredients.find((item) => item._id === ingredient)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredient]);

  const shiftStyle =
    isShifted && index
      ? {
          left: `${(index - 1) * 50}px`,
          zIndex: ingredientPanelIndex(index),
        }
      : {};

  return (
    <div
      className={`${styles.image_block} ${
        isShifted ? styles.image_block_position_absolute : ""
      }`}
      style={shiftStyle}
      key={index}
    >
      {ingredientInfo && (
        <>
          <img
            src={ingredientInfo.image}
            alt="Логотип ингридиента"
            className={styles.ingredient_image}
          />
          {index === 6 && <p className={styles.rest_number}>{restNumber}</p>}
        </>
      )}
    </div>
  );
};

export default IngredientLogo;
