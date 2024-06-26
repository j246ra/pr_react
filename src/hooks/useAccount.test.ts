import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { renderHook, waitFor } from '@testing-library/react';
import useAccount from '@src/hooks/useAccount';
import useAuthApi from '@src/hooks/useAuthApi';
import notify from '@lib/toast';
import {
  ACCOUNT_DELETE,
  ACCOUNT_UPDATE,
  LOGIN,
  LOGOUT,
  PASSWORD_EDIT,
  PASSWORD_FORGET,
  SIGN_UP,
} from '@lib/consts/component';
import { mockNavigator } from '@src/tests/common';
import { ROUTES } from '@lib/consts/common';
import { useLifelog } from '@providers/LifelogProvider';
import { INVALID_MESSAGES } from '@validators/validator';
import { expect } from '@storybook/jest';

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
      signIn: jest.fn().mockResolvedValue({ status: 200 }),
      signOut: jest.fn().mockResolvedValue({ status: 200 }),
      updateUser: jest.fn().mockResolvedValue({ status: 200 }),
      passwordReset: jest.fn().mockResolvedValue({ state: 200 }),
      passwordForget: jest.fn().mockResolvedValue({ status: 200 }),
      signUp: jest.fn().mockResolvedValue({ status: 200 }),
      deleteUser: jest.fn().mockResolvedValue({ status: 200 }),
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
        mockUseAuthApi().signIn.mockRejectedValue({
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
        mockUseAuthApi().signIn.mockRejectedValue({
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
      mockUseAuthApi().signOut.mockRejectedValue({ response: { status: 500 } });
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
      mockUseAuthApi().updateUser.mockRejectedValue({
        response: { status: 500 },
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
      params[2] = 'password-666';
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

  describe('passwordChange', () => {
    const password = 'password-0123';
    it('リクエスト成功時', async () => {
      const { result } = renderHook(useAccount);
      result.current.passwordChange(password, password);
      await waitFor(() => {
        expect(mockUseAuthApi().passwordReset).toHaveBeenCalledTimes(1);
        expect(mockUseAuthApi().passwordReset).toHaveBeenCalledWith(
          password,
          password
        );
        expect(mockNotify.success).toHaveBeenCalledTimes(1);
        expect(mockNotify.success).toHaveBeenCalledWith(
          PASSWORD_EDIT.MESSAGE.SUCCESS
        );
        expect(mockNavigator).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledWith('/');
      });
    });
    it('リクエスト失敗時', async () => {
      mockUseAuthApi().passwordReset.mockRejectedValue({
        response: { status: 500 },
      });
      const { result } = renderHook(useAccount);
      result.current.passwordChange(password, password);
      await waitFor(() => {
        expect(mockUseAuthApi().passwordReset).toHaveBeenCalledTimes(1);
        expect(mockUseAuthApi().passwordReset).toHaveBeenCalledWith(
          password,
          password
        );
        expect(mockNotify.error).toHaveBeenCalledTimes(1);
        expect(mockNotify.error).toHaveBeenCalledWith(
          PASSWORD_EDIT.MESSAGE.ERROR
        );
        expect(mockNotify.success).not.toHaveBeenCalled();
        expect(mockNavigator).not.toHaveBeenCalled();
      });
    });
    it('バリデーションエラー時', async () => {
      const { result } = renderHook(useAccount);
      result.current.passwordChange(password, 'password-9999');
      await waitFor(() => {
        expect(mockNotify.error).toHaveBeenCalledTimes(1);
        expect(mockNotify.error).toHaveBeenCalledWith(
          INVALID_MESSAGES.PASSWORD_NO_MATCH
        );
        expect(mockUseAuthApi().passwordReset).not.toHaveBeenCalled();
      });
    });
  });

  describe('passwordForget', () => {
    const email = 'test@example.com';
    it('リクエスト成功時', async () => {
      const { result } = renderHook(useAccount);
      result.current.passwordForget(email);
      await waitFor(() => {
        expect(mockUseAuthApi().passwordForget).toHaveBeenCalledTimes(1);
        expect(mockUseAuthApi().passwordForget).toHaveBeenCalledWith(email);
        expect(mockNotify.success).toHaveBeenCalledTimes(1);
        expect(mockNotify.success).toHaveBeenCalledWith(
          PASSWORD_FORGET.MESSAGE.SUCCESS
        );
        expect(mockNavigator).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledWith(
          ROUTES.RESET_MAIL_SEND_SUCCESS
        );
      });
    });
    describe('リクエスト失敗時', () => {
      it('Not Found(404) の場合、成功メッセージを表示する', async () => {
        mockUseAuthApi().passwordForget.mockRejectedValue({
          response: { status: 404 },
        });
        const { result } = renderHook(useAccount);
        result.current.passwordForget(email);
        await waitFor(() => {
          expect(mockUseAuthApi().passwordForget).toHaveBeenCalledWith(email);
          expect(mockNotify.success).toHaveBeenCalledWith(
            PASSWORD_FORGET.MESSAGE.SUCCESS
          );
          expect(mockNavigator).toHaveBeenCalledWith(
            ROUTES.RESET_MAIL_SEND_SUCCESS
          );
        });
      });
      it('404 以外のエラーの場合はエラーメッセージを表示する', async () => {
        mockUseAuthApi().passwordForget.mockRejectedValue({
          response: { status: 500 },
        });
        const { result } = renderHook(useAccount);
        result.current.passwordForget(email);
        await waitFor(() => {
          expect(mockUseAuthApi().passwordForget).toHaveBeenCalledTimes(1);
          expect(mockUseAuthApi().passwordForget).toHaveBeenCalledWith(email);
          expect(mockNotify.error).toHaveBeenCalledTimes(1);
          expect(mockNotify.error).toHaveBeenCalledWith(
            PASSWORD_FORGET.MESSAGE.ERROR
          );
        });
      });
    });
  });

  describe('signUp', () => {
    const email = 'test@example.com';
    const password = 'password-7777';
    it('リクエスト成功時', async () => {
      const { result } = renderHook(useAccount);
      result.current.signUp(email, password);
      await waitFor(() => {
        expect(mockUseAuthApi().signUp).toHaveBeenCalledTimes(1);
        expect(mockUseAuthApi().signUp).toHaveBeenCalledWith(email, password);
        expect(mockNotify.success).toHaveBeenCalledTimes(1);
        expect(mockNotify.success).toHaveBeenCalledWith(
          SIGN_UP.MESSAGE.SUCCESS
        );
        expect(mockNavigator).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledWith(ROUTES.LIFELOGS);
      });
    });
    it('リクエスト失敗時', async () => {
      mockUseAuthApi().signUp.mockRejectedValue({ response: { status: 500 } });
      const { result } = renderHook(useAccount);
      result.current.signUp(email, password);
      await waitFor(() => {
        expect(mockUseAuthApi().signUp).toHaveBeenCalledTimes(1);
        expect(mockUseAuthApi().signUp).toHaveBeenCalledWith(email, password);
        expect(mockNotify.error).toHaveBeenCalledTimes(1);
        expect(mockNotify.error).toHaveBeenCalledWith(SIGN_UP.MESSAGE.ERROR);
        expect(mockUseUser().clearUser).toHaveBeenCalledTimes(1);
        expect(mockUseSession().removeHeaders).toHaveBeenCalledTimes(1);
      });
    });
    it('バリデーションエラー時', async () => {
      const { result } = renderHook(useAccount);
      result.current.signUp(email, 'a');
      await waitFor(() => {
        expect(mockUseAuthApi().signUp).not.toHaveBeenCalled();
        expect(mockNotify.error).toHaveBeenCalledWith(
          INVALID_MESSAGES.PASSWORD_LENGTH
        );
      });
    });
  });

  describe('remove', () => {
    it('リクエスト成功時', async () => {
      const { result } = renderHook(useAccount);
      result.current.remove();
      await waitFor(() => {
        expect(mockUseAuthApi().deleteUser).toHaveBeenCalledTimes(1);
        expect(mockNotify.success).toHaveBeenCalledTimes(1);
        expect(mockNotify.success).toHaveBeenCalledWith(
          ACCOUNT_DELETE.MESSAGE.SUCCESS
        );
        expect(mockUseUser().clearUser).toHaveBeenCalledTimes(1);
        expect(mockUseSession().removeHeaders).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledWith(ROUTES.LOGIN);
      });
    });
    it('リクエスト失敗時', async () => {
      mockUseAuthApi().deleteUser.mockRejectedValue({
        response: { status: 500 },
      });
      const { result } = renderHook(useAccount);
      result.current.remove();
      await waitFor(() => {
        expect(mockUseAuthApi().deleteUser).toHaveBeenCalledTimes(1);
        expect(mockNotify.error).toHaveBeenCalledTimes(1);
        expect(mockNotify.error).toHaveBeenCalledWith(
          ACCOUNT_DELETE.MESSAGE.ERROR
        );
        expect(mockUseUser().clearUser).not.toHaveBeenCalled();
        expect(mockUseSession().removeHeaders).not.toHaveBeenCalled();
        expect(mockNavigator).not.toHaveBeenCalled();
      });
    });
  });
});
