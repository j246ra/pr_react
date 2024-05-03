import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PasswordForget from './PasswordForget';
import useAccount from '@src/hooks/useAccount';
import { PASSWORD_FORGET } from '@lib/consts/component';
import { PASSWORD_FORGET_TEST_ID as TEST_ID } from '@lib/consts/testId';

jest.mock('@src/hooks/useAccount');
const mockUseAccount = useAccount as jest.MockedFunction<any>;

describe('PasswordForget コンポーネント', () => {
  describe('正常系', () => {
    beforeEach(() => {
      mockUseAccount.mockReturnValue({
        passwordForget: jest.fn(),
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
        expect(mockUseAccount().passwordForget).toHaveBeenCalledWith(
          'test@example.com'
        );
      });
    });
  });
});
