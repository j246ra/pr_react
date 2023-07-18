import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import notify from '@lib/toast';
import { mockNavigator } from '@src/tests/common';
import {
  mockUseUser,
  mockUseSession,
  mockUseAuth,
} from '@src/tests/baseProviders';

jest.mock('@lib/toast');
const mockNotify = jest.mocked(notify);

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
      initCookieByUid: jest.fn(),
    });
    mockUseAuth.mockReturnValue({
      authApi: {
        signIn: jest.fn().mockResolvedValue({ status: 200 }),
      },
    });
  });

  it('ログインフォームが表示されている', () => {
    const { getByTestId } = render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = getByTestId('login-email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('placeholder', 'メールアドレスを入力');

    const passwordInput = getByTestId('login-password-input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('placeholder', 'パスワードを入力');

    const loginButton = getByTestId('login-button');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent('ログイン');
  });

  it('ユーザーがフォームに情報を入力し、ログインする', async () => {
    const { getByTestId } = render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = getByTestId('login-email-input');
    const passwordInput = getByTestId('login-password-input');
    const loginButton = getByTestId('login-button');

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'password' },
    });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password');
      expect(mockUseAuth().authApi.signIn).toHaveBeenCalledWith(
        'test@example.com',
        'password'
      );
      expect(mockNotify.success).toHaveBeenCalledTimes(1);
      expect(mockNotify.success).toHaveBeenCalledWith('ログイン成功');
      expect(mockNavigator).toHaveBeenCalledTimes(1);
      expect(mockNavigator).toHaveBeenCalledWith('/lifelogs');
    });
  });
});
