import { Meta } from '@storybook/react';
import LifelogList from './LifelogList';
import { Lifelog } from '@providers/LifelogProvider';
import { rest } from 'msw';
import dayjs from 'dayjs';
import { apiHost } from '@lib/storybook/util';

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

const deleteHandler = () => {
  return rest.delete(apiHost('/lifelogs/:id'), (req, res, ctx) => {
    return res(ctx.status(200));
  });
};

export default {
  title: 'Components/Lifelog/LifelogList',
  component: LifelogList,
} as Meta;

export const Default: Meta<typeof LifelogList> = () => <LifelogList />;
Default.parameters = {
  msw: {
    handlers: [
      rest.get(apiHost('/lifelogs'), (req, res, ctx) => {
        const page = req.url.searchParams.get('page');
        if (page !== '3')
          return res(ctx.status(200), ctx.json(lifelogs(Number(page))));
        else return res(ctx.status(200));
      }),
      deleteHandler(),
    ],
  },
};

export const Loading: Meta<typeof LifelogList> = () => <LifelogList />;
Loading.parameters = {
  msw: {
    handlers: [
      rest.get(apiHost('/lifelogs'), (req, res, ctx) => {
        return res(ctx.delay(1000 * 60 * 60 * 24), ctx.status(200));
      }),
    ],
  },
};
