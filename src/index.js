import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <div
      className='credits'
      onClick={(window.open = 'https://github.com/wseguchi')}
    >
      Coded by Wildson Seguchi
    </div>
  </React.StrictMode>
);
