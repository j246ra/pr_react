import { Meta } from '@storybook/react';
import LifelogList from './LifelogList';
import { Lifelog } from '@providers/LifelogProvider';
import { rest } from 'msw';
import dayjs from 'dayjs';

const lifelogs = (page = 1) => {
  const list: Lifelog[] = [];
  const offset = 20 * (page - 1);
  const now = dayjs();
  for (let i = 1 + offset; i <= 20 + offset; i++) {
    const datetime = now.subtract(i, 'h').format('YYYY-MM-DD HH:mm:ss');
    list.push({
      id: i,
      user_id: 1,
      action: `Action---${i}`,
      detail: `Detail----${i} Detail----${i} Detail----${i} Detail----${i} Detail----${i} Detail----${i} Detail----${i} Detail----${i} Detail----${i}`,
      startedAt: datetime,
      finishedAt: undefined,
      createdAt: datetime,
      updatedAt: datetime,
    });
  }
  return list;
};

export default {
  title: 'Components/Lifelog/LifelogList',
  component: LifelogList,
} as Meta;

export const Default: Meta<typeof LifelogList> = () => <LifelogList />;
Default.parameters = {
  msw: {
    handlers: [
      rest.get('http://localhost:3000/v1/lifelogs', (req, res, ctx) => {
        const page = req.url.searchParams.get('page');
        if (page !== '3')
          return res(ctx.status(200), ctx.json(lifelogs(Number(page))));
        else return res(ctx.status(200));
      }),
    ],
  },
};
