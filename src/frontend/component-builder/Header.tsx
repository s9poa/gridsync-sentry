import { useEffect, useRef, useState } from 'react';
import styles from '../css/component-css/Header.module.scss';
import MobileMenu from './MobileMenu';

function Header () {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const triggerBtnRef = useRef<HTMLButtonElement | null>(null);
    const isKeyboardUserRef = useRef(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                isKeyboardUserRef.current = true;
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    }, [isMobileMenuOpen]);

    return (
        <header className={styles.header}>
            <div className={`${styles.wrapper} wrapper`}>
                <a href="/" className={styles.logo}>GridSync <span>Sentry</span></a>
                <nav className={styles.primaryNav}>
                    <a href="/deals">Deals</a>
                    <a href="/games">Games</a>
                </nav>
                <form className={styles.searchForm}>
                    <label htmlFor="desktop-search-field">Search</label>
                    <input type="text" id="desktop-search-field" placeholder="What game are you searching for?" required />
                    <button aria-label="Search"><i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button>
                </form>
                <button ref={triggerBtnRef} className={styles.mobileMenuBtn} onClick={() => setIsMobileMenuOpen(true)}>
                    <i className="fa-solid fa-bars" aria-hidden="true"></i>
                </button>
                <MobileMenu isOpen={isMobileMenuOpen} onClose={() => {setIsMobileMenuOpen(false);if (isKeyboardUserRef.current && triggerBtnRef.current) {triggerBtnRef.current.focus();}}}/>
            </div>
        </header>
    );
}

export default Header;
