import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router';
import PasswordEdit from './PasswordEdit';
import { PASSWORD_EDIT } from '@lib/consts/component';
import useAccount from '@src/hooks/useAccount';

jest.mock('@src/hooks/useAccount');
const mockUseAccount = useAccount as jest.MockedFunction<any>;

describe('PasswordEdit component', () => {
  beforeEach(() => {
    mockUseAccount.mockReturnValue({
      passwordChange: jest.fn(),
    });
  });

  it('パスワード変更入力を表示する', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <PasswordEdit />
      </Router>
    );
    expect(
      getByPlaceholderText(PASSWORD_EDIT.PASSWORD_INPUT.PLACEHOLDER)
    ).toBeInTheDocument();
  });

  it('ユーザーがパスワードをリセットできる', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <PasswordEdit />
      </Router>
    );

    const passwordInput = getByPlaceholderText(
      PASSWORD_EDIT.PASSWORD_INPUT.PLACEHOLDER
    );
    const passwordConfirmationInput = getByPlaceholderText(
      PASSWORD_EDIT.PASSWORD_CONFIRM.PLACEHOLDER
    );
    const submitButton = getByText(PASSWORD_EDIT.BUTTON.SUBMIT);

    fireEvent.change(passwordInput, {
      target: { value: 'newpassword' },
    });

    fireEvent.change(passwordConfirmationInput, {
      target: { value: 'newpassword' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUseAccount().passwordChange).toHaveBeenCalledWith(
        'newpassword',
        'newpassword',
        { 'access-token': undefined, uid: undefined, client: undefined }
      );
    });
  });
});
