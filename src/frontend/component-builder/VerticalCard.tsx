import styles from '../css/component-css/VerticalCard.module.scss';

type VerticalCardProps = {
    linkSrc: string;
    imgSrc: string;
    rankingNumber: string;
    title: string;
    currentPrice: string;
    appliedDiscount: string;
    historicalLow: string;
}

function VerticalCard({linkSrc, imgSrc, rankingNumber, title, currentPrice, appliedDiscount, historicalLow}: VerticalCardProps) {

    return (
        <a href={linkSrc} className={styles.verticalCard}>
            <div className={styles.imgContainer}>
                <img src={imgSrc} alt="" width="200" height="200"/>
                {rankingNumber && <span className={styles.ranking}>{rankingNumber}</span>}
            </div>
            <div className={styles.contentBody}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.footer}>
                    <span className={styles.currentPrice}>{currentPrice}</span>
                    {historicalLow && <span className={styles.historicalLow}>{historicalLow}</span>}
                    <span className={styles.appliedDiscount}>{appliedDiscount}</span>
                </div>
            </div>
        </a>
    );
}

export default VerticalCard;