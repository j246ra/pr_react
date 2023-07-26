import { rest } from 'msw';
import { Lifelog } from '@providers/LifelogProvider';
import { lifelog, lifelogs, OptionalLifelog } from '@lib/faker/lifelog';
import { apiHost } from '@lib/storybook/util';

type RestIndexOptions = {
  maxPage?: number;
  length?: number;
  status?: number;
};

type RestCreateOptions = {
  log?: OptionalLifelog;
  status?: number;
};

const lifelogApiMocks = () => {
  const index = ({
    maxPage = 2,
    length = 10,
    status = 200,
  }: RestIndexOptions = {}) => {
    return rest.get(apiHost('/lifelogs'), (req, res, ctx) => {
      switch (status) {
        case 200:
          const page = Number(req.url.searchParams.get('page'));
          const offset = length * (page - 1);
          let logs: Lifelog[] = [];
          if (page <= maxPage) {
            logs = lifelogs(length, offset);
          }
          return res(ctx.status(status), ctx.json(logs));
        default:
          return res(ctx.status(status));
      }
    });
  };

  const create = ({
    log = lifelog(),
    status = 200,
  }: RestCreateOptions = {}) => {
    return rest.post(apiHost('/lifelogs'), async (req, res, ctx) => {
      const words = await req.json().then((body) => {
        if (typeof body.data.context === 'string')
          return body.data.context.split(' ');
        return [];
      });
      log.action = words[0] || '';
      log.detail = words[1] || '';
      return res(ctx.status(status), ctx.json(log));
    });
  };

  const update = (status = 200) => {
    return rest.put(apiHost('/lifelogs/:id'), async (req, res, ctx) => {
      const data = await req.json().then((body) => body.data);
      return res(ctx.status(status), ctx.json(data));
    });
  };

  const destroy = (status = 200) => {
    return rest.delete(apiHost('/lifelogs/:id'), (_req, res, ctx) => {
      return res(ctx.status(status));
    });
  };

  return { index, create, update, destroy };
};

export default lifelogApiMocks;
