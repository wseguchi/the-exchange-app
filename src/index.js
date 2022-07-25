import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />

    <div className='credits'>
      <a href='https://github.com/wseguchi' target='_blank'>
        Designed and coded by Wildson Seguchi
      </a>
    </div>
  </React.StrictMode>
);
