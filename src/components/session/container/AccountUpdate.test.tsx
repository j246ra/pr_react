import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AccountUpdate from './AccountUpdate';
import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { ACCOUNT_UPDATE, PASSWORD_INPUT } from '@lib/consts/component';
import { ACCOUNT_UPDATE_TEST_ID as TEST_ID } from '@lib/consts/testId';
import useAccount from '@src/hooks/useAccount';

jest.mock('@src/hooks/useAccount');
const mockUseAccount = useAccount as jest.MockedFunction<any>;

describe('AccountUpdate component', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      user: { email: 'test@example.com' },
    });
    mockUseSession.mockReturnValue({
      initializeByUid: jest.fn(),
      removeToken: jest.fn(),
    });
    mockUseAccount.mockReturnValue({
      update: jest.fn().mockResolvedValue({ status: 200 }),
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
    it('入力値で更新処理を呼び出している', async () => {
      render(<AccountUpdate />);
      const emailInput = screen.getByTestId(TEST_ID.EMAIL_INPUT);
      const passwordInput = screen.getByTestId(TEST_ID.PASSWORD_INPUT);
      const passwordConfirmationInput = screen.getByTestId(
        TEST_ID.PASSWORD_CONFIRM_INPUT
      );
      const updateButton = screen.getByTestId(TEST_ID.BUTTON);
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
        expect(passwordConfirmationInput).toHaveValue('newpassword');
        expect(mockUseAccount().update).toHaveBeenCalledTimes(1);
        expect(mockUseAccount().update).toHaveBeenCalledWith(
          'newemail@example.com',
          'newpassword',
          'newpassword'
        );
      });
    });
  });
});
