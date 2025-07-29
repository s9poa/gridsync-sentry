import styles from '../css/component-css/Header.module.scss';
import { Link } from 'react-router';

function Header () {

    return (
        <header className={styles.header}>
            <div className={`${styles.wrapper} wrapper`}>
                <Link to="/" className={styles.logo}>GridSync <span>Sentry</span></Link>
                <form className={styles.searchForm}>
                    <label htmlFor="desktop-search-field">Search</label>
                    <input type="text" id="desktop-search-field" placeholder="What game are you searching for?" required />
                    <button aria-label="Search"><i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button>
                </form>
            </div>
        </header>
    );
}

export default Header;
