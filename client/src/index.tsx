import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/layout/styles.css';
import reportWebVitals from './reportWebVitals';
import { router } from './app/Router/Routes';
import { RouterProvider } from 'react-router-dom';
import { StoreProvider } from './app/context/StoreContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <StoreProvider>
    <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
