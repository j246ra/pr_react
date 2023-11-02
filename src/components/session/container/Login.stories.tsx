import React from 'react';
import { Meta } from '@storybook/react';
import Login from './Login';
import { rest } from 'msw';
import { apiHost } from '@lib/storybook/util';

export const SuccessBehavior: Meta<typeof Login> = () => <Login />;
SuccessBehavior.parameters = {
  msw: {
    handlers: [
      rest.post(apiHost('/auth/sign_in'), (req, res, ctx) => {
        return res(ctx.status(200));
      }),
    ],
  },
};

export default {
  title: 'Session/Container/Login',
  component: Login,
} as Meta;

export const Default = () => <Login />;
