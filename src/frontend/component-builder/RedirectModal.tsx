import { useEffect, useRef } from 'react';
import styles from '../css/component-css/RedirectModal.module.scss';

type RedirectModalProps = {
  linkSrc: string;
  storeName: string;
  gameTitle: string;
  onClose: () => void;
};

function RedirectModal({ linkSrc, storeName, gameTitle, onClose }: RedirectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <dialog className={styles.modal}>
      <div className={styles.contentBody} ref={modalRef}>
        <h3>You're Being Redirected</h3>
        <p>
          You're about to visit <span>{storeName}</span> to view the deal for <span>{gameTitle}</span>.
        </p>
        <div className={styles.footer}>
          <button className={styles.closeModal} onClick={onClose}>Cancel</button>
          <a href={linkSrc} target="_blank" rel="noopener noreferrer" className={styles.confirmRedirect}>Yes, Take Me There</a>
        </div>
      </div>
    </dialog>
  );
}

export default RedirectModal;
