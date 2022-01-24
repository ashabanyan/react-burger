import { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// ---------- LOCAL ----------
import styles from "../modal/modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
// ---------- TYPES ----------
import { TAnyFunction } from "../../types/common";

const modalRoot: HTMLElement =
  document.getElementById("react-modals") || document.createElement("div");
modalRoot.setAttribute("id", "react-modals");

interface IModal {
  children: React.ReactNode;
  onClick: TAnyFunction;
}

const Modal: FC<IModal> = ({ children, onClick }) => {
  const closeByEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClick();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClick} />
      <div className={`${styles.modal_content}`}>
        <div className={styles.close_icon} onClick={onClick}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
