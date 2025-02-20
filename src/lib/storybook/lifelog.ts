import { delay, http, HttpResponse } from 'msw';
import { apiHost } from '@lib/storybook/util';
import { Lifelog } from '@providers/LifelogProvider';
import { days, DATETIME_FULL } from '@lib/dateUtil';
import { lifelog } from '@lib/faker/lifelog';
import { API } from '@lib/consts/common';

type CreateRequestBody = {
  data: Lifelog;
};

const ENDPOINT = API.LIFELOG.ENDPOINT;

const lifelogs = (page = 1) => {
  const list: Lifelog[] = [];
  const offset = 20 * (page - 1);
  for (let i = 1 + offset; i <= 20 + offset; i++) {
    const datetime = days().subtract(i, 'h').format(DATETIME_FULL);
    const log = {
      ...lifelog(),
      id: i,
      startedAt: datetime,
      finishedAt: null,
    };
    list.push(log);
  }
  return list;
};

const indexHandler = () => {
  return http.get(apiHost(ENDPOINT), ({ request }) => {
    const page = new URL(request.url).searchParams.get('page');
    if (page !== '3')
      return HttpResponse.json(lifelogs(Number(page)), { status: 200 });
    else return new HttpResponse(null, { status: 200 });
  });
};

const createHandler = () => {
  return http.post(apiHost(ENDPOINT), async ({ request }) => {
    const body = (await request.json()) as CreateRequestBody;
    return HttpResponse.json(lifelog(body.data), { status: 200 });
  });
};

const updateHandler = () => {
  return http.put(apiHost(`${ENDPOINT}/:id`), async ({ request }) => {
    const body = (await request.json()) as CreateRequestBody;
    return HttpResponse.json(lifelog(body.data), { status: 200 });
  });
};

const deleteHandler = () => {
  return http.delete(apiHost(`${ENDPOINT}/:id`), ({}) => {
    return new HttpResponse(null, { status: 200 });
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
        http.get(apiHost(ENDPOINT), async ({}) => {
          await delay(1000 * 5);
          return new HttpResponse(null, { status: 200 });
        }),
      ],
    };
  };

  const empty = () => {
    return {
      handlers: [
        http.get(apiHost(ENDPOINT), ({}) => {
          return new HttpResponse(null, { status: 200 });
        }),
      ],
    };
  };

  return { all, loading, empty };
};
