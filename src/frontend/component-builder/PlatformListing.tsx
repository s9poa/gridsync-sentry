import styles from '../css/component-css/PlatformListing.module.scss';

function PlatformListing () {
    return (
        <div className={styles["genre-selector-nav"]}>
            <a href="/all" className={styles.all}>
                <div className={`${styles.circle} ${styles.active}`}></div>
                <p>All <span>platforms</span></p>
            </a>
            <a href="/pc">
                <div className={styles.circle}></div>
                <i className="fa-solid fa-desktop" aria-hidden="true"></i>
                <p>PC</p>
            </a>
            <a href="/xbox">
                <div className={styles.circle}></div>
                <i className="fa-brands fa-xbox" aria-hidden="true"></i>
                <p>Xbox</p>
            </a>
            <a href="/xbox">
                <div className={styles.circle}></div>
                <i className="fa-brands fa-playstation" aria-hidden="true"></i>
                <p>Playstation</p>
            </a>
        </div>
    );
}

export default PlatformListing;