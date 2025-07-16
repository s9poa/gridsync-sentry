import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './assets/fontawesome/css/all.min.css';
import './frontend/css/universal.css';

import Header from './frontend/component-builder/Header';
import Home from './frontend/directory/Home';
import Deals from './frontend/directory/Deals';
import Games from './frontend/directory/Games';
import Pc from './frontend/directory/Pc';
import Xbox from './frontend/directory/Xbox';
import Playstation from './frontend/directory/Playstation';

createRoot(document.getElementById('root')!).render (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="/games" element={<Games />} />
      <Route path="/pc" element={<Pc />} />
      <Route path="/xbox" element={<Xbox />} />
      <Route path="/playstation" element={<Playstation />} />
    </Routes>
  </BrowserRouter>,
)
