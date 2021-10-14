import React from 'react';
import styles from '../modal-overlay/modal-overlay.module.css'
import PropTypes from 'prop-types';


const ModalOverlay = ({ onClick }) => {
  return (
    <div id="modal" className={styles.modal} onClick={onClick} />
  )
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default ModalOverlay;