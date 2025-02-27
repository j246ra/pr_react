import React from 'react';
import { Meta } from '@storybook/react';
import SideMenu from '@src/components/SideMenu';
import { UserContext } from '@providers/UserProvider';
import { userContextValues } from '@lib/storybook/contextValues';
import { signOutHandler } from '@lib/storybook/session';

export default {
  title: 'Layout/SideMenu',
  component: SideMenu,
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
