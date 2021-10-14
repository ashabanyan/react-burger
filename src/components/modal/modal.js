import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from '../modal/modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");


const Modal = ({ children, onClick }) =>  {

  const closeByEscape = (e) => {
    if (e.key === 'Escape') {
      onClick()
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, []);

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClick={onClick} />
        <div className={`${styles.modal_content}`}>
          <div className={styles.close_icon} onClick={onClick}><CloseIcon type="primary" /></div>
          {children}
        </div>
      </>
    ), 
    modalRoot
  );
} 

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Modal;