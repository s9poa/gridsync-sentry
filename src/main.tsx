import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './assets/fontawesome/css/all.min.css';
import './frontend/css/universal.css';

import ScrollToTop from './frontend/component-builder/ScrollToTop';
import Header from './frontend/component-builder/Header';

import Home from './frontend/directory/Home';
import MostPopularGames from './frontend/directory/MostPopularGames';
import Under$10Steals from './frontend/directory/Under$10Steals';
import BiggestDiscountsRightNow from './frontend/directory/BiggestDiscountsRightNow';
import JustDroppedDeals from './frontend/directory/JustDroppedDeals';
import NewReleases from './frontend/directory/NewReleases';
import AZGameList from './frontend/directory/AZGameList';
import FanFavoritesUnder$20 from './frontend/directory/FanFavoritesUnder$20';
import LowestPricesThisWeek from './frontend/directory/LowestPricesThisWeek';
import SearchResults from './frontend/directory/SearchResults';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/most-popular-games" element={<MostPopularGames />} />
      <Route path="/biggest-discounts-right-now" element={<BiggestDiscountsRightNow />} />
      <Route path="/just-dropped-deals" element={<JustDroppedDeals />} />
      <Route path="/under-$10-steals" element={<Under$10Steals />} />
      <Route path="/new-releases" element={<NewReleases />} />
      <Route path="/a-z-game-list" element={<AZGameList />} />
      <Route path="/fan-favorites-under-$20" element={<FanFavoritesUnder$20 />} />
      <Route path="/lowest-prices-this-week" element={<LowestPricesThisWeek />} />
      <Route path="/search-results" element={<SearchResults />} />
    </Routes>
  </BrowserRouter>
);
