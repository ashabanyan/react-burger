import styles from "./order-counter.module.css";

interface OrdersCounterProps {
  title: string;
  count: number;
}

const OrdersCounter: React.FC<OrdersCounterProps> = ({ title, count }) => {
  return (
    <div className="mt-15">
      <p className="text text_type_main-medium">{title}</p>
      <p className={`text text_type_digits-large ${styles.count}`}>{count}</p>
    </div>
  );
};

export default OrdersCounter;
