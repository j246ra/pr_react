import React from 'react';
import { Meta } from '@storybook/react';
import PasswordForget from './PasswordForget';
import { passwordForgetHandler } from '@lib/storybook/session';

export default {
  title: 'Session/Container/PasswordForget',
  component: PasswordForget,
  parameters: {
    msw: {
      handlers: [passwordForgetHandler()],
    },
  },
} as Meta;

export const Default = () => <PasswordForget />;
