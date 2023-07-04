import { Meta } from '@storybook/react';
import LifelogListItem from './LifelogListItem';
import { Lifelog } from '@providers/LifelogProvider';
import dayjs from 'dayjs';
import BaseLayout from '../../BaseLayout';
import { Toaster } from 'react-hot-toast';
import Header from '../../Header';

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
          <table style={{ width: '100%', margin: '0 auto' }}>
            <tbody>
              <Story />
            </tbody>
          </table>
        </BaseLayout>
      </div>
    ),
  ],
} as Meta;

export const Default = {
  args: {
    log: log,
    onChange: () => {},
    onSubmit: () => {},
  },
};
