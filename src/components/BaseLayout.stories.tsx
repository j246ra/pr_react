import React from 'react';
import { Meta } from '@storybook/react';
import BaseLayout from './BaseLayout';
import Header from './Header';

export default {
  title: 'Layout/BaseLayout',
  component: BaseLayout,
  decorators: [
    (Story) => (
      <div className={'App'}>
        <Header />
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default: () => JSX.Element = () => (
  <BaseLayout>
    <div
      className={'main-content'}
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'lightgray',
      }}
    />
  </BaseLayout>
);
