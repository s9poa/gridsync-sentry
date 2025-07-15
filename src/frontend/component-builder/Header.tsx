import styles from '../css/component-css/Header.module.css';

function Header () {
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
                <button className={styles.mobileMenuBtn}><i className="fa-solid fa-bars" aria-hidden="true"></i></button>
            </div>
        </header>
    )
}

export default Header;