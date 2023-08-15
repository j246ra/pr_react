import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AccountUpdate from './AccountUpdate';
import { mockNavigator } from '@src/tests/common';
import {
  mockUseAuth,
  mockUseSession,
  mockUseUser,
} from '@src/tests/baseProviders';

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
      initializeByUid: jest.fn(),
      removeToken: jest.fn(),
    });
  });

  it('アカウント更新フォームが表示されている', () => {
    const { getByTestId, getByText } = render(<AccountUpdate />);
    expect(getByTestId('account-update-email-input')).toBeInTheDocument();

    const passwordInput = getByTestId('account-update-password-input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('placeholder', 'パスワードを入力');

    const passwordConfirmInput = getByTestId(
      'account-update-password-confirm-input'
    );
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(passwordConfirmInput).toHaveAttribute(
      'placeholder',
      '新しいパスワードを入力'
    );
    expect(getByText('パスワード（確認用）')).toBeInTheDocument();
  });

  it('ユーザーがフォームに情報を入力し、アカウントを更新する', async () => {
    const { getByTestId } = render(<AccountUpdate />);

    const emailInput = getByTestId('account-update-email-input');
    const passwordInput = getByTestId('account-update-password-input');
    const passwordConfirmationInput = getByTestId(
      'account-update-password-confirm-input'
    );
    const updateButton = getByTestId('account-update-submit-button');

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
