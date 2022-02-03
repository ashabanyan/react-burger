import { FC } from "react";
import styles from "../preloader/preloader.module.css";
import Loader from "react-loader-spinner";

const Preloader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Loader
        color="rgb(128, 26, 179)"
        height={300}
        width={300}
        type="BallTriangle"
      />
    </div>
  );
};

export default Preloader;
