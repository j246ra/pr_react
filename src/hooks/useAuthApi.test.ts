import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { setupServer } from 'msw/node';
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
import { COMMON } from '@lib/consts/common';

let mockUser = { email: 'def@example.com', sessionId: '' };

const URL = `${baseUrl}/${Defs.API.VERSION}${Defs.API.SESSION.ENDPOINT.USER}`;

describe('useAuthApi', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      getHeaders: jest.fn(),
    });
    mockUseUser.mockReturnValue({
      saveUser: jest.fn(),
      sessionIdIsBlank: jest.fn().mockReturnValue(true),
      validSessionId: jest.fn().mockReturnValue(false),
    });
  });
  const createServer = (r: ResponseTransformer<DefaultBodyType, any>) => {
    return setupServer(
      rest.put(URL, (req, res) => {
        return res(r);
      })
    );
  };

  describe('正常系', () => {
    const responseSessionId = 'session-id';
    const response = (): ResponseTransformer<DefaultBodyType, any> => {
      return compose(
        context.status(200),
        context.set('session-id', responseSessionId)
      );
    };
    const server = createServer(response());
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    it('既存ユーザーの場合は validSessionId が呼び出される', async () => {
      mockUseUser().sessionIdIsBlank.mockReturnValue(false);
      mockUseUser().validSessionId.mockReturnValue(true);
      const { result } = renderHook(useAuthApi);
      const { updateUser } = result.current;
      act(() => {
        updateUser({ email: 'test@example.com', password: 'password' });
      });
      await waitFor(() => {
        expect(mockUseUser().validSessionId).toHaveBeenCalled();
      });
    });
    it('新しいユーザーの場合は saveUser が呼び出される', async () => {
      const { result } = renderHook(useAuthApi);
      const { updateUser } = result.current;
      act(() => {
        updateUser({ email: 'email', password: 'password' });
      });
      await waitFor(() => {
        expect(mockUseUser().saveUser).toHaveBeenCalled();
      });
    });
  });

  describe('異常系', () => {
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
        const res = result.current.updateUser({
          email: mockUser.email,
          password: 'password',
        });
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
        rest.put(URL, (req, res) => {
          return res.networkError('');
        })
      );
      beforeAll(() => server.listen());
      afterEach(() => server.resetHandlers());
      afterAll(() => server.close());
      it('固定エラーメッセージが通知されている', async () => {
        const { result } = renderHook(useAuthApi);
        const res = result.current.updateUser({
          email: mockUser.email,
          password: 'password',
        });
        await waitFor(() => {
          expect(res).rejects.toHaveProperty('messages', [
            `${COMMON.MESSAGE.ERROR.GENERAL}(Network Error)`,
          ]);
        });
      });
    });
  });
});
