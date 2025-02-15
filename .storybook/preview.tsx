import type { Preview } from '@storybook/react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@src/index.scss';
import '@src/App.scss';
import { BrowserRouter } from 'react-router';
import UserProvider from '../src/providers/UserProvider';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import LifelogProvider from '../src/providers/LifelogProvider';

// Initialize MSW
initialize();
export const decorators = [
  mswDecorator,
  (Story: any) => (
    <div className={'navbar-height'}>
      <BrowserRouter>
        <UserProvider>
          <LifelogProvider>
            <Story />
          </LifelogProvider>
        </UserProvider>
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
  },
};

export default preview;
