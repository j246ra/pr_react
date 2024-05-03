import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import SessionProvider from './providers/SessionProvider';
import LifelogProvider from '@providers/LifelogProvider';
import { COMMON } from '@lib/consts/common';
import App from '@src/App';
import initSentry from '@lib/sentry';

initSentry();

const container = document.getElementById('root');
if (!container) {
  throw new Error("Couldn't find root element");
}
const root = createRoot(container);

root.render(
  <BrowserRouter basename={COMMON.APP_URL.BASE_DIR}>
    <SessionProvider>
      <UserProvider>
        <LifelogProvider>
          <App />
        </LifelogProvider>
      </UserProvider>
    </SessionProvider>
  </BrowserRouter>
);
