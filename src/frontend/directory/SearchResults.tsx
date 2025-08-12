import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styles from '../css/directory-css/SearchResults.module.scss';
import { Link } from 'react-router';
import { fetchDealsByParams } from '../../backend/utils/cheapshark';
import SkeletonCard from '../component-builder/SkeletonCard';
import VerticalCard from '../component-builder/VerticalCard';
import RedirectModal from '../component-builder/RedirectModal';

type Store = {
  storeID: string;
  storeName: string;
};

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    linkSrc: '',
    storeName: '',
    gameTitle: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [storeMap, setStoreMap] = useState<Record<string, string>>({});

  const GAMES_PER_PAGE = 20;
  const cacheKey = `search-${query.toLowerCase()}-page-${currentPage}`;

  const openRedirectModal = (linkSrc: string, storeName: string, gameTitle: string) => {
    setModalData({ linkSrc, storeName, gameTitle });
    setModalOpen(true);
  };

  const closeRedirectModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/stores')
      .then((res) => res.json())
      .then((stores: Store[]) => {
        const map: Record<string, string> = {};
        stores.forEach((s) => (map[s.storeID] = s.storeName));
        setStoreMap(map);
      });
  }, []);

  useEffect(() => {
    // Reset to first page if the query changes
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    if (!query.trim()) return;

    setLoading(true);

    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const { games: cachedGames, totalPages: cachedPages } = JSON.parse(cached);
      setGames(cachedGames);
      setTotalPages(cachedPages);
      setLoading(false);
      return;
    }

    const fetchGames = async () => {
      try {
        const allResults = await fetchDealsByParams(`title=${encodeURIComponent(query)}`);
        const paginated = allResults.slice((currentPage - 1) * GAMES_PER_PAGE, currentPage * GAMES_PER_PAGE);
        const total = Math.ceil(allResults.length / GAMES_PER_PAGE);

        setGames(paginated);
        setTotalPages(total);
        sessionStorage.setItem(cacheKey, JSON.stringify({ games: paginated, totalPages: total }));
      } catch (err) {
        console.error('Search fetch error:', err);
        setGames([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [query, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <main className={`${styles.main} wrapper`}>
      <h1 className={styles['no-results']}><Link to="/" aria-label="Go back to home page" className={styles.homeLink}><i className="fa-solid fa-chevron-left" aria-hidden="true"></i></Link>
        {query ? `Search Results for "${query}"` : 'No search query provided'}
      </h1>

      <div className={styles.gameGrid}>
        {loading
          ? Array.from({ length: GAMES_PER_PAGE }, (_, i) => (
              <SkeletonCard key={i} />
            ))
          : games.map((game, i) => (
              <VerticalCard
                key={i}
                imgSrc={game.thumb}
                storeImage={`https://www.cheapshark.com/img/stores/logos/${game.storeID}.png`}
                title={game.title}
                salePrice={`$${parseFloat(game.salePrice).toFixed(2)}`}
                normalPrice={`$${parseFloat(game.normalPrice).toFixed(2)}`}
                storeName={storeMap[game.storeID] || `Store #${game.storeID}`}
                onClick={() =>
                  openRedirectModal(
                    `https://www.cheapshark.com/redirect?dealID=${game.dealID}`,
                    storeMap[game.storeID] || `Store #${game.storeID}`,
                    game.title
                  )
                }
              />
            ))}
      </div>

      <hr className={styles.hr}/>

      <div className={styles.numOfSearchPages}>
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              className={currentPage === page ? styles.active : ''}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <hr className={styles.hr}/>

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

export default SearchResults;
