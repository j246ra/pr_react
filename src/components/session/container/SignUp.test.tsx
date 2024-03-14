import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from './SignUp';
import { mockNavigator } from '@src/tests/common';
import notify from '@lib/toast';
import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import {
  EMAIL_INPUT,
  PASSWORD_FORGET,
  PASSWORD_INPUT,
  SIGN_UP,
} from '@lib/consts/component';
import {
  SESSION_OTHER_LINKS_TEST_ID,
  SIGN_UP_TEST_ID as TEST_ID,
} from '@lib/consts/testId';
import { ROUTES } from '@lib/consts/common';
import useAuthApi from '@src/hooks/useAuthApi';

jest.mock('@lib/toast');
const mockNotify = jest.mocked(notify);

jest.mock('@src/hooks/useAuthApi');
const mockUseAuthApi = useAuthApi as jest.MockedFunction<any>;

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
    mockUseAuthApi.mockReturnValue({
      signUp: jest.fn().mockResolvedValue({ status: 200 }),
    });
  });

  it('サインアップフォームが表示されている', () => {
    const { getByTestId } = render(
      <Router>
        <SignUp />
      </Router>
    );
    const emailInput = getByTestId(TEST_ID.EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('placeholder', EMAIL_INPUT.PLACEHOLDER);

    const passwordInput = getByTestId(TEST_ID.PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute(
      'placeholder',
      PASSWORD_INPUT.PLACEHOLDER
    );

    const signUpButton = getByTestId(TEST_ID.BUTTON);
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveTextContent(SIGN_UP.BUTTON.SUBMIT);

    const passwordForgetLink = getByTestId(
      SESSION_OTHER_LINKS_TEST_ID.PASSWORD_FORGET
    );
    expect(passwordForgetLink).toHaveTextContent(PASSWORD_FORGET.GUIDANCE);
  });

  it('ユーザーがフォームを入力して登録できる', async () => {
    const { getByTestId } = render(
      <Router>
        <SignUp />
      </Router>
    );

    const emailInput = getByTestId(TEST_ID.EMAIL_INPUT);
    const passwordInput = getByTestId(TEST_ID.PASSWORD_INPUT);
    const signUpButton = getByTestId(TEST_ID.BUTTON);

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'password' },
    });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password');
      expect(mockUseAuthApi().signUp).toHaveBeenCalledWith(
        'test@example.com',
        'password'
      );
      expect(mockNotify.success).toHaveBeenCalledTimes(1);
      expect(mockNotify.success).toHaveBeenCalledWith(SIGN_UP.MESSAGE.SUCCESS);
      expect(mockNavigator).toHaveBeenCalledTimes(1);
      expect(mockNavigator).toHaveBeenCalledWith(ROUTES.LIFELOGS);
    });
  });
});
