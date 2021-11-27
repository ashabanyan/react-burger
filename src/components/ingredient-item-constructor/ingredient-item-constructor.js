import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import styles from '../ingredient-item-constructor/ingredient-item-constructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_ORDER_AFTER_DROP } from '../../services/actions/orderConstructor';

const IngredientItemConstructor = ({item, index, id, deleteIngredient, moveCard}) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'ingredient_constructor',
    collect(monitor) {
      return {
          handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
        if (!ref.current) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
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
    type: 'ingredient_constructor',
    item: () => {
        return {  id, index };
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
      <DragIcon type="primary"  />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => deleteIngredient(item.id)}
      />
    </div>
  )
}

export default IngredientItemConstructor;