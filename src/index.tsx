import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import AuthApiProvider from './providers/AuthApiProvider';
import LifelogApiProvider from '@providers/LifelogApiProvider';
import RootRouterProvider from './providers/RootRouterProvider';
import SessionProvider from './providers/SessionProvider';
import LifelogProvider from '@providers/LifelogProvider';

const container = document.getElementById('root');
if (!container) {
  throw new Error("Couldn't find root element");
}
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <SessionProvider>
      <UserProvider>
        <AuthApiProvider>
          <LifelogProvider>
            <LifelogApiProvider>
              <RootRouterProvider />
            </LifelogApiProvider>
          </LifelogProvider>
        </AuthApiProvider>
      </UserProvider>
    </SessionProvider>
  </BrowserRouter>
);
