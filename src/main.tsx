import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './assets/fontawesome/css/all.min.css';
import './frontend/css/universal.css';

import Header from './frontend/component-builder/Header';
import Home from './frontend/directory/Home';
import MostPopularGames from './frontend/directory/MostPopularGames';
import InsaneDeals from './frontend/directory/InsaneDeals';
import NewPriceDrops from './frontend/directory/NewPriceDrops';
import Under$10Steals from './frontend/directory/Under$10Steals';

createRoot(document.getElementById('root')!).render (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/most-popular-games" element={<MostPopularGames />} />
      <Route path="/insane-deals-you-shouldn't-miss" element={<InsaneDeals />} />
      <Route path="/new-price-drops" element={<NewPriceDrops />} />
      <Route path="/under-$10-steals" element={<Under$10Steals />} />
    </Routes>
  </BrowserRouter>,
)
