import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PasswordEdit from './PasswordEdit';
import { useSession } from '@providers/SessionProvider';
import { PASSWORD_EDIT } from '@lib/consts/component';
import useAuthApi from '@src/hooks/useAuthApi';

jest.mock('@providers/SessionProvider');
jest.mock('@src/hooks/useAuthApi');

const mockUseSession = useSession as jest.MockedFunction<any>;
const mockUseAuthApi = useAuthApi as jest.MockedFunction<any>;

describe('PasswordEdit component', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      setHeaders: jest.fn(),
    });

    mockUseAuthApi.mockReturnValue({
      passwordReset: jest.fn().mockResolvedValue({ status: 200 }),
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
      expect(mockUseAuthApi().passwordReset).toHaveBeenCalledWith(
        'newpassword',
        'newpassword'
      );
    });
  });
});
