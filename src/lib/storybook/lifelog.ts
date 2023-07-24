import { rest } from 'msw';
import { apiHost } from '@lib/storybook/util';
import { Lifelog } from '@providers/LifelogProvider';
import { DATETIME_FULL, now } from '@lib/dateUtil';
import { lifelog } from '@lib/faker/lifelog';

const lifelogs = (page = 1) => {
  const list: Lifelog[] = [];
  const offset = 20 * (page - 1);
  for (let i = 1 + offset; i <= 20 + offset; i++) {
    const datetime = now.subtract(i, 'h').format(DATETIME_FULL);
    const log = {
      ...lifelog(),
      id: i,
      startedAt: datetime,
      finishedAt: undefined,
    };
    list.push(log);
  }
  return list;
};

const indexHandler = () => {
  return rest.get(apiHost('/lifelogs'), (req, res, ctx) => {
    const page = req.url.searchParams.get('page');
    if (page !== '3')
      return res(ctx.status(200), ctx.json(lifelogs(Number(page))));
    else return res(ctx.status(200));
  });
};

const createHandler = () => {
  return rest.post(apiHost('/lifelogs'), async (req, res, ctx) => {
    const data = await req.json().then((body) => body.data);
    return res(ctx.status(200), ctx.json(data));
  });
};

const updateHandler = () => {
  return rest.put(apiHost('/lifelogs/:id'), async (req, res, ctx) => {
    const data = await req.json().then((body) => body.data);
    return res(ctx.status(200), ctx.json(data));
  });
};

const deleteHandler = () => {
  return rest.delete(apiHost('/lifelogs/:id'), (req, res, ctx) => {
    return res(ctx.status(200));
  });
};

export const lifelogMocks = () => {
  const all = () => {
    return {
      handlers: [
        indexHandler(),
        createHandler(),
        updateHandler(),
        deleteHandler(),
      ],
    };
  };

  const loading = () => {
    return {
      handlers: [
        rest.get(apiHost('/lifelogs'), (req, res, ctx) => {
          return res(ctx.delay(1000 * 60 * 60 * 24), ctx.status(200));
        }),
      ],
    };
  };

  return { all, loading };
};
