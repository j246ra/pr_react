import type { Preview } from '@storybook/react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@src/index.scss';
import '@src/App.scss';
import { BrowserRouter } from 'react-router';
import SessionProvider from '../src/providers/SessionProvider';
import UserProvider from '../src/providers/UserProvider';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import LifelogProvider from '../src/providers/LifelogProvider';
import { cookieDecorator } from 'storybook-addon-cookie';

// Initialize MSW
initialize();
export const decorators = [
  cookieDecorator,
  mswDecorator,
  (Story: any) => (
    <div className={'navbar-height'}>
      <BrowserRouter>
        <SessionProvider>
          <UserProvider>
            <LifelogProvider>
              <Story />
            </LifelogProvider>
          </UserProvider>
        </SessionProvider>
      </BrowserRouter>
    </div>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    cookie: {
      token: {
        'access-token': 'token',
        uid: 'sb@example.com',
        client: 'client',
      },
    },
  },
};

export default preview;
