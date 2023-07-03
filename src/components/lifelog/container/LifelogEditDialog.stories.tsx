import { Meta } from '@storybook/react';
import LifelogEditDialog from './LifelogEditDialog';
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
  title: 'Components/Lifelog/LifelogEditDialog',
  component: LifelogEditDialog,
} as Meta;

export const Default = {
  args: {
    isOpen: true,
    log: log,
  },
};
