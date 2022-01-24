import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
// ---------- LOCAL ----------
import styles from "../ingredient-item-constructor/ingredient-item-constructor.module.css";
import { DND_TYPES } from "../../constants/constants";
// ---------- TYPES ----------
import { IIngredient, TAnyFunction } from "../../types/common";

interface IHoverItem {
  id: string;
  index: number;
}

interface IIngredientItemConstructor {
  item: IIngredient;
  index: number;
  id: string;
  deleteIngredient: TAnyFunction;
  moveCard: TAnyFunction;
}

const IngredientItemConstructor = ({
  item,
  index,
  id,
  deleteIngredient,
  moveCard,
}: IIngredientItemConstructor) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: DND_TYPES.sortable_ingredient,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IHoverItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: any = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DND_TYPES.sortable_ingredient,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      key={item.id}
      className={`${styles.element_block} mb-4 mr-4`}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => deleteIngredient(item.id)}
      />
    </div>
  );
};

export default IngredientItemConstructor;
