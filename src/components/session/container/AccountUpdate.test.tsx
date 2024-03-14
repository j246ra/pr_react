import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AccountUpdate from './AccountUpdate';
import { mockNavigator } from '@src/tests/common';
import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { ACCOUNT_UPDATE, PASSWORD_INPUT } from '@lib/consts/component';
import { ACCOUNT_UPDATE_TEST_ID as TEST_ID } from '@lib/consts/testId';
import notify from '@lib/toast';
import useAuthApi from '@src/hooks/useAuthApi';
jest.mock('@lib/toast');
jest.mock('@src/hooks/useAuthApi');
const mockNotify = jest.mocked(notify);
const mockUseAuthApi = useAuthApi as jest.MockedFunction<any>;

describe('AccountUpdate component', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      user: { email: 'test@example.com' },
      createUser: jest.fn(),
      updateUser: jest.fn(),
      clearUser: jest.fn(),
      isLogin: jest.fn(),
    });
    mockUseAuthApi.mockReturnValue({
      updateUser: jest.fn().mockResolvedValue({ status: 200 }),
      deleteUser: jest.fn().mockResolvedValue({}),
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
    expect(passwordConfirmInput).toHaveAttribute(
      'id',
      ACCOUNT_UPDATE.PASSWORD_CONFIRM.ID
    );
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(passwordConfirmInput).toHaveAttribute(
      'placeholder',
      ACCOUNT_UPDATE.PASSWORD_CONFIRM.PLACEHOLDER
    );
    expect(
      getByText(ACCOUNT_UPDATE.PASSWORD_CONFIRM.LABEL)
    ).toBeInTheDocument();
  });

  describe('フォーム入力処理', () => {
    let emailInput: HTMLElement;
    let passwordInput: HTMLElement;
    let passwordConfirmationInput: HTMLElement;
    let updateButton: HTMLElement;

    type inputParams = {
      email?: string;
      password?: string;
      confirmedPass?: string;
    };
    const formInput = ({ email, password, confirmedPass }: inputParams) => {
      emailInput = screen.getByTestId(TEST_ID.EMAIL_INPUT);
      passwordInput = screen.getByTestId(TEST_ID.PASSWORD_INPUT);
      passwordConfirmationInput = screen.getByTestId(
        TEST_ID.PASSWORD_CONFIRM_INPUT
      );
      updateButton = screen.getByTestId(TEST_ID.BUTTON);
      fireEvent.change(emailInput, {
        target: { value: email || 'newemail@example.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: password || 'newpassword' },
      });
      fireEvent.change(passwordConfirmationInput, {
        target: { value: confirmedPass || 'newpassword' },
      });
      fireEvent.click(updateButton);
    };

    it('バリデーションエラー時は API をリクエストしない', async () => {
      render(<AccountUpdate />);
      formInput({ confirmedPass: 'invalidPassword' });
      await waitFor(() => {
        expect(emailInput).toHaveValue('newemail@example.com');
        expect(passwordInput).toHaveValue('newpassword');
        expect(passwordConfirmationInput).toHaveValue('invalidPassword');
        expect(mockUseAuthApi().updateUser).not.toHaveBeenCalled();
      });
    });

    it('ユーザーがフォームに情報を入力し、アカウントを更新する', async () => {
      render(<AccountUpdate />);
      formInput({});
      await waitFor(() => {
        expect(emailInput).toHaveValue('newemail@example.com');
        expect(passwordInput).toHaveValue('newpassword');
        expect(mockUseAuthApi().updateUser).toHaveBeenCalledWith({
          email: 'newemail@example.com',
          password: 'newpassword',
        });
        expect(mockNavigator).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledWith('/');
      });
    });
    it('更新APIエラー時、エラーメッセージを通知している', async () => {
      mockUseAuthApi.mockReturnValue({
        ...mockUseAuthApi,
        updateUser: jest.fn().mockRejectedValue({ status: 500 }),
      });
      render(<AccountUpdate />);
      formInput({});

      await waitFor(() => {
        expect(mockNotify.error).toHaveBeenCalledWith(
          ACCOUNT_UPDATE.MESSAGE.ERROR
        );
      });
    });
  });
});
