import styles from '../css/component-css/MostPopularSection.module.scss';
import SkeletonCard from './SkeletonCard';

function MostPopularSection () {
    return (
        <section className={`${styles['section']} section-margin`}>
            <div className={styles.row}>
                <nav className={styles.sectionNav}>
                    <h2 className={styles.leadingTitle}>Most Popular Games</h2>
                    <a href="/games" className={styles.seeAll}><span>View more</span> <i className="fa-solid fa-caret-right" aria-hidden="true"></i></a>
                </nav>

            </div>
            <div className={styles.carousel}>
                <div className={styles.slider}>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
            <div className={styles.carouselBtnsGrouping}>
                    <button aria-label="View previous game"><i className="fa-solid fa-arrow-left" aria-hidden="true"></i></button>
                    <button aria-label="View next game"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
                </div>
        </section>
    );
}

export default MostPopularSection;