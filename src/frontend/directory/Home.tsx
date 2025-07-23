import styles from '../css/directory-css/Home.module.scss';

import CategorySection from '../component-builder/CategorySection';

function Home () {

    return (
        <main className={`${styles.main} wrapper`}>
            <div className={styles.categoryGrid}>
                <CategorySection leadingTitle="Most Popular Games" fetchOptions={{ sortBy: 'Deal Rating' }} />
                <CategorySection leadingTitle="Insane Deals You Shouldn't Miss" fetchOptions={{ sortBy: 'Savings' }} />
                <CategorySection leadingTitle="New Price Drops" fetchOptions={{ sortBy: 'Recent' }} />
                <CategorySection leadingTitle="Under $10 Steals" fetchOptions={{ upperPrice: 10 }} />
                <CategorySection leadingTitle="Trending Right Now" fetchOptions={{ sortBy: 'Deal Rating' }} />
                <CategorySection leadingTitle="Top Picks from the Community" fetchOptions={{ sortBy: 'Deal Rating' }} />
                <CategorySection leadingTitle="Massive Discounts This Week" fetchOptions={{ sortBy: 'Savings', upperPrice: 20 }} />
                <CategorySection leadingTitle="Bangers Worth Every Penny" fetchOptions={{ sortBy: 'Price', upperPrice: 20 }} />
            </div>
        </main>
    );
}

export default Home;
