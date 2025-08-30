import styles from '../css/component-css/HeroSection.module.scss';
import { Link } from 'react-router';

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`wrapper`}>
        <div className={styles.content}>
          <h1 className={styles.title}>Uncover the Best Gaming Deals</h1>
          <p className={styles.subtitle}>Explore curated discounts, fresh releases, and hidden gems — all in one place.</p>
          <Link to="/most-popular-games" className={styles.cta}>Browse Top Deals <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
        <div className={styles.outerBubble}>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
