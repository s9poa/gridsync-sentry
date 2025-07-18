import styles from '../css/component-css/SkeletonCard.module.scss';

function SkeletonCard () {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.img}>
                <span className={styles.ranking}></span>
            </div>
            <div className={styles.contentBody}>
                <div className={styles.long}></div>
                <div className={styles.short}></div>
            </div>
        </div>
    );
}

export default SkeletonCard;