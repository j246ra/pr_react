import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PasswordForget from './PasswordForget';
import { useAuth } from '@providers/AuthApiProvider';

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

  it('メールアドレス入力フォームを表示する', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <PasswordForget />
      </Router>
    );
    expect(getByPlaceholderText('メールアドレスを入力')).toBeInTheDocument();
  });

  it('ユーザーがパスワードを忘れたときにパスワードリセットメールを送信できる', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <PasswordForget />
      </Router>
    );

    const emailInput = getByPlaceholderText('メールアドレスを入力');
    const submitButton = getByText('送信');

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUseAuth().authApi.passwordForget).toHaveBeenCalledWith(
        'test@example.com'
      );
    });
  });
});
