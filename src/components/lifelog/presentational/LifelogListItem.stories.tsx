import React from 'react';
import { Meta } from '@storybook/react';
import LifelogListItem from './LifelogListItem';
import BaseLayout from '@src/components/BaseLayout';
import { Toaster } from 'react-hot-toast';
import Header from '@src/components/Header';
import notify from '@lib/toast';
import { HTMLTable } from '@blueprintjs/core';
import { lifelog } from '@lib/faker/lifelog';
import { lifelogMocks } from '@lib/storybook/lifelog';

export default {
  title: 'Lifelog/Presentational/LifelogListItem',
  component: LifelogListItem,
  decorators: [
    (Story) => (
      <div className={'App'}>
        <Toaster />
        <Header />
        <BaseLayout>
          <HTMLTable
            bordered={false}
            style={{ width: '100%', margin: '0 auto' }}
          >
            <tbody>
              <Story />
            </tbody>
          </HTMLTable>
        </BaseLayout>
      </div>
    ),
  ],
} as Meta;

const { all } = lifelogMocks();

const args = {
  onFinishButtonClick: () => {
    notify.success('Finish Button Clicked.');
  },
  onEditButtonClick: () => {
    notify.success('Edit Button Clicked.');
  },
  onDeleteButtonClick: () => {
    notify.success('Delete Button Clicked.');
  },
};

export const Default = {
  args: {
    log: lifelog(),
    ...args,
  },
  parameters: {
    msw: all(),
  },
};

export const TopOfDay = {
  args: {
    log: lifelog({ isDateChanged: true }),
    ...args,
  },
  parameters: {
    msw: all(),
  },
};

export const NotFinish = {
  args: {
    log: lifelog({ finishedAt: null }),
    ...args,
  },
  parameters: {
    msw: all(),
  },
};

export const TopOfDayNotFinish = {
  args: {
    log: lifelog({ finishedAt: null, isDateChanged: true }),
    ...args,
  },
  parameters: {
    msw: all(),
  },
};
