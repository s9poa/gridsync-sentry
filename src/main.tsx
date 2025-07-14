import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './frontend/css/directory-css/index.css';
import './assets/fontawesome/css/all.min.css';
import './frontend/css/universal.css';

import Home from './frontend/directory/Home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
