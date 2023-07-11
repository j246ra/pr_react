import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from './SignUp';
import { useUser, UserContextType } from '@providers/UserProvider';
import { useSession } from '@providers/SessionProvider';
import { useAuth } from '@providers/AuthApiProvider';

jest.mock('@providers/UserProvider');
jest.mock('@providers/SessionProvider');
jest.mock('@providers/AuthApiProvider');

const mockUseUser = useUser as jest.MockedFunction<() => UserContextType>;

const mockUseSession = useSession as jest.MockedFunction<any>;
const mockUseAuth = useAuth as jest.MockedFunction<any>;

describe('SignUp component', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      user: { email: 'junkichii@gmail.com' },
      createUser: jest.fn(),
      updateUser: jest.fn(),
      clearUser: jest.fn(),
      isLogin: jest.fn(),
    });
    mockUseSession.mockReturnValue({
      removeToken: jest.fn(),
    });
    mockUseAuth.mockReturnValue({
      authApi: {
        signUp: jest.fn().mockResolvedValue({ status: 200 }),
      },
    });
  });

  it('サインアップフォームが表示されている', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <SignUp />
      </Router>
    );
    expect(getByPlaceholderText('メールアドレスを入力')).toBeInTheDocument();
    expect(getByPlaceholderText('パスワードを入力')).toBeInTheDocument();
  });

  it('ユーザーがフォームを入力して登録できる', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <SignUp />
      </Router>
    );

    const emailInput = getByPlaceholderText('メールアドレスを入力');
    const passwordInput = getByPlaceholderText('パスワードを入力');
    const submitButton = getByText('登録');

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'password' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUseAuth().authApi.signUp).toHaveBeenCalledWith(
        'test@example.com',
        'password'
      );
    });
  });
});
