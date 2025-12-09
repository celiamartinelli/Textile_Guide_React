import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/components/App/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.scss';
import '@/styles/index.css';
import './config/i18n.ts';

const container = document.getElementById('root');

const router = createBrowserRouter(
  [
    {
      path: '/*',
      element: <App />,
    },
  ],
  {
    future: { v7_relativeSplatPath: true },
  }
);

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error('Root container not found');
}
