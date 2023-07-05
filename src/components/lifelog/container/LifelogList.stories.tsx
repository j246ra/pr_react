import { Meta } from '@storybook/react';
import LifelogList from './LifelogList';
import { Lifelog } from '@providers/LifelogProvider';
import { rest } from 'msw';
import { apiHost } from '@lib/storybook/util';
import Header from '../../Header';
import { Toaster } from 'react-hot-toast';
import BaseLayout from '../../BaseLayout';
import { lifelog } from '@lib/faker/lifelog';
import { DATETIME_FULL, now } from '@lib/dateUtil';

const lifelogs = (page = 1) => {
  const list: Lifelog[] = [];
  const offset = 20 * (page - 1);
  for (let i = 1 + offset; i <= 20 + offset; i++) {
    const datetime = now.subtract(i, 'h').format(DATETIME_FULL);
    const log = {
      ...lifelog(),
      startedAt: datetime,
      finishedAt: undefined,
    };
    list.push(log);
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
  decorators: [
    (Story) => (
      <div className={'App'}>
        <Toaster />
        <Header />
        <BaseLayout>
          <Story />
        </BaseLayout>
      </div>
    ),
  ],
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
