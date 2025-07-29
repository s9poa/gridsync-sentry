import { useEffect, useState } from 'react';
import styles from '../css/component-css/CategorySection.module.scss';
import VerticalCard from './VerticalCard';
import SkeletonCard from './SkeletonCard';
import { fetchDealsByParams, fetchStoreLogos } from '../../backend/utils/cheapshark';
import type { GameDeal } from '../../backend/utils/cheapshark';
import { Link } from 'react-router';

const devShowSkeletonOnly = false;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

type Props = {
  leadingTitle: string;
  viewMoreSrc: string;
  fetchOptions?: {
    sortBy?: string;
    upperPrice?: number;
    lowerPrice?: number;
    pageNumber?: number;
  };
  onRedirect?: (linkSrc: string, storeName: string, gameTitle: string) => void;
};

function buildParamsFromObject(options: Props['fetchOptions']): string {
  if (!options) return '';
  const params = new URLSearchParams();
  if (options.sortBy) params.set('sortBy', options.sortBy);
  if (options.upperPrice !== undefined) params.set('upperPrice', options.upperPrice.toString());
  if (options.lowerPrice !== undefined) params.set('lowerPrice', options.lowerPrice.toString());
  if (options.pageNumber !== undefined) params.set('pageNumber', options.pageNumber.toString());
  params.set('pageSize', '10');
  return params.toString();
}

function getCachedData(key: string): { timestamp: number; games: GameDeal[] } | null {
  const cached = sessionStorage.getItem(key);
  if (!cached) return null;
  try {
    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.timestamp < CACHE_DURATION) {
      return parsed;
    } else {
      sessionStorage.removeItem(key);
    }
  } catch {
    sessionStorage.removeItem(key);
  }
  return null;
}

function CategorySection({ leadingTitle, viewMoreSrc, fetchOptions, onRedirect }: Props) {
  const [games, setGames] = useState<GameDeal[]>([]);
  const [storeLogos, setStoreLogos] = useState<Record<string, { logo: string; name: string }>>({});
  const [loading, setLoading] = useState(devShowSkeletonOnly ? true : true);

  useEffect(() => {
    if (devShowSkeletonOnly) return;

    const fetchData = async () => {
      const cacheKey = `category_${leadingTitle.replace(/\s+/g, '_').toLowerCase()}`;
      const cached = getCachedData(cacheKey);

      if (cached) {
        setGames(cached.games);
        const logos = await fetchStoreLogos();
        setStoreLogos(logos);
        setLoading(false);
        return;
      }

      const queryParams = fetchOptions ? buildParamsFromObject(fetchOptions) : 'pageSize=10';

      try {
        const [gamesData, logos] = await Promise.all([
          fetchDealsByParams(queryParams),
          fetchStoreLogos()
        ]);
        setGames(gamesData);
        setStoreLogos(logos);
        sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), games: gamesData }));
      } catch (err) {
        console.error(`Failed to load deals for "${leadingTitle}":`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [leadingTitle, fetchOptions]);

  return (
    <section className={styles.section}>
      <div className={styles.row}>
        <nav className={styles.sectionNav}>
          <h2 className={styles.leadingTitle}>{leadingTitle}</h2>
          {viewMoreSrc && <Link to={viewMoreSrc} className={styles.seeAll}>
            <span>View more</span> <i className="fa-solid fa-caret-right" aria-hidden="true"></i>
          </Link>}
        </nav>
      </div>
      <div className={styles.grid}>
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : games.map((game) => (
              <VerticalCard
                key={game.dealID}
                imgSrc={game.thumb}
                storeImage={storeLogos[game.storeID]?.logo || ''}
                storeName={storeLogos[game.storeID]?.name || ''}
                title={game.title}
                salePrice={`$${game.salePrice}`}
                normalPrice={`$${game.normalPrice}`}
                onClick={() =>
                  onRedirect?.(
                    `https://www.cheapshark.com/redirect?dealID=${game.dealID}`,
                    storeLogos[game.storeID]?.name || 'Unknown Store',
                    game.title
                  )
                }
              />
            ))}
      </div>
    </section>
  );
}

export default CategorySection;
