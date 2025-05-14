// Import the core React library
import React from 'react';

// Import the ReactDOM client API for rendering React components into the DOM
import ReactDOM from 'react-dom/client';

// Import the main App component (defined in App.jsx)
import App from './App';


// Import global styles defined in index.css
import './index.css';

// Find the HTML element with the ID 'root' and render the App component inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode helps identify potential issues in development
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
