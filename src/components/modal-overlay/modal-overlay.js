import PropTypes from 'prop-types';
// ---------- LOCAL ----------
import styles from '../modal-overlay/modal-overlay.module.css';

const ModalOverlay = ({ onClick }) => {
  return (
    <div id="modal" className={styles.modal} onClick={onClick} />
  )
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default ModalOverlay;