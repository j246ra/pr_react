import client from './client';
import lifelog, { CreatParams, UpdateParams } from './lifelog';
import { DATETIME_FULL, now } from '@lib/dateUtil';

jest.mock('./client');

const mockedClient = client as jest.Mocked<typeof client>;

describe('lifelog APIの呼び出し検証', () => {
  const headers = { 'access-token': 'token', client: 'client', uid: 'uid' };

  beforeEach(() => {
    mockedClient.post.mockReset();
    mockedClient.put.mockReset();
    mockedClient.get.mockReset();
    mockedClient.delete.mockReset();
  });

  it('index', async () => {
    const page = 1;
    const word = 'TEST';

    const { index } = lifelog(headers);
    await index(page, word);

    expect(mockedClient.get).toHaveBeenCalledWith('/lifelogs', {
      headers,
      params: { page, word },
    });
  });

  it('create', async () => {
    const params: CreatParams = {
      context: 'context',
      action: 'action',
      detail: 'detail',
      startedAt: now.format(DATETIME_FULL),
      finishedAt: now.subtract(30, 'minute').format(DATETIME_FULL),
    };

    const { create } = lifelog(headers);
    await create(params);

    expect(mockedClient.post).toHaveBeenCalledWith(
      '/lifelogs',
      {
        data: params,
      },
      { headers }
    );
  });

  it('update', async () => {
    const params: UpdateParams = {
      id: 99,
      userId: 1,
      action: 'action',
      detail: 'detail',
      startedAt: now.format(DATETIME_FULL),
      finishedAt: now.subtract(30, 'minute').format(DATETIME_FULL),
    };

    const { update } = lifelog(headers);
    await update(params);

    expect(mockedClient.put).toHaveBeenCalledWith(
      '/lifelogs/' + params.id,
      {
        data: params,
      },
      { headers }
    );
  });

  it('destroy', async () => {
    const id = 10;

    const { destroy } = lifelog(headers);
    await destroy(id);

    expect(mockedClient.delete).toHaveBeenCalledWith('/lifelogs/' + id, {
      headers,
    });
  });
});
