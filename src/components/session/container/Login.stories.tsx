import React from 'react';
import { Meta } from '@storybook/react';
import Login from './Login';
import { signInHandler } from '@lib/storybook/session';

export default {
  title: 'Session/Container/Login',
  component: Login,
  parameters: {
    msw: {
      handlers: [signInHandler()],
    },
  },
} as Meta;

export const Default = () => <Login />;
