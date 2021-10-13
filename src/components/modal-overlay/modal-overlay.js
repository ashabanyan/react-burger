import React from 'react';
import styles from '../modal-overlay/modal-overlay.module.css'


const ModalOverlay = ({children, onClick}) => {
  return (
    <div id="modal" className={styles.modal} onClick={onClick} />
  )
}

export default ModalOverlay;