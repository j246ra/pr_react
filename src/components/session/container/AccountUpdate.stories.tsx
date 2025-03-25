import React from 'react';
import { Meta } from '@storybook/react';
import AccountUpdate from './AccountUpdate';
import { updateUserHandler, deleteUserHandler } from '@lib/storybook/session';

export default {
  title: 'Session/Container/AccountUpdate',
  component: AccountUpdate,
  parameters: {
    msw: {
      handlers: [updateUserHandler(), deleteUserHandler()],
    },
  },
} as Meta;

export const Default = () => <AccountUpdate />;
