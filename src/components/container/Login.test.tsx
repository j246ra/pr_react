import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { useUser, UserContextType } from '@providers/UserProvider';
import { useSession } from '@providers/SessionProvider';
import { useAuth } from '@providers/AuthApiProvider';
import toast from 'react-hot-toast';

jest.mock('@providers/UserProvider');
jest.mock('@providers/SessionProvider');
jest.mock('@providers/AuthApiProvider');
jest.mock('react-hot-toast');

const mockUseUser = useUser as jest.MockedFunction<() => UserContextType>;
const mockUseSession = useSession as jest.MockedFunction<any>;
const mockUseAuth = useAuth as jest.MockedFunction<any>;
const mockToast = toast as jest.MockedObject<any>;

describe('Login component', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      user: { email: '' },
      createUser: jest.fn(),
      updateUser: jest.fn(),
      clearUser: jest.fn(),
      isLogin: jest.fn(),
    });
    mockUseSession.mockReturnValue({
      createToken: jest.fn(),
    });
    mockUseAuth.mockReturnValue({
      authApi: {
        signIn: jest.fn().mockResolvedValue({ status: 200 }),
      },
    });
    mockToast.mockReturnValue({
      error: jest.fn(() => 'toast-error'),
      success: jest.fn(() => 'toast-success'),
    });
  });

  it('ログインフォームが表示されている', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Login />
      </Router>
    );
    expect(getByPlaceholderText('メールアドレスを入力')).toBeInTheDocument();
    expect(getByPlaceholderText('パスワードを入力')).toBeInTheDocument();
  });

  it('ユーザーがフォームに情報を入力し、ログインする', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = getByPlaceholderText('メールアドレスを入力');
    const passwordInput = getByPlaceholderText('パスワードを入力');
    const loginButton = getByText('ログイン');

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'password' },
    });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockUseAuth().authApi.signIn).toHaveBeenCalledWith(
        'test@example.com',
        'password'
      );
      expect(toast.success).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('ログイン成功');
    });
  });
});
