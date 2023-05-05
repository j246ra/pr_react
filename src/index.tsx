import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import AuthApiProvider from './providers/AuthApiProvider';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import LifelogApiProvider from './providers/LifelogApiProvider';
import RootRouterProvider from './providers/RootRouterProvider';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <CookiesProvider>
      <UserProvider>
        <AuthApiProvider>
          <LifelogApiProvider>
            <RootRouterProvider />
          </LifelogApiProvider>
        </AuthApiProvider>
      </UserProvider>
    </CookiesProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
