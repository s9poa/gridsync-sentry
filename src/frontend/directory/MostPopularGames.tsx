import { useEffect, useState } from 'react';
import styles from '../css/directory-css/GameCategoryPage.module.scss';
import RedirectModal from '../component-builder/RedirectModal';
import SkeletonCard from '../component-builder/SkeletonCard';
import VerticalCard from '../component-builder/VerticalCard';
import { fetchDealsByParams, fetchStoreLogos, type GameDeal } from '../../backend/utils/cheapshark';

const devShowSkeletonOnly = false;
const COOLDOWN_DELAY = 4000;
const MAX_PAGES = 3;
const CACHE_KEY = 'mostPopularCache';
const CACHE_EXPIRATION_MINUTES = 10;

type CachedData = {
  games: GameDeal[];
  page: number;
  timestamp: number;
};

function MostPopularSection() {
  const [games, setGames] = useState<GameDeal[]>([]);
  const [storeLogos, setStoreLogos] = useState<Record<string, { logo: string; name: string }>>({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [modalData, setModalData] = useState<{ title: string; store: string; link: string } | null>(null);
  const [isCooldown, setIsCooldown] = useState(false);

  const isCacheExpired = (timestamp: number) => {
    const now = Date.now();
    const minutesPassed = (now - timestamp) / (1000 * 60);
    return minutesPassed > CACHE_EXPIRATION_MINUTES;
  };

  useEffect(() => {
    if (devShowSkeletonOnly) return;

    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CachedData = JSON.parse(cached);
      if (!isCacheExpired(parsed.timestamp)) {
        setGames(parsed.games);
        setPage(parsed.page);
        return;
      }
    }

    // No cache or expired
    setLoading(true);
    fetchDealsByParams(`sortBy=Deal Rating&pageSize=10&pageNumber=0`)
      .then((initialGames) => {
        const timestamp = Date.now();
        const cacheData: CachedData = { games: initialGames, page: 0, timestamp };
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        setGames(initialGames);
        setPage(0);
      })
      .catch((err) => console.error('Initial fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchStoreLogos().then(setStoreLogos).catch((err) => console.error('Logo fetch error:', err));
  }, []);

  const handleRedirect = (link: string, storeName: string, gameTitle: string) => {
    setModalData({ title: gameTitle, store: storeName, link });
  };

  const handleViewMore = async () => {
    if (loading || isCooldown || page + 1 >= MAX_PAGES) return;

    const nextPage = page + 1;
    setIsCooldown(true);
    setLoading(true);

    try {
      const newGames = await fetchDealsByParams(`sortBy=Deal Rating&pageSize=10&pageNumber=${nextPage}`);
      const updatedGames = [...games, ...newGames];
      setGames(updatedGames);
      setPage(nextPage);

      const updatedCache: CachedData = {
        games: updatedGames,
        page: nextPage,
        timestamp: Date.now()
      };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(updatedCache));
    } catch (err) {
      console.error('Error loading additional games:', err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setIsCooldown(false);
      }, COOLDOWN_DELAY);
    }
  };

  const canViewMore = !devShowSkeletonOnly && page + 1 < MAX_PAGES;
  const hasReachedMax = !devShowSkeletonOnly && page + 1 >= MAX_PAGES;

  return (
    <main className={`${styles.main} wrapper`}>
      <h1>Most Popular Games</h1>
      <div className={styles.gameGrid}>
        {devShowSkeletonOnly
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
          : <>
              {games.map((game, i) => (
                <VerticalCard
                  key={`${game.dealID}-${i}`}
                  imgSrc={game.thumb}
                  storeImage={storeLogos[game.storeID]?.logo || ''}
                  storeName={storeLogos[game.storeID]?.name || ''}
                  title={game.title}
                  salePrice={`$${game.salePrice}`}
                  normalPrice={`$${game.normalPrice}`}
                  onClick={() => handleRedirect(
                    `https://www.cheapshark.com/redirect?dealID=${game.dealID}`,
                    storeLogos[game.storeID]?.name || 'Unknown Store',
                    game.title
                  )}
                />
              ))}
              {loading && Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={`loading-${i}`} />)}
            </>
        }
      </div>

      {!devShowSkeletonOnly && (
        <div className={styles.viewMoreContainer}>
          {canViewMore ? (
            <button className={styles.viewMore} onClick={handleViewMore} disabled={loading || isCooldown}>
              {loading ? 'Loading...' : isCooldown ? 'Please wait...' : 'View more'}
            </button>
          ) : hasReachedMax && (
            <p className={styles.noMoreResults}>🛑 No more results</p>
          )}
        </div>
      )}

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

export default MostPopularSection;
