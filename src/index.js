import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';
import './index.scss';
import App from './App';

ReactGA.initialize('G-NG4DENJSX9');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
