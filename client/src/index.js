import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' for createRoot
import App from './App';
import './index.css';

// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root for React rendering
const root = ReactDOM.createRoot(container);

// Render the app with createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
