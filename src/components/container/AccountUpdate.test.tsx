import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AccountUpdate from './AccountUpdate';
import { useUser, UserContextType } from '@providers/UserProvider';
import { useAuth } from '@providers/AuthApiProvider';
import { useSession } from '@providers/SessionProvider';

jest.mock('@providers/UserProvider');
jest.mock('@providers/AuthApiProvider');
jest.mock('@providers/SessionProvider');

const mockUseUser = useUser as jest.MockedFunction<() => UserContextType>;
const mockUseAuth = useAuth as jest.MockedFunction<any>;
const mockUseSession = useSession as jest.MockedFunction<any>;
const mockNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigator,
}));

describe('AccountUpdate component', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      user: { email: 'test@example.com' },
      createUser: jest.fn(),
      updateUser: jest.fn(),
      clearUser: jest.fn(),
      isLogin: jest.fn(),
    });
    mockUseAuth.mockReturnValue({
      authApi: {
        updateUser: jest.fn().mockResolvedValue({ status: 200 }),
        deleteUser: jest.fn().mockResolvedValue({}),
      },
    });
    mockUseSession.mockReturnValue({
      createToken: jest.fn(),
      removeToken: jest.fn(),
    });
  });

  it('アカウント更新フォームが表示されている', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <AccountUpdate />
      </Router>
    );
    expect(getByPlaceholderText('メールアドレスを入力')).toBeInTheDocument();
    expect(getByPlaceholderText('新しいパスワードを入力')).toBeInTheDocument();
  });

  it('ユーザーがフォームに情報を入力し、アカウントを更新する', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AccountUpdate />
      </Router>
    );

    const emailInput = getByPlaceholderText('メールアドレスを入力');
    const passwordInput = getByPlaceholderText('パスワードを入力');
    const passwordConfirmationInput =
      getByPlaceholderText('新しいパスワードを入力');
    const updateButton = getByText('更新');

    fireEvent.change(emailInput, {
      target: { value: 'newemail@example.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'newpassword' },
    });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: 'newpassword' },
    });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue('newemail@example.com');
      expect(passwordInput).toHaveValue('newpassword');
      expect(mockUseAuth().authApi.updateUser).toHaveBeenCalledWith({
        email: 'newemail@example.com',
        password: 'newpassword',
      });
      expect(mockNavigator).toHaveBeenCalledTimes(1);
      expect(mockNavigator).toHaveBeenCalledWith('/');
    });
  });
});
