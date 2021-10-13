import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from '../modal/modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon  } from "@ya.praktikum/react-developer-burger-ui-components";


const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, onClick }) =>  {

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

export default Modal;