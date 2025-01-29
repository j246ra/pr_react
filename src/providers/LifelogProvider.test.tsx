import React from 'react';
import { render, renderHook, waitFor, act } from '@testing-library/react';
import LifelogProvider, {
  Lifelog,
  LifelogProviderProps,
  useLifelog,
} from '@providers/LifelogProvider';
import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { setupServer } from 'msw/node';
import { lifelog } from '@lib/faker/lifelog';
import { AxiosError } from 'axios';
import { DATETIME_FULL, days } from '@lib/dateUtil';
import lifelogApiMocks from '@src/tests/lifelogApiMocks';
import { COMMON, LIFELOG_API_MOCKS, API } from '@lib/consts/common';
import notify from '@lib/toast';

let mockSetHeaders: jest.SpyInstance<unknown>;
let mockClearUser: jest.SpyInstance<unknown>;
let notifySpy: jest.SpyInstance<unknown>;

const {
  index: restIndex,
  create: restCreate,
  update: restUpdate,
  destroy: restDelete,
} = lifelogApiMocks();

const setUpMyLocation = () => {
  const { location } = window;
  delete (window as any).location;
  window.location = { ...location, reload: () => {} };
};

describe('LifelogProvider', () => {
  beforeEach(() => {
    mockSetHeaders = jest.fn();
    mockClearUser = jest.fn();
    mockUseSession.mockReturnValue({
      getHeaders: jest.fn().mockReturnValue({
        uid: 'test@example.com',
      }),
      setHeaders: mockSetHeaders,
    });
    mockUseUser.mockReturnValue({
      user: { email: 'test@example.com' },
      clearUser: mockClearUser,
    });
    notifySpy = jest.spyOn(notify, 'error');
  });
  afterEach(() => {
    mockSetHeaders.mockClear();
    notifySpy.mockClear();
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
      restIndex(),
      restCreate(),
      restUpdate(),
      restDelete()
    );
    beforeAll(() => server.listen());
    beforeEach(() => server.resetHandlers());
    afterAll(() => server.close());

    describe('Axios Interceptor with loadLogs().', () => {
      it('status 200 の場合、setHeaders() にてセッション情報を更新する', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });

        expect(result.current.lifelogs).toHaveLength(0);
        act(() => {
          result.current.loadLogs('error message');
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
          expect(mockSetHeaders).toHaveBeenCalled();
        });
      });

      it('status 401 の場合、clearUser() にてセッションを初期化する', async () => {
        server.use(restIndex({ status: 401 }));
        const { result } = renderHook(() => useLifelog(), { wrapper });

        expect(result.current.lifelogs).toHaveLength(0);
        act(() => {
          expect(result.current.loadLogs()).rejects.toBeInstanceOf(AxiosError);
        });

        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(0);
          expect(mockClearUser).toHaveBeenCalled();
          expect(notifySpy).toHaveBeenCalledWith(COMMON.MESSAGE.ERROR.EXPIRED);
        });
      });

      it('サーバーエラー(50x)の場合、AxiosError を返却する', async () => {
        server.use(restIndex({ status: 500 }));
        const { result } = renderHook(() => useLifelog(), { wrapper });

        expect(result.current.lifelogs).toHaveLength(0);
        act(() => {
          expect(result.current.loadLogs()).rejects.toBeInstanceOf(AxiosError);
        });

        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(0);
          expect(mockClearUser).not.toHaveBeenCalled();
          expect(notifySpy).toHaveBeenCalledWith(
            COMMON.MESSAGE.ERROR.STATUS_5XX
          );
        });
      });

      describe('想定外の status エラー', () => {
        beforeEach(() => {
          server.use(restIndex({ status: 499 }));
        });
        it('メッセージ未指定の場合デフォルトメッセージが表示される', async () => {
          const { result } = renderHook(() => useLifelog(), { wrapper });

          expect(result.current.lifelogs).toHaveLength(0);
          act(() => {
            expect(result.current.loadLogs()).rejects.toBeInstanceOf(
              AxiosError
            );
          });

          await waitFor(() => {
            expect(result.current.lifelogs).toHaveLength(0);
            expect(mockClearUser).not.toHaveBeenCalled();
            expect(notifySpy).toHaveBeenCalledWith(
              COMMON.MESSAGE.ERROR.GENERAL
            );
          });
        });
        it('指定メッセージが表示される', async () => {
          const { result } = renderHook(() => useLifelog(), { wrapper });

          expect(result.current.lifelogs).toHaveLength(0);
          act(() => {
            expect(
              result.current.loadLogs('エラーなのです。')
            ).rejects.toBeInstanceOf(AxiosError);
          });

          await waitFor(() => {
            expect(result.current.lifelogs).toHaveLength(0);
            expect(mockClearUser).not.toHaveBeenCalled();
            expect(notifySpy).toHaveBeenCalledWith('エラーなのです。');
          });
        });
      });

      describe('status が存在しない場合', () => {
        beforeEach(() => {
          server.use(restIndex({ status: null }));
        });
        it('エラーメッセージが表示される', async () => {
          const { result } = renderHook(() => useLifelog(), { wrapper });

          expect(result.current.lifelogs).toHaveLength(0);
          act(() => {
            expect(result.current.loadLogs()).rejects.toBeInstanceOf(
              AxiosError
            );
          });

          await waitFor(() => {
            expect(notifySpy).toHaveBeenCalledWith(
              COMMON.MESSAGE.ERROR.GENERAL
            );
          });
        });
      });
    });

    describe('loadLogs 検証', () => {
      it('複数回呼び出すごとに lifelogs にデータが追記されている', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        expect(result.current.lifelogs).toHaveLength(0);
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });
        await act(async () => {
          await result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(20);
        });
        await act(async () => {
          await result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(20);
        });
      });

      it('データが 0 件の場合でも正常にレンダリングする', async () => {
        server.use(restIndex({ maxPage: 1, length: 0 }));
        const { result } = renderHook(() => useLifelog(), { wrapper });
        expect(result.current.lifelogs).toHaveLength(0);
        await act(async () => {
          await result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(0);
        });
      });
    });

    describe('searchLogs 検証', () => {
      it('呼び出されるごとに lifelogs が上書きされる', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.searchLogs('TEST1');
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });
        await act(async () => {
          await result.current.searchLogs('TEST2');
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });
        await act(async () => {
          await result.current.searchLogs('TEST3');
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });
      });
      it('loadLogs で続きのデータを取得できる', async () => {
        server.use(restIndex({ maxPage: 3 }));
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.searchLogs('TEST1');
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(20);
        });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(30);
          expect(result.current.isTerminated).toEqual(false);
        });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(30);
          expect(result.current.isTerminated).toEqual(true);
        });
      });
      it('データが 0 件でも正常にレンダリングする', async () => {
        server.use(restIndex({ maxPage: 1, length: 0 }));
        const { result } = renderHook(() => useLifelog(), { wrapper });
        expect(result.current.lifelogs).toHaveLength(0);
        await act(async () => {
          await result.current.searchLogs('TEST999');
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(0);
        });
      });
      it('データが 0 件後に、別の条件で複数ページ分データ取得できる', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        expect(result.current.lifelogs).toHaveLength(0);
        expect(result.current.isTerminated).toEqual(false);
        act(() => {
          result.current.searchLogs(LIFELOG_API_MOCKS.PARAMS.WORD.NO_DATA);
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(0);
          expect(result.current.isTerminated).toEqual(true);
        });
        act(() => {
          result.current.searchLogs('');
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
          expect(result.current.isTerminated).toEqual(false);
        });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(20);
          expect(result.current.isTerminated).toEqual(false);
        });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(20);
          expect(result.current.isTerminated).toEqual(true);
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
          detail: null,
          startedAt: '',
          finishedAt: null,
          createdAt: '',
          updatedAt: '',
          isDateChanged: false,
        });
      });
    });

    describe('createLogByContext 検証', () => {
      it('データ作成成功時に log を追記する', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.createLogByContext('My name is ELITE.');
        });
        await waitFor(() => {
          expect(result.current.lifelogs[0].action).toEqual('My');
          expect(result.current.lifelogs[0].detail).toEqual('name is ELITE.');
        });
      });
      it('認証エラー以外で失敗時は lifelogs に変化はない', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        server.use(restIndex(), restCreate({ status: 500 }));
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });
        await expect(
          result.current.createLogByContext('STELLAR STELLAR.')
        ).rejects.toBeInstanceOf(AxiosError);
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });
      });
    });

    describe('updateLog 検証', () => {
      it('データ更新成功時に該当 log も更新されている', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.loadLogs();
        });
        let beforeLog: Lifelog;
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
          beforeLog = result.current.lifelogs[5];
        });
        act(() => {
          result.current.updateLog(
            lifelog({ ...beforeLog, action: 'ACTION', detail: 'DETAIL' })
          );
        });
        await waitFor(() => {
          const afterLog = result.current.lifelogs[5];
          expect(afterLog.id).toEqual(beforeLog.id);
          expect(afterLog.action).toEqual('ACTION');
          expect(afterLog.detail).toEqual('DETAIL');
          expect(afterLog.createdAt).toEqual(beforeLog.createdAt);
        });
      });
      it('開始日時変更時に該当 log が正しくソートされている', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });
        const logs = result.current.lifelogs;
        const pastOneYear = days(logs[9].startedAt)
          .subtract(1, 'year')
          .format(DATETIME_FULL);
        const beforeLog = logs[5];
        act(() => {
          result.current.updateLog(
            lifelog({
              ...beforeLog,
              action: 'ACTION',
              detail: 'DETAIL',
              startedAt: pastOneYear,
            })
          );
        });
        await waitFor(() => {
          const afterIndex = result.current.lifelogs.findIndex((log) => {
            return log.id === beforeLog.id;
          });
          const afterLog = result.current.lifelogs[afterIndex];

          expect(afterIndex).toEqual(9);
          expect(afterLog).not.toBeUndefined();
          expect(afterLog.action).toEqual('ACTION');
          expect(afterLog.detail).toEqual('DETAIL');
          expect(afterLog.startedAt).toEqual(pastOneYear);
        });
      });
      it('データ更新成功時に該当 log が存在しない場合は追記する', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });

        const log = lifelog({ id: 99 });
        act(() => {
          result.current.updateLog(log);
        });
        await waitFor(() => {
          const afterLog = result.current.lifelogs.find((l) => {
            return l.id === log.id;
          });
          expect({ ...afterLog, isDateChanged: false }).toEqual({
            ...log,
            isDateChanged: false,
          });
        });
      });

      it('認証エラー以外で失敗時は lifelogs に変化はない', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        server.use(restIndex({ maxPage: 5, length: 9 }), restUpdate(500));
        act(() => {
          result.current.loadLogs();
        });
        let beforeLog: Lifelog;
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(9);
          beforeLog = result.current.lifelogs[5];
        });
        await expect(
          result.current.updateLog(lifelog())
        ).rejects.toBeInstanceOf(AxiosError);
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(9);
          const afterLog = result.current.lifelogs[5];
          expect(afterLog).toEqual(beforeLog);
        });
      });
    });

    describe('finishLog 検証', () => {
      it('完了日時だけ更新されている', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.loadLogs();
        });
        let beforeLog: Lifelog;
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
          beforeLog = result.current.lifelogs[5];
        });
        act(() => {
          result.current.finishLog(beforeLog);
        });
        await waitFor(() => {
          const afterLog = result.current.lifelogs[5];
          expect(afterLog.id).toEqual(beforeLog.id);
          expect(afterLog.action).toEqual(beforeLog.action);
          expect(afterLog.detail).toEqual(beforeLog.detail);
          expect(afterLog.startedAt).toEqual(beforeLog.startedAt);
          expect(afterLog.createdAt).toEqual(beforeLog.createdAt);
          expect(afterLog.updatedAt).toEqual(beforeLog.updatedAt);
          expect(afterLog.finishedAt).not.toEqual(beforeLog.finishedAt);
        });
      });
    });

    describe('deleteLog 検証', () => {
      it('データ削除成功時に該当 log も削除している', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });
        const afterLog = result.current.lifelogs[5];
        act(() => {
          result.current.deleteLog(afterLog.id);
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(9);
          expect(
            result.current.lifelogs.find((log) => {
              return log.id === afterLog.id;
            })
          ).toBeUndefined();
        });
      });
      it('データ削除成功時に該当 log が ない場合も正常にレンダリングする', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });
        const deletedLog = lifelog({ id: 999 });
        await act(async () => {
          await result.current.deleteLog(deletedLog.id);
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
          expect(
            result.current.lifelogs.find((log) => {
              return log.id === deletedLog.id;
            })
          ).toBeUndefined();
        });
      });
      it('認証エラー以外で失敗時は lifelogs に変化はない', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        server.use(restIndex(), restDelete(500));
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });
        const deletedLog = result.current.lifelogs[4];
        await expect(
          result.current.deleteLog(deletedLog.id)
        ).rejects.toBeInstanceOf(AxiosError);
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
          const afterLog = result.current.lifelogs[4];
          expect(afterLog).toEqual(deletedLog);
        });
      });
    });

    describe('clear 検証', () => {
      it('lifelogs が初期化されている', async () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(10);
        });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(20);
        });
        act(() => {
          result.current.loadLogs();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(20);
          expect(result.current.isTerminated).toEqual(true);
        });
        act(() => {
          result.current.clear();
        });
        await waitFor(() => {
          expect(result.current.lifelogs).toHaveLength(0);
          expect(result.current.isTerminated).toEqual(false);
          expect(result.current.searchWord).toEqual('');
        });
      });
    });

    describe('sessionとuserのemail検証', () => {
      beforeEach(() => {
        mockUseUser().user.sessionId = 'XxSession-IDxX';
        setUpMyLocation();
      });
      it('一致しない場合はuserを初期化してリロードする', () => {
        const { result } = renderHook(() => useLifelog(), { wrapper });

        expect(result.current.lifelogs).toHaveLength(0);
        expect(
          act(() => result.current.loadLogs('error message'))
        ).rejects.toThrow(API.MESSAGE.ERROR.INVALID_TOKEN);
      });
    });
  });
});
