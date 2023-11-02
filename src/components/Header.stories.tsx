import React from 'react';
import { Meta } from '@storybook/react';
import Header from './Header';

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
} as Meta;

export const Default = () => <Header />;
