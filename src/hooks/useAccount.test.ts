import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { renderHook, waitFor } from '@testing-library/react';
import useAccount from '@src/hooks/useAccount';
import useAuthApi from '@src/hooks/useAuthApi';
import notify from '@lib/toast';
import { ACCOUNT_UPDATE, LOGIN, LOGOUT } from '@lib/consts/component';
import { mockNavigator } from '@src/tests/common';
import { ROUTES } from '@lib/consts/common';
import { useLifelog } from '@providers/LifelogProvider';
import { INVALID_MESSAGES } from '@validators/validator';

jest.mock('@src/hooks/useAuthApi');
const mockUseAuthApi = useAuthApi as jest.MockedFunction<any>;
jest.mock('@lib/toast');
const mockNotify = jest.mocked(notify);
jest.mock('@providers/LifelogProvider');
const mockUseLifelog = useLifelog as jest.MockedFunction<any>;

describe('useAccount', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      removeHeaders: jest.fn(),
    });
    mockUseUser.mockReturnValue({
      createUser: jest.fn(),
      clearUser: jest.fn(),
    });
    mockUseAuthApi.mockReturnValue({
      signIn: jest.fn().mockResolvedValue({
        status: 200,
      }),
      updateUser: jest.fn().mockResolvedValue({ status: 200 }),
    });
    mockUseLifelog.mockReturnValue({
      clear: jest.fn(),
    });
  });
  describe('login リクエストが', () => {
    const params: [string, string] = ['test@example.com', 'password'];
    it('成功した場合はメッセージを通知している', async () => {
      const { result } = renderHook(useAccount);
      result.current.login(...params);
      await waitFor(() => {
        expect(mockUseAuthApi().signIn).toHaveBeenCalledTimes(1);
        expect(mockUseAuthApi().signIn).toHaveBeenCalledWith(...params);
        expect(mockNotify.success).toHaveBeenCalledWith(LOGIN.MESSAGE.SUCCESS);
        expect(mockNotify.success).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledWith(ROUTES.LIFELOGS);
        expect(mockNavigator).toHaveBeenCalledTimes(1);
      });
    });
    describe('失敗した場合', () => {
      it('認証エラーの場合にメッセージを通知している', async () => {
        mockUseAuthApi().signIn = jest.fn().mockRejectedValue({
          response: {
            status: 401,
          },
        });
        const { result } = renderHook(useAccount);
        result.current.login(...params);
        await waitFor(() => {
          expect(mockUseAuthApi().signIn).toHaveBeenCalledTimes(1);
          expect(mockUseAuthApi().signIn).toHaveBeenCalledWith(...params);
          expect(mockNotify.error).toHaveBeenCalledTimes(1);
          expect(mockNotify.error).toHaveBeenCalledWith(
            LOGIN.MESSAGE.ERROR.STATUS_401
          );
          expect(mockNavigator).not.toHaveBeenCalled();
        });
      });
      it('それ以外のエラーの場合にメッセージを通知している', async () => {
        mockUseAuthApi().signIn = jest.fn().mockRejectedValue({
          response: {
            status: 500,
          },
        });
        const { result } = renderHook(useAccount);
        result.current.login(...params);
        await waitFor(() => {
          expect(mockUseAuthApi().signIn).toHaveBeenCalledTimes(1);
          expect(mockUseAuthApi().signIn).toHaveBeenCalledWith(...params);
          expect(mockNotify.error).toHaveBeenCalledTimes(1);
          expect(mockNotify.error).toHaveBeenCalledWith(
            LOGIN.MESSAGE.ERROR.NORMAL
          );
          expect(mockNavigator).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('logout ', () => {
    it('リクエスト成功時', async () => {
      mockUseAuthApi.mockReturnValue({
        signOut: jest.fn().mockResolvedValue({ status: 200 }),
      });
      const { result } = renderHook(useAccount);
      result.current.logout();
      await waitFor(() => {
        expect(mockUseUser().clearUser).toHaveBeenCalledTimes(1);
        expect(mockUseLifelog().clear).toHaveBeenCalledTimes(1);
        expect(mockUseSession().removeHeaders).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledWith(ROUTES.LOGIN);
        expect(mockNotify.success).toHaveBeenCalledTimes(1);
        expect(mockNotify.success).toHaveBeenCalledWith(LOGOUT.MESSAGE.SUCCESS);
      });
    });
    it('リクエスト失敗時', async () => {
      mockUseAuthApi.mockReturnValue({
        signOut: jest.fn().mockRejectedValue({ response: { status: 500 } }),
      });
      const { result } = renderHook(useAccount);
      result.current.logout();
      await waitFor(() => {
        expect(mockUseUser().clearUser).not.toHaveBeenCalled();
        expect(mockUseLifelog().clear).not.toHaveBeenCalled();
        expect(mockUseSession().removeHeaders).not.toHaveBeenCalled();
        expect(mockNavigator).not.toHaveBeenCalled();
        expect(mockNotify.error).toHaveBeenCalledTimes(1);
        expect(mockNotify.error).toHaveBeenCalledWith(LOGOUT.MESSAGE.ERROR);
      });
    });
  });

  describe('update', () => {
    const params: [string, string, string] = [
      'test@example.com',
      'password01',
      'password01',
    ];
    it('リクエスト成功時', async () => {
      const { result } = renderHook(useAccount);
      result.current.update(...params);
      await waitFor(() => {
        expect(mockUseAuthApi().updateUser).toHaveBeenCalled();
        expect(mockNavigator).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledWith('/');
        expect(mockNotify.success).toHaveBeenCalledTimes(1);
        expect(mockNotify.success).toHaveBeenCalledWith(
          ACCOUNT_UPDATE.MESSAGE.SUCCESS
        );
      });
    });
    it('リクエスト失敗時', async () => {
      mockUseAuthApi.mockReturnValue({
        updateUser: jest.fn().mockRejectedValue({ response: { status: 500 } }),
      });
      const { result } = renderHook(useAccount);
      result.current.update(...params);
      await waitFor(() => {
        expect(mockUseAuthApi().updateUser).toHaveBeenCalled();
        expect(mockNavigator).not.toHaveBeenCalled();
        expect(mockNotify.error).toHaveBeenCalledTimes(1);
        expect(mockNotify.error).toHaveBeenCalledWith(
          ACCOUNT_UPDATE.MESSAGE.ERROR
        );
      });
    });
    it('バリデーションエラー時', async () => {
      params[2] = 'passwrod01';
      const { result } = renderHook(useAccount);
      result.current.update(...params);
      await waitFor(() => {
        expect(mockUseAuthApi().updateUser).not.toHaveBeenCalled();
        expect(mockNotify.error).toHaveBeenCalledTimes(1);
        expect(mockNotify.error).toHaveBeenCalledWith(
          INVALID_MESSAGES.PASSWORD_NO_MATCH
        );
      });
    });
  });
});
