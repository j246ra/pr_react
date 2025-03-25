import React from 'react';
import type { Preview } from '@storybook/react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@src/index.scss';
import '@src/App.scss';
import { BrowserRouter } from 'react-router';
import UserProvider from '../src/providers/UserProvider';
import { initialize, mswLoader } from 'msw-storybook-addon';
import LifelogProvider from '../src/providers/LifelogProvider';
import { ErrorBoundary } from 'react-error-boundary';

// Initialize MSW
initialize();

const preview: Preview = {
  decorators: [
    (Story: any) => (
      <div className={'navbar-height'}>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={() => <div>Error occurred!</div>}>
            <UserProvider>
              <LifelogProvider>
                <Story />
              </LifelogProvider>
            </UserProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
