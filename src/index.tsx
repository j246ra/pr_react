import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import AuthApiProvider from './providers/AuthApiProvider';
import RootRouterProvider from './providers/RootRouterProvider';
import SessionProvider from './providers/SessionProvider';
import LifelogProvider from '@providers/LifelogProvider';

const container = document.getElementById('root');
if (!container) {
  throw new Error("Couldn't find root element");
}
const root = createRoot(container);

root.render(
  <BrowserRouter basename={'/app'}>
    <SessionProvider>
      <UserProvider>
        <AuthApiProvider>
          <LifelogProvider>
            <RootRouterProvider />
          </LifelogProvider>
        </AuthApiProvider>
      </UserProvider>
    </SessionProvider>
  </BrowserRouter>
);
