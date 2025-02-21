import React from 'react';
import { Meta } from '@storybook/react';
import SignUp from './SignUp';
import { signUpHandler } from '@lib/storybook/session';

export default {
  title: 'Session/Container/SignUp',
  component: SignUp,
  parameters: {
    msw: {
      handlers: [signUpHandler()],
    },
  },
} as Meta;

export const Default = () => <SignUp />;
