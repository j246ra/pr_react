import createClient from './client';
import lifelog, { CreatParams, UpdateParams } from './lifelog';
import { days, DATETIME_FULL } from '@lib/dateUtil';
import { API } from '@lib/consts/common';

jest.mock('./client');
const mockCreateClient = createClient as jest.MockedFunction<any>;

describe('lifelog APIの呼び出し検証', () => {
  beforeEach(() => {
    mockCreateClient.mockReturnValue({
      post: jest.fn().mockResolvedValue({
        data: {},
      }),
      put: jest.fn().mockResolvedValue({
        data: {},
      }),
      delete: jest.fn().mockResolvedValue({
        data: {},
      }),
      get: jest.fn().mockResolvedValue({
        data: {},
      }),
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
    });
  });

  const headers = () => {
    return { 'access-token': 'token', client: 'client', uid: 'uid' };
  };

  it('index', async () => {
    const page = 1;
    const word = 'TEST';

    const { index } = lifelog(headers);
    await index(page, word);

    expect(mockCreateClient().get).toHaveBeenCalledWith(API.LIFELOG.ENDPOINT, {
      headers: headers(),
      params: { page, word },
    });
  });

  it('create', async () => {
    const params: CreatParams = {
      action: 'action',
      detail: 'detail',
      startedAt: days().format(DATETIME_FULL),
      finishedAt: days().subtract(30, 'minute').format(DATETIME_FULL),
    };

    const { create } = lifelog(headers);
    await create(params);

    expect(mockCreateClient().post).toHaveBeenCalledWith(
      API.LIFELOG.ENDPOINT,
      {
        data: params,
      },
      { headers: headers() }
    );
  });

  it('update', async () => {
    const params: UpdateParams = {
      id: 99,
      userId: 1,
      action: 'action',
      detail: 'detail',
      startedAt: days().format(DATETIME_FULL),
      finishedAt: days().subtract(30, 'minute').format(DATETIME_FULL),
    };

    const { update } = lifelog(headers);
    await update(params);

    expect(mockCreateClient().put).toHaveBeenCalledWith(
      `${API.LIFELOG.ENDPOINT}/${params.id}`,
      {
        data: params,
      },
      { headers: headers() }
    );
  });

  it('destroy', async () => {
    const id = 10;

    const { destroy } = lifelog(headers);
    await destroy(id);

    expect(mockCreateClient().delete).toHaveBeenCalledWith(
      `${API.LIFELOG.ENDPOINT}/${id}`,
      { headers: headers() }
    );
  });
});
