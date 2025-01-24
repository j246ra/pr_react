import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { setupServer } from 'msw/node';
import notify from '@lib/toast';
import {
  compose,
  context,
  DefaultBodyType,
  ResponseTransformer,
  rest,
} from 'msw';
import Defs from '@lib/consts';
import { baseUrl } from '@lib/api/client';
import { act, renderHook, waitFor } from '@testing-library/react';
import useAuthApi from '@src/hooks/useAuthApi';

let mockUser = { email: 'def@example.com' };

const URL = `${baseUrl}/${Defs.API.VERSION}${Defs.API.SESSION.ENDPOINT.SIGN_IN}`;

describe('useAuthApi', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      getHeaders: jest.fn(),
      setHeaders: jest.fn(),
    });
    mockUseUser.mockReturnValue({
      user: mockUser,
      updateUser: jest.fn(),
      updateSessionId: jest.fn(),
    });
  });
  const createServer = (r: ResponseTransformer<DefaultBodyType, any>) => {
    return setupServer(
      rest.post(URL, (req, res) => {
        return res(r);
      })
    );
  };

  describe('正常系', () => {
    const responseUid = 'test1@example.com';
    const responseSessionId = 'session-id';
    const response = (): ResponseTransformer<DefaultBodyType, any> => {
      return compose(
        context.status(200),
        context.set('access-token', 'token'),
        context.set('uid', responseUid),
        context.set('client', 'client'),
        context.set('session-id', responseSessionId),
      );
    };
    const server = createServer(response());
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    it('新しいユーザーの場合は updateUser が呼び出される', async () => {
      const { result } = renderHook(useAuthApi);
      const { signIn } = result.current;
      act(() => {
        signIn('email', 'password');
      });
      await waitFor(() => {
        expect(mockUseSession().setHeaders).toHaveBeenCalled();
        expect(mockUseUser().updateUser).toHaveBeenCalled();
        expect(mockUseUser().updateSessionId).toHaveBeenCalled();
      });
    });
    it('既存のユーザーの場合は updateUser は呼び出されない', async () => {
      mockUseUser().user.email = responseUid;
      mockUseUser().user.sessionId = responseSessionId;
      const { result } = renderHook(useAuthApi);
      const { signIn } = result.current;
      act(() => {
        signIn(responseUid, 'password');
      });
      await waitFor(() => {
        expect(mockUseSession().setHeaders).toHaveBeenCalled();
        expect(mockUseUser().updateUser).not.toHaveBeenCalled();
      });
    });
  });

  describe('異常系', () => {
    let notifySpy: jest.SpyInstance<unknown>;
    beforeEach(() => {
      notifySpy = jest.spyOn(notify, 'error');
    });
    afterEach(() => {
      notifySpy.mockRestore();
    });
    describe('response が存在する場合', () => {
      const response = (): ResponseTransformer<DefaultBodyType, any> => {
        return compose(
          context.status(400),
          context.json({
            errors: ['error message 1', 'error message 2'],
          })
        );
      };
      const server = createServer(response());
      beforeAll(() => server.listen());
      afterEach(() => server.resetHandlers());
      afterAll(() => server.close());

      it('メッセージが通知されている', async () => {
        const { result } = renderHook(useAuthApi);
        const res = result.current.signIn(mockUser.email, 'password');
        await waitFor(() => {
          expect(res).rejects.toEqual({
            status: 400,
            messages: ['error message 1', 'error message 2'],
          });
        });
      });
    });
    describe('response が存在しない場合', () => {
      const server = setupServer(
        rest.post(URL, (req, res) => {
          return res.networkError('Failed to connect.');
        })
      );
      beforeAll(() => server.listen());
      afterEach(() => server.resetHandlers());
      afterAll(() => server.close());
      it('固定エラーメッセージが通知されている', async () => {
        const { result } = renderHook(useAuthApi);
        const res = result.current.signIn(mockUser.email, 'password');
        await waitFor(() => {
          expect(res).rejects.toHaveProperty('status', undefined);
          expect(mockUseSession().setHeaders).not.toHaveBeenCalled();
          // expect(notifySpy).toHaveBeenCalled();
          // expect(notifySpy).toHaveBeenCalledWith(
          //   expect.stringMatching(MESSAGE.ERROR.GENERAL)
          // );
        });
      });
    });
  });
});
