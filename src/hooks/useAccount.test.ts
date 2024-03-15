import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { renderHook, waitFor } from '@testing-library/react';
import useAccount from '@src/hooks/useAccount';
import useAuthApi from '@src/hooks/useAuthApi';
import notify from '@lib/toast';
import { LOGIN } from '@lib/consts/component';
import { mockNavigator } from '@src/tests/common';
import { ROUTES } from '@lib/consts/common';

jest.mock('@src/hooks/useAuthApi');
const mockUseAuthApi = useAuthApi as jest.MockedFunction<any>;
jest.mock('@lib/toast');
const mockNotify = jest.mocked(notify);

describe('useAccount', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      removeHeaders: jest.fn(),
    });
    mockUseUser.mockReturnValue({
      createUser: jest.fn(),
    });
    mockUseAuthApi.mockReturnValue({
      signIn: jest.fn().mockResolvedValue({
        status: 200,
      }),
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
});
