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

  // Close modal when clicking outside content body + disable scrolling
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Disable scrolling when modal mounts
    document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Re-enable scrolling when modal unmounts
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
          <a href={linkSrc} target="_blank" className={styles.confirmRedirect}>Yes, Take Me There</a>
        </div>
      </div>
    </dialog>
  );
}

export default RedirectModal;
