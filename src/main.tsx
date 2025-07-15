import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './frontend/css/directory-css/index.css';
import './assets/fontawesome/css/all.min.css';
import './frontend/css/universal.css';

import Header from './frontend/component-builder/Header';
import Home from './frontend/directory/Home';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>,
)
