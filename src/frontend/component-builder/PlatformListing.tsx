import styles from '../css/component-css/PlatformListing.module.scss';

function PlatformListing () {
    return (
        <div className={styles["genre-selector-nav"]}>
            <a href="/" className={`${styles.all} ${location.pathname === '/' ? styles.active : ''}`}>
                <div className={`${styles.circle} ${location.pathname === '/' ? styles.active : ''}`}></div>
                <p>All <span>platforms</span></p>
            </a>
            <a href="/pc" className={location.pathname === '/pc' ? styles.active : ''}>
                <div className={`${styles.circle} ${location.pathname === '/pc' ? styles.active : ''}`}></div>
                <i className="fa-solid fa-desktop" aria-hidden="true"></i>
                <p>PC</p>
            </a>
            <a href="/xbox" className={location.pathname === '/xbox' ? styles.active : ''}>
                <div className={`${styles.circle} ${location.pathname === '/xbox' ? styles.active : ''}`}></div>
                <i className="fa-brands fa-xbox" aria-hidden="true"></i>
                <p>Xbox</p>
            </a>
            <a href="/playstation" className={location.pathname === '/playstation' ? styles.active : ''}>
                <div className={`${styles.circle} ${location.pathname === '/playstation' ? styles.active : ''}`}></div>
                <i className="fa-brands fa-playstation" aria-hidden="true"></i>
                <p>Playstation</p>
            </a>
        </div>
    );
}

export default PlatformListing;