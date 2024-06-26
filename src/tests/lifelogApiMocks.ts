import { rest } from 'msw';
import { Lifelog } from '@providers/LifelogProvider';
import { lifelog, lifelogs, OptionalLifelog } from '@lib/faker/lifelog';
import { apiHost } from '@lib/storybook/util';
import { API, LIFELOG_API_MOCKS } from '@lib/consts/common';

type RestIndexOptions = {
  maxPage?: number;
  length?: number;
  status?: number | null;
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
    return rest.get(apiHost(API.LIFELOG.ENDPOINT), (req, res, ctx) => {
      switch (status) {
        case 200:
          const page = Number(req.url.searchParams.get('page'));
          const offset = length * (page - 1);
          let logs: Lifelog[] = [];
          let word = req.url.searchParams.get('word');
          if (
            word !== LIFELOG_API_MOCKS.PARAMS.WORD.NO_DATA &&
            page <= maxPage
          ) {
            logs = lifelogs(length, offset);
          }
          return res(ctx.status(status), ctx.json(logs));
        case null:
          return res.networkError('network error.');
        default:
          return res(ctx.status(status));
      }
    });
  };

  const create = ({ status = 200 }: RestCreateOptions = {}) => {
    return rest.post(apiHost(API.LIFELOG.ENDPOINT), async (req, res, ctx) => {
      const data = await req.json().then((body) => body.data);
      return res(ctx.status(status), ctx.json(lifelog(data)));
    });
  };

  const update = (status = 200) => {
    return rest.put(
      apiHost(`${API.LIFELOG.ENDPOINT}/:id`),
      async (req, res, ctx) => {
        const data = await req.json().then((body) => body.data);
        return res(ctx.status(status), ctx.json(data));
      }
    );
  };

  const destroy = (status = 200) => {
    return rest.delete(
      apiHost(`${API.LIFELOG.ENDPOINT}/:id`),
      (_req, res, ctx) => {
        return res(ctx.status(status));
      }
    );
  };

  return { index, create, update, destroy };
};

export default lifelogApiMocks;
