import { Meta } from '@storybook/react';
import LifelogListItem from './LifelogListItem';
import { Lifelog } from '@providers/LifelogProvider';
import dayjs from 'dayjs';

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
      <table>
        <tbody>
          <Story />
        </tbody>
      </table>
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
