import { useEffect, useState } from 'react';
import styles from '../css/directory-css/GameCategoryPage.module.scss';
import RedirectModal from '../component-builder/RedirectModal';
import SkeletonCard from '../component-builder/SkeletonCard';
import VerticalCard from '../component-builder/VerticalCard';
import { fetchDealsByParams, fetchStoreLogos, type GameDeal } from '../../backend/utils/cheapshark';

const devShowSkeletonOnly = false;
const GAMES_PER_PAGE = 20;
const MAX_PAGES = 10;
const CACHE_KEY = 'fanFavoritesUnder20Cache';
const CACHE_EXPIRATION_MINUTES = 10;

type CacheShape = {
  pages: Record<number, GameDeal[]>;
  timestamp: number;
};

function FanFavoritesUnder$20() {
  const [pagesData, setPagesData] = useState<Record<number, GameDeal[]>>({});
  const [storeLogos, setStoreLogos] = useState<Record<string, { logo: string; name: string }>>({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState<{ title: string; store: string; link: string } | null>(null);

  const isCacheExpired = (timestamp: number) => {
    const now = Date.now();
    const minutesPassed = (now - timestamp) / (1000 * 60);
    return minutesPassed > CACHE_EXPIRATION_MINUTES;
  };

  useEffect(() => {
    fetchStoreLogos().then(setStoreLogos).catch((err) => console.error('Logo fetch error:', err));
  }, []);

  useEffect(() => {
    if (devShowSkeletonOnly) return;

    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed: CacheShape = JSON.parse(cached);
        if (parsed && parsed.pages && !isCacheExpired(parsed.timestamp) && parsed.pages[1]?.length) {
          setPagesData(parsed.pages);
          setCurrentPage(1);
          return;
        }
      } catch {}
    }

    (async () => {
      setCurrentPage(1);
      setLoading(true);
      setPagesData((prev) => ({ ...prev, 1: [] }));
      try {
        const firstPage = await fetchDealsByParams(`sortBy=Reviews&upperPrice=20&pageSize=${GAMES_PER_PAGE}&pageNumber=0`);
        setPagesData((prev) => {
          const newPages = { ...prev, 1: firstPage };
          const toCache: CacheShape = { pages: newPages, timestamp: Date.now() };
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(toCache));
          return newPages;
        });
      } catch (err) {
        console.error('Initial fetch error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleRedirect = (link: string, storeName: string, gameTitle: string) => {
    setModalData({ title: gameTitle, store: storeName, link });
  };

  const goToPage = async (pageNum: number) => {
    if (pageNum < 1 || pageNum > MAX_PAGES) return;

    if (pagesData[pageNum]?.length) {
      setCurrentPage(pageNum);
      return;
    }

    setCurrentPage(pageNum);
    setLoading(true);
    setPagesData((prev) => ({ ...prev, [pageNum]: [] }));

    try {
      const apiPageIndex = pageNum - 1;
      const newPage = await fetchDealsByParams(`sortBy=Reviews&upperPrice=20&pageSize=${GAMES_PER_PAGE}&pageNumber=${apiPageIndex}`);
      setPagesData((prev) => {
        const updated = { ...prev, [pageNum]: newPage };
        const toCache: CacheShape = { pages: updated, timestamp: Date.now() };
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(toCache));
        return updated;
      });
    } catch (err) {
      console.error(`Fetch error for page ${pageNum}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const gamesForPage = pagesData[currentPage] || [];

  return (
    <main className={`${styles.main} wrapper`}>
      <h1>Fan Favorites Under $20</h1>

      <div className={styles.gameGrid} key={currentPage}>
        {devShowSkeletonOnly
          ? Array.from({ length: GAMES_PER_PAGE }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
          : loading
          ? Array.from({ length: GAMES_PER_PAGE }).map((_, i) => <SkeletonCard key={`loading-${i}`} />)
          : gamesForPage.map((game, i) => (
              <VerticalCard
                key={`${game.dealID}-${i}`}
                imgSrc={game.thumb}
                storeImage={storeLogos[game.storeID]?.logo || ''}
                storeName={storeLogos[game.storeID]?.name || ''}
                title={game.title}
                salePrice={`$${game.salePrice}`}
                normalPrice={`$${game.normalPrice}`}
                onClick={() =>
                  handleRedirect(
                    `https://www.cheapshark.com/redirect?dealID=${game.dealID}`,
                    storeLogos[game.storeID]?.name || 'Unknown Store',
                    game.title
                  )
                }
              />
            ))}
      </div>

      <div className={styles.numOfSearchPages}>
        {Array.from({ length: MAX_PAGES }, (_, i) => {
          const page = i + 1;
          return (
            <button key={page} className={currentPage === page ? styles.active : ''} onClick={() => goToPage(page)}>
              {page}
            </button>
          );
        })}
      </div>

      {modalData && (
        <RedirectModal
          gameTitle={modalData.title}
          storeName={modalData.store}
          linkSrc={modalData.link}
          onClose={() => setModalData(null)}
        />
      )}
    </main>
  );
}

export default FanFavoritesUnder$20;
