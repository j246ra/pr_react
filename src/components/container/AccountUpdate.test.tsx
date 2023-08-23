import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AccountUpdate from './AccountUpdate';
import { mockNavigator } from '@src/tests/common';
import {
  mockUseAuth,
  mockUseSession,
  mockUseUser,
} from '@src/tests/baseProviders';
import { ACCOUNT_UPDATE, PASSWORD_INPUT } from '@lib/consts';
import { ACCOUNT_UPDATE_TEST_ID as TEST_ID } from '@lib/consts/testId';

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
    expect(getByTestId(TEST_ID.EMAIL_INPUT)).toBeInTheDocument();

    const passwordInput = getByTestId(TEST_ID.PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute(
      'placeholder',
      PASSWORD_INPUT.PLACEHOLDER
    );

    const passwordConfirmInput = getByTestId(TEST_ID.PASSWORD_CONFIRM_INPUT);
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(passwordConfirmInput).toHaveAttribute(
      'placeholder',
      ACCOUNT_UPDATE.PASSWORD_CONFIRM.PLACEHOLDER
    );
    expect(
      getByText(ACCOUNT_UPDATE.PASSWORD_CONFIRM.LABEL)
    ).toBeInTheDocument();
  });

  it('ユーザーがフォームに情報を入力し、アカウントを更新する', async () => {
    const { getByTestId } = render(<AccountUpdate />);

    const emailInput = getByTestId(TEST_ID.EMAIL_INPUT);
    const passwordInput = getByTestId(TEST_ID.PASSWORD_INPUT);
    const passwordConfirmationInput = getByTestId(
      TEST_ID.PASSWORD_CONFIRM_INPUT
    );
    const updateButton = getByTestId(TEST_ID.BUTTON);

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
