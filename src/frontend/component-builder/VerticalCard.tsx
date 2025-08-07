import styles from '../css/component-css/VerticalCard.module.scss';

type VerticalCardProps = {
  imgSrc: string;
  storeImage: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  storeName: string;
  onClick?: () => void;
};

function VerticalCard({
  imgSrc,
  storeImage,
  title,
  salePrice,
  normalPrice,
  storeName,
  onClick
}: VerticalCardProps) {
  const showNormalPrice = normalPrice !== salePrice;

  return (
    <button className={styles.verticalCard} onClick={onClick}>
      <img src={imgSrc} className={styles.imgSrc} alt="" />
      <div className={styles.contentBody}>
        <div className={styles.leftEnd}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.storeGrouping}>
            {storeImage && (
              <img
                src={storeImage}
                className={styles.storeImage}
                alt=""
                width="16"
                height="16"
              />
            )}
            {storeName && <span className={styles.storeName}>{storeName}</span>}
          </div>
        </div>
        <div className={styles.rightEnd}>
          {showNormalPrice && <del className={styles.normalPrice}>{normalPrice}</del>}
          {salePrice && (
            <span className={styles.salePrice}>
              {salePrice === "$0.00" || salePrice === "$0" ? "Free" : salePrice}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default VerticalCard;
