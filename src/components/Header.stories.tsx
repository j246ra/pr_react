import React from 'react';
import { Meta } from '@storybook/react';
import Header from './Header';
import { signOutHandler } from '@lib/storybook/session';
import { UserContext } from '@providers/UserProvider';
import { userContextValues } from '@lib/storybook/contextValues';

export default {
  title: 'Layout/Header',
  component: Header,
  decorators: [
    (Story, { args }) => (
      <UserContext.Provider
        value={{
          ...userContextValues,
          isLoggedIn: () => args.isLoggedIn,
        }}
      >
        <div className={'App'}>
          <Story />
        </div>
      </UserContext.Provider>
    ),
  ],
  parameters: {
    msw: {
      handlers: [signOutHandler()],
    },
  },
} as Meta;

export const LoggedIn = {
  args: {
    isLoggedIn: true,
  },
};
export const LoggedOut = {
  args: {
    isLoggedIn: false,
  },
};
