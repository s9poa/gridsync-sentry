import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import styles from '../css/component-css/Header.module.scss';

function Header () {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = search.trim();
        if (!trimmed) return;
        navigate(`/search-results?query=${encodeURIComponent(trimmed)}`);
    };

    return (
        <header className={styles.header}>
            <div className={`${styles.wrapper} wrapper`}>
                <Link to="/" className={styles.logo}>GridSync <span>Sentry</span></Link>
                <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
                    <label htmlFor="desktop-search-field">Search</label>
                    <input
                        type="text"
                        id="desktop-search-field"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="What game are you searching for?"
                        required
                    />
                    <button aria-label="Search"><i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button>
                </form>
            </div>
        </header>
    );
}

export default Header;
