import { Meta } from '@storybook/react';
import LifelogListItem from './LifelogListItem';
import BaseLayout from '@src/components/BaseLayout';
import { Toaster } from 'react-hot-toast';
import Header from '@src/components/Header';
import LifelogListHeader from './LifelogListHeader';
import notify from '@lib/toast';
import { HTMLTable } from '@blueprintjs/core';
import { lifelog } from '@lib/faker/lifelog';

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
            <LifelogListHeader />
            <tbody>
              <Story />
            </tbody>
          </HTMLTable>
        </BaseLayout>
      </div>
    ),
  ],
} as Meta;

export const Default = {
  args: {
    log: lifelog(),
    onEditButtonClick: () => {
      notify.success('Edit Button Clicked.');
    },
    onDeleteButtonClick: () => {
      notify.success('Delete Button Clicked.');
    },
  },
};
