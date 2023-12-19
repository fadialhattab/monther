// index.js (or main.js)

import React from 'react';
import { createRoot } from 'react-dom';
import App from './App'; // Import your App component

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
