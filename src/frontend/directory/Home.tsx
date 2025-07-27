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
        <CategorySection leadingTitle="Most Popular Games" fetchOptions={{ sortBy: 'Deal Rating' }} onRedirect={openRedirectModal} viewMoreSrc="/most-popular-games" />
        <CategorySection leadingTitle="Biggest Discounts Right Now" fetchOptions={{ sortBy: 'Savings' }} onRedirect={openRedirectModal} viewMoreSrc="" />
        <CategorySection leadingTitle="Just Dropped Deals" fetchOptions={{ sortBy: 'Recent' }} onRedirect={openRedirectModal} viewMoreSrc="" />
        <CategorySection leadingTitle="Under $10 Steals" fetchOptions={{ upperPrice: 10 }} onRedirect={openRedirectModal} viewMoreSrc="" />
        <CategorySection leadingTitle="New Releases" fetchOptions={{ sortBy: 'Release' }} onRedirect={openRedirectModal} viewMoreSrc="" />
        <CategorySection leadingTitle="A-Z Game List" fetchOptions={{ sortBy: 'Title' }} onRedirect={openRedirectModal} viewMoreSrc="" />
        <CategorySection leadingTitle="Fan Favorites Under $20" fetchOptions={{ sortBy: 'Reviews', upperPrice: 20 }} onRedirect={openRedirectModal} viewMoreSrc="" />
        <CategorySection leadingTitle="Lowest Prices This Week" fetchOptions={{ sortBy: 'Price', upperPrice: 20 }} onRedirect={openRedirectModal} viewMoreSrc="" />
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
