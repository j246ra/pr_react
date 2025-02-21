import React from 'react';
import { Meta } from '@storybook/react';
import AccountDelete from './AccountDelete';
import { deleteUserHandler } from '@lib/storybook/session';

export default {
  title: 'Session/Container/AccountDelete',
  component: AccountDelete,
  parameters: {
    msw: {
      handlers: [deleteUserHandler()],
    },
  },
} as Meta;

export const Default = () => <AccountDelete />;
