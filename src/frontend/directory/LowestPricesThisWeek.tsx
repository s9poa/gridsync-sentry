import { useEffect, useState } from 'react';
import styles from '../css/directory-css/GameCategoryPage.module.scss';
import RedirectModal from '../component-builder/RedirectModal';
import SkeletonCard from '../component-builder/SkeletonCard';
import VerticalCard from '../component-builder/VerticalCard';
import { fetchDealsByParams, fetchStoreLogos, type GameDeal } from '../../backend/utils/cheapshark';

const devShowSkeletonOnly = false;
const GAMES_PER_PAGE = 20;
const MAX_PAGES = 10;
const CACHE_KEY = 'lowestPricesThisWeekCache';
const CACHE_EXPIRATION_MINUTES = 10;

type CacheShape = {
  pages: Record<number, GameDeal[]>; // 1-based page -> items
  timestamp: number;
};

function LowestPricesThisWeek() {
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

  // fetch logos once
  useEffect(() => {
    fetchStoreLogos().then(setStoreLogos).catch((err) => console.error('Logo fetch error:', err));
  }, []);

  // initial load: try cache page 1, else fetch it
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
      } catch {
        // ignore bad cache
      }
    }

    (async () => {
      setLoading(true);
      try {
        const firstPage = await fetchDealsByParams(`sortBy=Price&upperPrice=20&pageSize=${GAMES_PER_PAGE}&pageNumber=0`);
        const newPages = { 1: firstPage };
        setPagesData(newPages);
        setCurrentPage(1);
        const toCache: CacheShape = { pages: newPages, timestamp: Date.now() };
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(toCache));
      } catch (err) {
        console.error('Initial fetch error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // smooth scroll like SearchResults
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleRedirect = (link: string, storeName: string, gameTitle: string) => {
    setModalData({ title: gameTitle, store: storeName, link });
  };

  const goToPage = async (pageNum: number) => {
    if (pageNum < 1 || pageNum > MAX_PAGES) return;

    // if cached in memory, switch instantly
    if (pagesData[pageNum]?.length) {
      setCurrentPage(pageNum);
      return;
    }

    setLoading(true);
    try {
      const apiPageIndex = pageNum - 1;
      const newPage = await fetchDealsByParams(`sortBy=Price&upperPrice=20&pageSize=${GAMES_PER_PAGE}&pageNumber=${apiPageIndex}`);
      const updated = { ...pagesData, [pageNum]: newPage };
      setPagesData(updated);
      setCurrentPage(pageNum);
      const toCache: CacheShape = { pages: updated, timestamp: Date.now() };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(toCache));
    } catch (err) {
      console.error(`Fetch error for page ${pageNum}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const gamesForPage = pagesData[currentPage] || [];

  return (
    <main className={`${styles.main} wrapper`}>
      <h1>Lowest Prices This Week</h1>

      <div className={styles.gameGrid}>
        {devShowSkeletonOnly
          ? Array.from({ length: GAMES_PER_PAGE }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
          : loading && !gamesForPage.length
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

export default LowestPricesThisWeek;
