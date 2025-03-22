import React from 'react';
import { Meta } from '@storybook/react';
import BaseLayout from './BaseLayout';
import ReloadRequiredDialog from '@src/components/ReloadRequiredDialog';

export default {
  title: 'Layout/ReloadRequiredDialog',
  component: ReloadRequiredDialog,
  decorators: [
    (Story) => (
      <div className={'App'}>
        <BaseLayout>
          <Story />
        </BaseLayout>
      </div>
    ),
  ],
} as Meta;

export const Default: () => JSX.Element = () => (
  <ReloadRequiredDialog message={'これはテストです。'} />
);
