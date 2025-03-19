import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router';
import UserProvider from './providers/UserProvider';
import LifelogProvider from '@providers/LifelogProvider';
import { COMMON } from '@lib/consts/common';
import App from '@src/App';
import initSentry from '@lib/sentry';
import { ErrorAlert } from '@src/components/ErrorAlert';
import { ErrorBoundary } from 'react-error-boundary';

initSentry();

const container = document.getElementById('root');
if (!container) {
  throw new Error("Couldn't find root element");
}
const root = createRoot(container);

root.render(
  <BrowserRouter basename={COMMON.APP_URL.BASE_DIR}>
    <ErrorBoundary FallbackComponent={ErrorAlert}>
      <UserProvider>
        <LifelogProvider>
          <App />
        </LifelogProvider>
      </UserProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
