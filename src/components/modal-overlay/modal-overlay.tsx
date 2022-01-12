import PropTypes from "prop-types";
// ---------- LOCAL ----------
import styles from "../modal-overlay/modal-overlay.module.css";
// ---------- TYPES ----------
import { TAnyFunction } from "../../types/common";
import { FC } from "react";

interface IModalOverlay {
  onClick: TAnyFunction;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClick }) => {
  return <div id="modal" className={styles.modal} onClick={onClick} />;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
