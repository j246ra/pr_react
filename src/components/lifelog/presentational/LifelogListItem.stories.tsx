import { Meta } from '@storybook/react';
import LifelogListItem from './LifelogListItem';
import { Lifelog } from '@providers/LifelogProvider';
import dayjs from 'dayjs';
import BaseLayout from '../../BaseLayout';
import { Toaster } from 'react-hot-toast';
import Header from '../../Header';
import LifelogListHeader from './LifelogListHeader';
import notify from '@lib/toast';
import { HTMLTable } from '@blueprintjs/core';

const log: Lifelog = {
  id: 1,
  user_id: 1,
  action: `行動`,
  detail: `詳細（行動内容）`,
  startedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  finishedAt: undefined,
  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

export default {
  title: 'Components/Lifelog/LifelogListItem',
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
    log: log,
    onEditButtonClick: () => {
      notify.success('Edit Button Clicked.');
    },
    onDeleteButtonClick: () => {
      notify.success('Delete Button Clicked.');
    },
  },
};
