import styles from '../css/component-css/SkeletonCard.module.scss';

function SkeletonCard () {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.img}></div>
            <div className={styles.contentBody}>
                <div className={styles.leftEnd}>
                    <div className={styles.title}></div>
                    <div className={styles.grouping}>
                        <div className={styles.storeImg}></div>
                        <div className={styles.storeName}></div>
                    </div>
                </div>
                <div className={styles.rightEnd}>
                </div>
            </div>
        </div>
    );
}

export default SkeletonCard;