import { useEffect, useRef } from 'react';
import styles from '../css/component-css/MostPopularSection.module.scss';
import SkeletonCard from './SkeletonCard';
import VerticalCard from './VerticalCard';

function MostPopularSection() {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const isScrolling = useRef(false);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const handleScrollEnd = () => {
            isScrolling.current = false;
        };

        slider.addEventListener('scrollend', handleScrollEnd);
        return () => {
            slider.removeEventListener('scrollend', handleScrollEnd);
        };
    }, []);

    const scrollToCard = (direction: 'next' | 'prev') => {
        const slider = sliderRef.current;
        if (!slider || isScrolling.current) return;

        const cards = slider.querySelectorAll<HTMLDivElement>(':scope > *');
        if (cards.length === 0) return;

        const sliderLeft = slider.scrollLeft;
        const sliderWidth = slider.clientWidth;
        const cardWidth = cards[0].offsetWidth + 16;

        const totalScroll = slider.scrollWidth;
        const maxScrollLeft = totalScroll - sliderWidth;

        isScrolling.current = true;

        if (direction === 'next') {
            if (Math.ceil(sliderLeft + sliderWidth) >= totalScroll) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        } else {
            if (sliderLeft <= 0) {
                slider.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className={`${styles['section']} section-margin`}>
            <div className={styles.row}>
                <nav className={styles.sectionNav}>
                    <h2 className={styles.leadingTitle}>Most Popular Games</h2>
                    <a href="/games" className={styles.seeAll}><span>View more</span> <i className="fa-solid fa-caret-right" aria-hidden="true"></i></a>
                </nav>
            </div>
            <div className={styles.carousel}>
                <div className={styles.slider} ref={sliderRef}>
                    <VerticalCard linkSrc="" imgSrc="" rankingNumber="" title="" currentPrice="" appliedDiscount="" historicalLow=""/>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
            <div className={styles.carouselBtnsGrouping}>
                <button className={styles.previousGame} aria-label="View previous game" onClick={() => scrollToCard('prev')}>
                    <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                </button>
                <button className={styles.nextGame} aria-label="View next game" onClick={() => scrollToCard('next')}>
                    <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </button>
            </div>
        </section>
    );
}

export default MostPopularSection;
