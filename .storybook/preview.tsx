import type { Preview } from '@storybook/react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { BrowserRouter } from 'react-router-dom';
import SessionProvider from '../src/providers/SessionProvider';
import UserProvider from '../src/providers/UserProvider';
import AuthApiProvider from '../src/providers/AuthApiProvider';

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <SessionProvider>
        <UserProvider>
          <AuthApiProvider>
            <Story />
          </AuthApiProvider>
        </UserProvider>
      </SessionProvider>
    </BrowserRouter>
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
