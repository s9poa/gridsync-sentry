import { useEffect, useState } from 'react';
import styles from '../css/component-css/CategorySection.module.scss';
import VerticalCard from './VerticalCard';
import SkeletonCard from './SkeletonCard';
import { fetchDealsByParams, fetchStoreLogos } from '../../backend/utils/cheapshark';
import type { GameDeal } from '../../backend/utils/cheapshark';

const devShowSkeletonOnly = true; // set to true to view SkeletonCard only for design

type Props = {
  leadingTitle: string;
  fetchOptions?: {
    sortBy?: string;
    upperPrice?: number;
    lowerPrice?: number;
  };
  onRedirect?: (linkSrc: string, storeName: string, gameTitle: string) => void;
};

const titleToParams: Record<string, string> = {
  'Most Popular Games': 'sortBy=Deal Rating&pageSize=10',
  "Insane Deals You Shouldn't Miss": 'sortBy=Savings&upperPrice=30&pageSize=10',
  'New Price Drops': 'sortBy=Recent&pageSize=10',
  'Under $10 Steals': 'upperPrice=10&sortBy=Price&pageSize=10',
  'Trending Right Now': 'sortBy=Title&pageSize=10',
  'Top Picks from the Community': 'sortBy=Reviews&pageSize=10',
  'Massive Discounts This Week': 'sortBy=Savings&lowerPrice=5&pageSize=10',
  'Bangers Worth Every Penny': 'sortBy=Deal Rating&lowerPrice=10&upperPrice=30&pageSize=10'
};

function buildParamsFromObject(options: Props['fetchOptions']): string {
  if (!options) return '';
  const params = new URLSearchParams();
  if (options.sortBy) params.set('sortBy', options.sortBy);
  if (options.upperPrice !== undefined) params.set('upperPrice', options.upperPrice.toString());
  if (options.lowerPrice !== undefined) params.set('lowerPrice', options.lowerPrice.toString());
  params.set('pageSize', '10');
  return params.toString();
}

function CategorySection({ leadingTitle, fetchOptions, onRedirect }: Props) {
  const [games, setGames] = useState<GameDeal[]>([]);
  const [storeLogos, setStoreLogos] = useState<Record<string, { logo: string; name: string }>>({});
  const [loading, setLoading] = useState(devShowSkeletonOnly ? true : true);

  useEffect(() => {
    if (devShowSkeletonOnly) return;

    const fetchData = async () => {
      const fallbackParams = titleToParams[leadingTitle] || 'pageSize=10';
      const queryParams = fetchOptions ? buildParamsFromObject(fetchOptions) : fallbackParams;

      try {
        const [gamesData, logos] = await Promise.all([
          fetchDealsByParams(queryParams),
          fetchStoreLogos()
        ]);
        setGames(gamesData);
        setStoreLogos(logos);
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
          <a href="/games" className={styles.seeAll}>
            <span>View more</span> <i className="fa-solid fa-caret-right" aria-hidden="true"></i>
          </a>
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
