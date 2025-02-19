import { http, HttpResponse } from 'msw';
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

type CreateRequestBody = {
  data: Lifelog;
};

const lifelogApiMocks = () => {
  const index = ({
    maxPage = 2,
    length = 10,
    status = 200,
  }: RestIndexOptions = {}) => {
    return http.get(apiHost(API.LIFELOG.ENDPOINT), ({ params }) => {
      switch (status) {
        case 200:
          const page = Number(params.page || '1');
          const offset = length * (page - 1);
          let logs: Lifelog[] = [];
          if (
            params.word !== LIFELOG_API_MOCKS.PARAMS.WORD.NO_DATA &&
            page <= maxPage
          ) {
            logs = lifelogs(length, offset);
          }
          return HttpResponse.json(logs, { status });
        case null:
          return HttpResponse.error();
        default:
          return new HttpResponse(null, { status });
      }
    });
  };

  const create = ({ status = 200 }: RestCreateOptions = {}) => {
    return http.post(apiHost(API.LIFELOG.ENDPOINT), async ({ request }) => {
      const body = (await request.json()) as CreateRequestBody;
      return HttpResponse.json(lifelog(body.data), { status });
    });
  };

  const update = (status = 200) => {
    return http.put(
      apiHost(`${API.LIFELOG.ENDPOINT}/:id`),
      async ({ request }) => {
        const body = (await request.json()) as CreateRequestBody;
        return HttpResponse.json(lifelog(body.data), { status });
      }
    );
  };

  const destroy = (status = 200) => {
    return http.delete(apiHost(`${API.LIFELOG.ENDPOINT}/:id`), ({}) => {
      return new HttpResponse(null, { status });
    });
  };

  return { index, create, update, destroy };
};

export default lifelogApiMocks;
