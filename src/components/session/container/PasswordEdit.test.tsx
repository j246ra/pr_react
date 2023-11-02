import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PasswordEdit from './PasswordEdit';
import { useSession } from '@providers/SessionProvider';
import { useAuth } from '@providers/AuthApiProvider';
import { PASSWORD_EDIT } from '@lib/consts/component';

jest.mock('@providers/SessionProvider');
jest.mock('@providers/AuthApiProvider');

const mockUseSession = useSession as jest.MockedFunction<any>;
const mockUseAuth = useAuth as jest.MockedFunction<any>;

describe('PasswordEdit component', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      setHeaders: jest.fn(),
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
      expect(mockUseAuth().authApi.passwordReset).toHaveBeenCalledWith(
        'newpassword',
        'newpassword'
      );
    });
  });
});
