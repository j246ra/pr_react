import React from 'react';
import { render, renderHook, waitFor, act } from '@testing-library/react';
import LifelogProvider, {
  Lifelog,
  LifelogProviderProps,
  useLifelog,
} from '@providers/LifelogProvider';
import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { lifelog, lifelogs } from '@lib/faker/lifelog';
import { AxiosError } from 'axios';
import { apiHost } from '@lib/storybook/util';

let mockSetToken: jest.SpyInstance<unknown>;
let mockClearUser: jest.SpyInstance<unknown>;

const hostURL = 'http://localhost:3000/v1';
describe('LifelogProvider', () => {
  beforeEach(() => {
    mockSetToken = jest.fn();
    mockClearUser = jest.fn();
    mockUseSession.mockReturnValue({
      getHeaders: jest.fn(),
      setToken: mockSetToken,
    });
    mockUseUser.mockReturnValue({
      clearUser: mockClearUser,
    });
  });
  afterEach(() => {
    mockSetToken.mockClear();
  });

  it('子要素がレンダリングされる', () => {
    const { getByTestId } = render(
      <LifelogProvider>
        <div data-testid={'child'} />
      </LifelogProvider>
    );
    expect(getByTestId('child')).toBeInTheDocument();
  });

  describe('Api検証', () => {
    const wrapper = ({ children }: LifelogProviderProps) => (
      <LifelogProvider>{children}</LifelogProvider>
    );

    const restIndex = (maxPage = 2, length = 10) => {
      return rest.get(hostURL + '/lifelogs', (req, res, ctx) => {
        const page = Number(req.url.searchParams.get('page'));
        const offset = length * (page - 1);
        let logs: Lifelog[] = [];
        if (page <= maxPage) {
          logs = lifelogs(length, offset);
        }
        return res(ctx.status(200), ctx.json(logs));
      });
    };

    const server = setupServer(restIndex());
    beforeAll(() => server.listen());
    beforeEach(() => server.resetHandlers());
    afterAll(() => server.close());

    describe('Axios Interceptor with loadLogs().', () => {
      it('status 200 の場合、setToken() にてセッション情報を更新する', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });

        expect(result.current.logs).toHaveLength(0);
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(10);
          expect(mockSetToken).toBeCalled();
        });
      });

      it('status 401 の場合、clearUser() にてセッションを初期化する', async () => {
        server.use(
          rest.get(hostURL + '/lifelogs', (req, res, ctx) => {
            return res(ctx.status(401));
          })
        );
        const { result } = renderHook(() => useLifelog(), { wrapper });

        expect(result.current.logs).toHaveLength(0);
        act(() => {
          expect(result.current.loadLogs()).rejects.toBeInstanceOf(AxiosError);
        });

        await waitFor(() => {
          expect(result.current.logs).toHaveLength(0);
          expect(mockClearUser).toBeCalled();
        });
      });

      it('status 401 以外のエラーの場合、AxiosError を返却する', async () => {
        server.use(
          rest.get(hostURL + '/lifelogs', (req, res, ctx) => {
            return res(ctx.status(500));
          })
        );
        const { result } = renderHook(() => useLifelog(), { wrapper });

        expect(result.current.logs).toHaveLength(0);
        act(() => {
          expect(result.current.loadLogs()).rejects.toBeInstanceOf(AxiosError);
        });

        await waitFor(() => {
          expect(result.current.logs).toHaveLength(0);
          expect(mockClearUser).not.toBeCalled();
        });
      });
    });

    describe('loadLogs 検証', () => {
      it('複数回呼び出すごとに logs にデータが追記されている', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        expect(result.current.logs).toHaveLength(0);
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(10);
        });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(20);
        });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(20);
        });
      });

      it('データが 0 件の場合でも正常にレンダリングする', async () => {
        server.use(restIndex(1, 0));
        const { result } = renderHook(() => useLifelog(), { wrapper });
        expect(result.current.logs).toHaveLength(0);
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(0);
        });
      });
    });

    describe('searchLogs 検証', () => {
      it('呼び出されるごとに logs が上書きされる', async () => {
        server.use(restIndex(2, 10));
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.searchLogs('TEST1');
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(10);
        });
        act(() => {
          result.current.searchLogs('TEST2');
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(10);
        });
        act(() => {
          result.current.searchLogs('TEST3');
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(10);
        });
      });
      it('loadLogs で続きのデータを取得できる', async () => {
        server.use(restIndex(3, 10));
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.searchLogs('TEST1');
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(10);
        });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(20);
        });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(30);
        });
      });
      it('データが 0 件でも正常にレンダリングする', async () => {
        server.use(restIndex(1, 0));
        const { result } = renderHook(() => useLifelog(), { wrapper });
        expect(result.current.logs).toHaveLength(0);
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(0);
        });
      });
    });

    describe('newLog 検証', () => {
      it('空の Lifelog が取得できる', () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        expect(result.current.newLog()).toEqual({
          id: -1,
          userId: -1,
          action: '',
          detail: undefined,
          startedAt: '',
          finishedAt: undefined,
          createdAt: '',
          updatedAt: '',
        });
      });
    });

    describe('createLogByContext 検証', () => {
      it('データ作成成功時に log を追記する', async () => {
        server.use(
          rest.post(apiHost('/lifelogs'), async (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json(lifelog({ action: 'My', detail: 'name is ELITE.' }))
            );
          })
        );
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.createLogByContext('My name is ELITE.');
        });
        await waitFor(() => {
          expect(result.current.logs[0].action).toEqual('My');
          expect(result.current.logs[0].detail).toEqual('name is ELITE.');
        });
      });
      it('認証エラー以外で失敗時は logs に変化はない', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        server.use(restIndex());
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(10);
        });

        server.use(
          rest.post(apiHost('/lifelogs'), async (req, res, ctx) => {
            return res(ctx.status(500));
          })
        );
        await expect(
          result.current.createLogByContext('STELLAR STELLAR.')
        ).rejects.toBeInstanceOf(AxiosError);
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(10);
        });
      });
    });

    describe('updateLog 検証', () => {
      it('データ更新成功時に該当 log も更新されている', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        server.use(restIndex());
        act(() => {
          result.current.loadLogs();
        });
        let beforeLog: Lifelog;
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(10);
          beforeLog = result.current.logs[5];
        });

        server.use(
          rest.put(apiHost('/lifelogs/:id'), async (req, res, ctx) => {
            const data = await req.json().then((body) => body.data);
            return res(ctx.status(200), ctx.json(data));
          })
        );
        act(() => {
          result.current.updateLog(
            lifelog({ ...beforeLog, action: 'ACTION', detail: 'DETAIL' })
          );
        });
        await waitFor(() => {
          const afterLog = result.current.logs[5];
          expect(afterLog.id).toEqual(beforeLog.id);
          expect(afterLog.action).toEqual('ACTION');
          expect(afterLog.detail).toEqual('DETAIL');
          expect(afterLog.createdAt).toEqual(beforeLog.createdAt);
        });
      });
      it('データ更新成功時に該当 log が存在しない場合は追記する', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        server.use(restIndex());
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(10);
        });

        server.use(
          rest.put(apiHost('/lifelogs/:id'), async (req, res, ctx) => {
            const data = await req.json().then((body) => body.data);
            return res(ctx.status(200), ctx.json(data));
          })
        );
        const log = lifelog({ id: 99 });
        act(() => {
          result.current.updateLog(log);
        });
        await waitFor(() => {
          const afterLog = result.current.logs.find((l) => {
            return l.id === log.id;
          });
          expect(afterLog).toEqual(log);
        });
      });

      it('認証エラー以外で失敗時は logs に変化はない', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        server.use(restIndex(5, 9));
        act(() => {
          result.current.loadLogs();
        });
        let beforeLog: Lifelog;
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(9);
          beforeLog = result.current.logs[5];
        });

        server.use(
          rest.put(apiHost('/lifelogs/:id'), async (req, res, ctx) => {
            return res(ctx.status(500));
          })
        );
        await expect(
          result.current.updateLog(lifelog())
        ).rejects.toBeInstanceOf(AxiosError);
        await waitFor(() => {
          expect(result.current.logs).toHaveLength(9);
          const afterLog = result.current.logs[5];
          expect(afterLog).toEqual(beforeLog);
        });
      });
    });

    describe('deleteLog 検証', () => {
      it.todo('データ削除成功時に該当 log も削除している');
      it.todo('データ削除成功時に該当 log が ない場合も正常にレンダリングする');
      it.todo('認証エラー以外で失敗時は logs に変化はない');
    });

    describe('clear 検証', () => {
      it.todo('logs が初期化されている');
    });
  });
});
