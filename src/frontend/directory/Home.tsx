import { useState } from 'react';
import styles from '../css/directory-css/Home.module.scss';

import CategorySection from '../component-builder/CategorySection';
import RedirectModal from '../component-builder/RedirectModal';

function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({
        linkSrc: '',
        storeName: '',
        gameTitle: ''
    });

    const openRedirectModal = (linkSrc: string, storeName: string, gameTitle: string) => {
        setModalData({ linkSrc, storeName, gameTitle });
        setModalOpen(true);
    };

    const closeRedirectModal = () => {
        setModalOpen(false);
    };

    return (
        <main className={`${styles.main} wrapper`}>
            <div className={styles.categoryGrid}>
                <CategorySection leadingTitle="Most Popular Games" fetchOptions={{ sortBy: 'Deal Rating' }} onRedirect={openRedirectModal} viewMoreSrc="/most-popular-games"/>
                <CategorySection leadingTitle="Insane Deals You Shouldn't Miss" fetchOptions={{ sortBy: 'Savings' }} onRedirect={openRedirectModal} viewMoreSrc="/insane-deals-you-shouldn't-miss"/>
                <CategorySection leadingTitle="New Price Drops" fetchOptions={{ sortBy: 'Recent' }} onRedirect={openRedirectModal} viewMoreSrc="/new-price-drops"/>
                <CategorySection leadingTitle="Under $10 Steals" fetchOptions={{ upperPrice: 10 }} onRedirect={openRedirectModal} viewMoreSrc="/under-$10-steals"/>
                <CategorySection leadingTitle="Trending Right Now" fetchOptions={{ sortBy: 'Deal Rating' }} onRedirect={openRedirectModal} viewMoreSrc="/trending-right-now"/>
                <CategorySection leadingTitle="Top Picks from the Community" fetchOptions={{ sortBy: 'Deal Rating' }} onRedirect={openRedirectModal} viewMoreSrc="/top-picks-from-the-community"/>
                <CategorySection leadingTitle="Massive Discounts This Week" fetchOptions={{ sortBy: 'Savings', upperPrice: 20 }} onRedirect={openRedirectModal} viewMoreSrc="/massive-discounts-this-week"/>
                <CategorySection leadingTitle="Bangers Worth Every Penny" fetchOptions={{ sortBy: 'Price', upperPrice: 20 }} onRedirect={openRedirectModal} viewMoreSrc="/bangers-worth-every-penny"/>
            </div>

            {modalOpen && (
                <RedirectModal
                    linkSrc={modalData.linkSrc}
                    storeName={modalData.storeName}
                    gameTitle={modalData.gameTitle}
                    onClose={closeRedirectModal}
                />
            )}
        </main>
    );
}

export default Home;
