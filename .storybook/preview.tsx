import type { Preview } from '@storybook/react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '../src/index.scss';
import '../src/App.scss';
import { BrowserRouter } from 'react-router-dom';
import SessionProvider from '../src/providers/SessionProvider';
import UserProvider from '../src/providers/UserProvider';
import AuthApiProvider from '../src/providers/AuthApiProvider';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import LifelogProvider from '../src/providers/LifelogProvider';

// Initialize MSW
initialize();
export const decorators = [
  mswDecorator,
  (Story) => (
    <body>
      <BrowserRouter>
        <SessionProvider>
          <UserProvider>
            <AuthApiProvider>
              <LifelogProvider>
                <Story />
              </LifelogProvider>
            </AuthApiProvider>
          </UserProvider>
        </SessionProvider>
      </BrowserRouter>
    </body>
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
  },
};

export default preview;
