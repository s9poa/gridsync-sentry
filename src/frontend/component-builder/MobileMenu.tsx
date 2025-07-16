import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import styles from '../css/component-css/MobileMenu.module.scss';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function MobileMenu({ isOpen, onClose }: Props) {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (!isOpen) return;

        const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableElements?.[0];
        const lastEl = focusableElements?.[focusableElements.length - 1];

        const trapFocus = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || !focusableElements || focusableElements.length === 0) return;
            if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl?.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                firstEl?.focus();
            }
        };

        document.addEventListener('keydown', trapFocus);
        firstEl?.focus();

        return () => {
            document.removeEventListener('keydown', trapFocus);
        };
    }, [isOpen]);

    return (
        <div className={styles.mobileMenu} ref={menuRef} style={{ display: isOpen ? 'flex' : 'none' }}>
            <div className={styles.header}>
                <a href="/" className={styles.logo}>GridSync <span>Sentry</span></a>
                <button aria-label="Close Menu" className={styles.mobileMenuBtn} onClick={onClose}>
                    <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
            </div>
            <form className={styles.searchForm}>
                <label htmlFor="mobile-search-field">Search</label>
                <input type="text" id="mobile-search-field" placeholder="What game are you searching for?" required />
                <button aria-label="Search"><i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button>
            </form>
            <nav className={styles.primaryNav}>
                <a href="/" className={location.pathname === '/' ? styles.active : ''}>Home</a>
                <a href="/deals" className={location.pathname === '/deals' ? styles.active : ''}>Deals</a>
                <a href="/games" className={location.pathname === '/games' ? styles.active : ''}>Games</a>
            </nav>
            <div className={styles.hr}></div>
            <nav className={styles.primaryNav}>
                <a href="/pc" className={location.pathname === '/pc' ? styles.active : ''}>PC</a>
                <a href="/xbox" className={location.pathname === '/xbox' ? styles.active : ''}>Xbox</a>
                <a href="/playstation" className={location.pathname === '/playstation' ? styles.active : ''}>Playstation</a>
            </nav>
        </div>
    );
}

export default MobileMenu;
