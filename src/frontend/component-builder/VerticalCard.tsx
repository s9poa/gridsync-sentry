import styles from '../css/component-css/VerticalCard.module.scss';

type VerticalCardProps = {
    linkSrc: string;
    imgSrc: string;
    storeImage: string;
    title: string;
    salePrice: string;
    normalPrice: string;
    storeName: string;
}

function VerticalCard({linkSrc, imgSrc, storeImage, title, salePrice, normalPrice, storeName}: VerticalCardProps) {

    return (
        <a href={linkSrc} target="_blank" className={styles.verticalCard}>
            <img src={imgSrc} loading="lazy" className={styles.imgSrc} alt="" />
            <div className={styles.contentBody}>
                <div className={styles.leftEnd}>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.storeGrouping}>
                        {storeImage && <img src={storeImage} className={styles.storeImage} alt="" width="16" height="16"/>}
                        {storeName && <span className={styles.storeName}>{storeName}</span>}
                    </div>
                </div>
                <div className={styles.rightEnd}>
                    {normalPrice && <del className={styles.normalPrice}>{normalPrice}</del>}
                    {salePrice && (
                    <span className={styles.salePrice}>
                        {salePrice === "$0.00" || salePrice === "$0" ? "Free" : salePrice}
                    </span>
                    )}
                </div>
            </div>
        </a>
    );
}

export default VerticalCard;