import styles from '../css/component-css/VerticalCard.module.scss';

type VerticalCardProps = {
    imgSrc: string;
    rankingNumber: string;
    // title: string;
    // currentPrice: string;
    // appliedDiscount: string;
}

function VerticalCard({imgSrc, rankingNumber}: VerticalCardProps) {

    return (
        <div className={styles.verticalCard}>
            <div className={styles.imgContainer}>
                <img src={imgSrc} alt=""/>
                <span className={styles.ranking}>{rankingNumber}</span>
            </div>
        </div>
    );
}

export default VerticalCard;
