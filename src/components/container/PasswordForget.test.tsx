import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PasswordForget from './PasswordForget';
import { useAuth } from '@providers/AuthApiProvider';
import { mockNavigator } from '@src/tests/common';
import { PASSWORD_FORGET } from '@lib/consts';

jest.mock('@providers/AuthApiProvider');

const mockUseAuth = useAuth as jest.MockedFunction<any>;

describe('PasswordForget コンポーネント', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      authApi: {
        passwordForget: jest.fn().mockResolvedValue({ status: 200 }),
      },
    });
  });

  it('入力フォームのレンダリング', () => {
    const { getByTestId } = render(<PasswordForget />);

    const emailInput = getByTestId('password-forget-email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.tagName).toEqual('INPUT');
    expect(emailInput).toHaveAttribute(
      'placeholder',
      PASSWORD_FORGET.EMAIL_INPUT.PLACEHOLDER
    );

    const submitButton = getByTestId('password-forget-submit-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.tagName).toEqual('BUTTON');
    expect(submitButton).toHaveTextContent('送信');
  });

  it('ユーザーがパスワードを忘れたときにパスワードリセットメールを送信できる', async () => {
    const { getByTestId } = render(<PasswordForget />);

    const emailInput = getByTestId('password-forget-email-input');
    const submitButton = getByTestId('password-forget-submit-button');

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUseAuth().authApi.passwordForget).toHaveBeenCalledWith(
        'test@example.com'
      );
      expect(mockNavigator).toHaveBeenCalledWith('/send_success');
    });
  });
});
