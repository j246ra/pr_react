import { mockUseUser } from '@src/tests/baseProviders';
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
import { ErrorBoundary } from 'react-error-boundary';
import { ReactNode } from 'react';

jest.mock('@src/hooks/useAuthApi');
const mockUseAuthApi = useAuthApi as jest.MockedFunction<any>;
jest.mock('@lib/toast');
const mockNotify = jest.mocked(notify);
jest.mock('@providers/LifelogProvider');
const mockUseLifelog = useLifelog as jest.MockedFunction<any>;

const wrapper = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary FallbackComponent={() => <div>Error occurred!</div>}>
    {children}
  </ErrorBoundary>
);

describe('useAccount', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      user: { email: 'test@test.com', sessionId: null },
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
      validate: jest.fn().mockResolvedValue({ status: 200 }),
    });
    mockUseLifelog.mockReturnValue({
      clear: jest.fn(),
    });
  });
  describe('login リクエストが', () => {
    const params: [string, string] = ['test@example.com', 'password'];
    it('成功した場合はメッセージを通知している', async () => {
      const { result } = renderHook(() => useAccount(), { wrapper });
      result.current.login(...params);
      await waitFor(() => {
        expect(mockUseAuthApi().signIn).toHaveBeenCalledTimes(1);
        expect(mockUseAuthApi().signIn).toHaveBeenCalledWith(...params);
        expect(mockNotify.success).toHaveBeenCalledWith(LOGIN.MESSAGE.SUCCESS);
        expect(mockNotify.success).toHaveBeenCalledTimes(1);
      });
    });
    describe('失敗した場合', () => {
      it('エラーメッセージがあればそれを通知している', async () => {
        mockUseAuthApi().signIn.mockRejectedValue({
          status: 401,
          message: 'error message',
        });
        const { result } = renderHook(() => useAccount(), { wrapper });
        result.current.login(...params);
        await waitFor(() => {
          expect(mockUseAuthApi().signIn).toHaveBeenCalledTimes(1);
          expect(mockUseAuthApi().signIn).toHaveBeenCalledWith(...params);
          expect(mockNotify.error).toHaveBeenCalledTimes(1);
          expect(mockNotify.error).toHaveBeenCalledWith('error message');
          expect(mockNavigator).not.toHaveBeenCalled();
        });
      });
      it('エラーメッセージが複数あればすべて通知している', async () => {
        mockUseAuthApi().signIn.mockRejectedValue({
          status: 401,
          messages: ['error message 1', 'error message 2'],
        });
        const { result } = renderHook(() => useAccount(), { wrapper });
        result.current.login(...params);
        await waitFor(() => {
          expect(mockUseAuthApi().signIn).toHaveBeenCalledTimes(1);
          expect(mockUseAuthApi().signIn).toHaveBeenCalledWith(...params);
          expect(mockNotify.error).toHaveBeenCalledTimes(2);
          expect(mockNotify.error).toHaveBeenCalledWith('error message 1');
          expect(mockNotify.error).toHaveBeenCalledWith('error message 2');
          expect(mockNavigator).not.toHaveBeenCalled();
        });
      });
      it('エラーメッセージがない場合はデフォルトメッセージを通知している', async () => {
        mockUseAuthApi().signIn.mockRejectedValue({
          status: 500,
          messages: [],
        });
        const { result } = renderHook(() => useAccount(), { wrapper });
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
      const { result } = renderHook(() => useAccount(), { wrapper });
      result.current.logout();
      await waitFor(() => {
        expect(mockUseUser().clearUser).toHaveBeenCalledTimes(1);
        expect(mockUseLifelog().clear).toHaveBeenCalledTimes(1);
        expect(mockNotify.success).toHaveBeenCalledTimes(1);
        expect(mockNotify.success).toHaveBeenCalledWith(LOGOUT.MESSAGE.SUCCESS);
      });
    });
    it('リクエスト失敗時', async () => {
      mockUseAuthApi().signOut.mockRejectedValue({ status: 500, messages: [] });
      const { result } = renderHook(() => useAccount(), { wrapper });
      result.current.logout();
      await waitFor(() => {
        expect(mockUseUser().clearUser).not.toHaveBeenCalled();
        expect(mockUseLifelog().clear).not.toHaveBeenCalled();
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
      const { result } = renderHook(() => useAccount(), { wrapper });
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
        status: 500,
        messages: [],
      });
      const { result } = renderHook(() => useAccount(), { wrapper });
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
      const { result } = renderHook(() => useAccount(), { wrapper });
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
    const headers = {
      'access-token': 'token123',
      uid: 'uid123',
      client: 'client123',
    };
    const password = 'password-0123';
    it('リクエスト成功時', async () => {
      const { result } = renderHook(() => useAccount(), { wrapper });
      result.current.passwordChange(password, password, headers);
      await waitFor(() => {
        expect(mockUseAuthApi().passwordReset).toHaveBeenCalledTimes(1);
        expect(mockUseAuthApi().passwordReset).toHaveBeenCalledWith(
          password,
          password,
          headers
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
        status: 500,
        messages: [],
      });
      const { result } = renderHook(() => useAccount(), { wrapper });
      result.current.passwordChange(password, password, headers);
      await waitFor(() => {
        expect(mockUseAuthApi().passwordReset).toHaveBeenCalledTimes(1);
        expect(mockUseAuthApi().passwordReset).toHaveBeenCalledWith(
          password,
          password,
          headers
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
      const { result } = renderHook(() => useAccount(), { wrapper });
      result.current.passwordChange(password, 'password-9999', headers);
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
      const { result } = renderHook(() => useAccount(), { wrapper });
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
          status: 404,
          messages: ['error message'],
        });
        const { result } = renderHook(() => useAccount(), { wrapper });
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
          status: 500,
          messages: ['error message'],
        });
        const { result } = renderHook(() => useAccount(), { wrapper });
        result.current.passwordForget(email);
        await waitFor(() => {
          expect(mockUseAuthApi().passwordForget).toHaveBeenCalledTimes(1);
          expect(mockUseAuthApi().passwordForget).toHaveBeenCalledWith(email);
          expect(mockNotify.error).toHaveBeenCalledTimes(1);
          expect(mockNotify.error).toHaveBeenCalledWith('error message');
        });
      });
    });
  });

  describe('signUp', () => {
    const email = 'test@example.com';
    const password = 'password-7777';
    it('リクエスト成功時', async () => {
      const { result } = renderHook(() => useAccount(), { wrapper });
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
      mockUseAuthApi().signUp.mockRejectedValue({ status: 500, messages: [] });
      const { result } = renderHook(() => useAccount(), { wrapper });
      result.current.signUp(email, password);
      await waitFor(() => {
        expect(mockUseAuthApi().signUp).toHaveBeenCalledTimes(1);
        expect(mockUseAuthApi().signUp).toHaveBeenCalledWith(email, password);
        expect(mockNotify.error).toHaveBeenCalledTimes(1);
        expect(mockNotify.error).toHaveBeenCalledWith(SIGN_UP.MESSAGE.ERROR);
        expect(mockUseUser().clearUser).toHaveBeenCalledTimes(1);
      });
    });
    it('バリデーションエラー時', async () => {
      const { result } = renderHook(() => useAccount(), { wrapper });
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
      const { result } = renderHook(() => useAccount(), { wrapper });
      result.current.remove();
      await waitFor(() => {
        expect(mockUseAuthApi().deleteUser).toHaveBeenCalledTimes(1);
        expect(mockNotify.success).toHaveBeenCalledTimes(1);
        expect(mockNotify.success).toHaveBeenCalledWith(
          ACCOUNT_DELETE.MESSAGE.SUCCESS
        );
        expect(mockUseUser().clearUser).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledWith(ROUTES.LOGIN);
      });
    });
    it('リクエスト失敗時', async () => {
      mockUseAuthApi().deleteUser.mockRejectedValue({
        status: 500,
        messages: [],
      });
      const { result } = renderHook(() => useAccount(), { wrapper });
      result.current.remove();
      await waitFor(() => {
        expect(mockUseAuthApi().deleteUser).toHaveBeenCalledTimes(1);
        expect(mockNotify.error).toHaveBeenCalledTimes(1);
        expect(mockNotify.error).toHaveBeenCalledWith(
          ACCOUNT_DELETE.MESSAGE.ERROR
        );
        expect(mockUseUser().clearUser).not.toHaveBeenCalled();
        expect(mockNavigator).not.toHaveBeenCalled();
      });
    });
  });

  describe('checkAuthenticated', () => {
    it('リクエスト成功時', async () => {
      const { result } = renderHook(() => useAccount(), { wrapper });
      result.current.checkAuthenticated();
      await waitFor(() => {
        expect(mockUseAuthApi().validate).toHaveBeenCalledTimes(1);
      });
    });
    it('リクエスト失敗時', async () => {
      mockUseAuthApi().validate.mockRejectedValue({
        status: 500,
        messages: [],
      });
      const { result } = renderHook(() => useAccount(), { wrapper });
      result.current.checkAuthenticated();
      await waitFor(() => {
        expect(mockUseAuthApi().validate).toHaveBeenCalledTimes(1);
      });
      expect(mockNotify.info).toHaveBeenCalledTimes(1);
      expect(mockNotify.info).toHaveBeenCalledWith(
        LOGIN.MESSAGE.ERROR.NEED_LOGIN
      );
    });
    it('user.sessionIdがnull以外のときは呼び出さない', async () => {
      mockUseUser().user = {
        email: 'jun@example.com',
        sessionId: 'session-id',
      };
      const { result } = renderHook(() => useAccount(), { wrapper });
      result.current.checkAuthenticated();
      await waitFor(() => {
        expect(mockUseAuthApi().validate).not.toHaveBeenCalled();
      });
    });
  });
});
