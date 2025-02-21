import React from 'react';
import { Meta } from '@storybook/react';
import Header from './Header';
import { signOutHandler } from '@lib/storybook/session';

export default {
  title: 'Layout/Header',
  component: Header,
  decorators: [
    (Story) => (
      <div className={'App'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    msw: {
      handlers: [signOutHandler()],
    },
  },
} as Meta;

export const Default = () => <Header />;
