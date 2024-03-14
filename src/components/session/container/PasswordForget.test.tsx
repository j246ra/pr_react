import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PasswordForget from './PasswordForget';
import useAuthApi from '@src/hooks/useAuthApi';
import { mockNavigator } from '@src/tests/common';
import { PASSWORD_FORGET } from '@lib/consts/component';
import { PASSWORD_FORGET_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { NOTIFY, ROUTES } from '@lib/consts/common';
import toast from 'react-hot-toast';

jest.mock('@src/hooks/useAuthApi');
const mockUseAuthApi = useAuthApi as jest.MockedFunction<any>;

jest.mock('react-hot-toast');
const mockToast = jest.mocked(toast);

describe('PasswordForget コンポーネント', () => {
  describe('正常系', () => {
    beforeEach(() => {
      mockUseAuthApi.mockReturnValue({
        passwordForget: jest.fn().mockResolvedValue({ status: 200 }),
      });
    });

    it('入力フォームのレンダリング', () => {
      const { getByTestId } = render(<PasswordForget />);

      const emailInput = getByTestId(TEST_ID.EMAIL_INPUT);
      expect(emailInput).toBeInTheDocument();
      expect(emailInput.tagName).toEqual('INPUT');
      expect(emailInput).toHaveAttribute(
        'placeholder',
        PASSWORD_FORGET.EMAIL_INPUT.PLACEHOLDER
      );

      const submitButton = getByTestId(TEST_ID.BUTTON);
      expect(submitButton).toBeInTheDocument();
      expect(submitButton.tagName).toEqual('BUTTON');
      expect(submitButton).toHaveTextContent(PASSWORD_FORGET.BUTTON.SUBMIT);
    });

    it('ユーザーがパスワードを忘れたときにパスワードリセットメールを送信できる', async () => {
      const { getByTestId } = render(<PasswordForget />);

      const emailInput = getByTestId(TEST_ID.EMAIL_INPUT);
      const submitButton = getByTestId(TEST_ID.BUTTON);

      fireEvent.change(emailInput, {
        target: { value: 'test@example.com' },
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockUseAuthApi().passwordForget).toHaveBeenCalledWith(
          'test@example.com'
        );
        expect(mockNavigator).toHaveBeenCalledWith(
          ROUTES.RESET_MAIL_SEND_SUCCESS
        );
      });
    });
  });

  describe('異常系', () => {
    describe('レスポンスボディが存在しない', () => {
      beforeEach(() => {
        mockUseAuthApi.mockReturnValue({
          passwordForget: jest.fn().mockRejectedValue({}),
        });
      });
      it('エラーメッセージを表示している', async () => {
        const { getByTestId } = render(<PasswordForget />);

        const emailInput = getByTestId(TEST_ID.EMAIL_INPUT);
        const submitButton = getByTestId(TEST_ID.BUTTON);

        fireEvent.change(emailInput, {
          target: { value: 'test@example.com' },
        });
        fireEvent.click(submitButton);

        await waitFor(() => {
          expect(mockUseAuthApi().passwordForget).toHaveBeenCalledWith(
            'test@example.com'
          );
          expect(mockToast.error).toHaveBeenCalled();
          expect(mockToast.error).toHaveBeenCalledWith(
            PASSWORD_FORGET.MESSAGE.ERROR,
            NOTIFY.STYLE.ERROR
          );
        });
      });
    });
  });
});
