import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/components/App/App';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.scss';
import '@/styles/index.css';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error('Root container not found');
}
