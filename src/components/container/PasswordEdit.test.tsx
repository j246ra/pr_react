import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PasswordEdit from './PasswordEdit';
import { useSession } from '@providers/SessionProvider';
import { useAuth } from '@providers/AuthApiProvider';

jest.mock('@providers/SessionProvider');
jest.mock('@providers/AuthApiProvider');

const mockUseSession = useSession as jest.MockedFunction<any>;
const mockUseAuth = useAuth as jest.MockedFunction<any>;

describe('PasswordEdit component', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      setToken: jest.fn(),
    });

    mockUseAuth.mockReturnValue({
      authApi: {
        passwordReset: jest.fn().mockResolvedValue({ status: 200 }),
      },
    });
  });

  it('パスワード変更入力を表示する', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <PasswordEdit />
      </Router>
    );
    expect(getByPlaceholderText('新しいパスワードを入力')).toBeInTheDocument();
  });

  it('ユーザーがパスワードをリセットできる', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <PasswordEdit />
      </Router>
    );

    const passwordInput = getByPlaceholderText('新しいパスワードを入力');
    const passwordConfirmationInput =
      getByPlaceholderText('新しいパスワードを入力（確認用）');
    const submitButton = getByText('パスワード変更');

    fireEvent.change(passwordInput, {
      target: { value: 'newpassword' },
    });

    fireEvent.change(passwordConfirmationInput, {
      target: { value: 'newpassword' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUseAuth().authApi.passwordReset).toHaveBeenCalledWith(
        'newpassword',
        'newpassword'
      );
    });
  });
});
