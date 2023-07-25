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
import { lifelogs } from '@lib/faker/lifelog';
import { AxiosError } from 'axios';

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

    const server = setupServer(
      rest.get(hostURL + '/lifelogs', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(lifelogs(2)));
      })
    );
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
          expect(result.current.logs).toHaveLength(2);
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
        server.use(
          rest.get(hostURL + '/lifelogs', (req, res, ctx) => {
            const page = req.url.searchParams.get('page');
            let logs: Lifelog[];
            switch (page) {
              case null:
              case '0':
              case '1':
                logs = lifelogs(10, 0);
                break;
              case '2':
                logs = lifelogs(10, 10);
                break;
              default:
                logs = [];
                break;
            }
            return res(ctx.status(200), ctx.json(logs));
          })
        );
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
        server.use(
          rest.get(hostURL + '/lifelogs', (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(lifelogs(0)));
          })
        );
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
      it.todo('呼び出されるごとに logs が上書きされる');
      it.todo('loadLogs で続きのデータを取得できる');
      it.todo('データが 0 件でも正常にレンダリングする');
    });

    describe('newLog 検証', () => {
      it.todo('空の Lifelog が取得できる');
    });

    describe('createLogByContext 検証', () => {
      it.todo('データ作成成功時に log を追記する');
      it.todo('認証エラー以外で失敗時は logs に変化はない');
    });

    describe('updateLog 検証', () => {
      it.todo('データ更新成功時に該当 log も更新されている');
      it.todo('データ更新成功時に該当 log が存在しない場合は追記する');
      it.todo('認証エラー以外で失敗時は logs に変化はない');
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
