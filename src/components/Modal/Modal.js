import { useEffect } from 'react';
import s from 'components/Modal/Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

function Modal({onClose, children}) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  
  });

    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    
    const handleBackdropClick = e => {
      if (e.currentTarget === e.target) {
        onClose();
      }
    };

  return createPortal(
      <div className={s.Overlay} onClick={handleBackdropClick}>
        <div className={s.Modal}>{children}</div>
      </div>,
      modalRoot,
    );
};

export default Modal;