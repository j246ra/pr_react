import { mockUseUser } from '@src/tests/baseProviders';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import Defs from '@lib/consts';
import { baseUrl } from '@lib/api/client';
import { act, renderHook, waitFor } from '@testing-library/react';
import useAuthApi from '@src/hooks/useAuthApi';
import { COMMON, CONST } from '@lib/consts/common';
import { InvalidTokenError } from '@src/errors/InvalidTokenError';

let mockUser = { email: 'def@example.com', sessionId: '' };

const URL = `${baseUrl}/${Defs.API.VERSION}${Defs.API.SESSION.ENDPOINT.USER}`;

describe('useAuthApi', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      getHeaders: jest.fn(),
      saveUser: jest.fn(),
      sessionIdIsBlank: jest.fn().mockReturnValue(true),
      validSessionId: jest.fn().mockReturnValue(false),
    });
  });

  describe('正常系', () => {
    const responseSessionId = 'session-id';
    const server = setupServer(
      http.put(URL, () => {
        return new HttpResponse(null, {
          status: 200,
          headers: { 'session-id': responseSessionId },
        });
      })
    );
    beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
    beforeEach(() => server.resetHandlers());
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
      const server = setupServer(
        http.put(URL, () => {
          HttpResponse.json(
            {
              errors: ['error message 1', 'error message 2'],
            },
            { status: 400 }
          );
        })
      );
      beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
      beforeEach(() => server.resetHandlers());
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
        http.put(URL, () => {
          return HttpResponse.error();
        })
      );
      beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
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
    describe('session-idが一致しない場合', () => {
      const responseSessionId = 'session-id';
      const server = setupServer(
        http.put(URL, () => {
          return new HttpResponse(null, {
            status: 200,
            headers: { 'session-id': responseSessionId },
          });
        })
      );
      beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
      afterEach(() => server.resetHandlers());
      afterAll(() => server.close());
      it('InvalidTokenErrorをthrowしている', async () => {
        mockUseUser().sessionIdIsBlank.mockReturnValue(false);
        mockUseUser().validSessionId.mockReturnValue(false);
        const { result } = renderHook(useAuthApi);
        await act(async () => {
          await expect(
            result.current.updateUser({
              email: mockUser.email,
              password: 'password',
            })
          ).rejects.toThrow(
            new InvalidTokenError(CONST.COMMON.MESSAGE.ERROR.SESSION_CONFLICT)
          );
        });
        expect(mockUseUser().validSessionId).toHaveBeenCalledWith(
          responseSessionId
        );
      });
    });
  });
});
