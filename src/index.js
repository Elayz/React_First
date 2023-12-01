import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/header';

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div className="todoapp">
    <Header></Header>
  </div>
);
