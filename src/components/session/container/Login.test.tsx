import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './Login';
import notify from '@lib/toast';
import { mockNavigator } from '@src/tests/common';
import { mockUseUser, mockUseSession } from '@src/tests/baseProviders';
import PasswordForget from '@session/container/PasswordForget';
import { useLifelog } from '@providers/LifelogProvider';
import { EMAIL_INPUT, LOGIN, PASSWORD_INPUT } from '@lib/consts/component';
import {
  LOGIN_TEST_ID as TEST_ID,
  SESSION_OTHER_LINKS_TEST_ID,
} from '@lib/consts/testId';
import { ROUTES } from '@lib/consts/common';
import SignUp from '@session/container/SignUp';
import useAuthApi from '@src/hooks/useAuthApi';

jest.mock('@providers/LifelogProvider');
jest.mock('@lib/toast');
jest.mock('@src/hooks/useAuthApi');
const mockUseLifelog = useLifelog as jest.MockedFunction<any>;
const mockNotify = jest.mocked(notify);
const mockUseAuthApi = useAuthApi as jest.MockedFunction<any>;

describe('Login component', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      user: { email: '' },
      createUser: jest.fn(),
      updateUser: jest.fn(),
      clearUser: jest.fn(),
      isLoggedIn: jest.fn(),
    });
    mockUseSession.mockReturnValue({
      initializeByUid: jest.fn(),
    });
    mockUseAuthApi.mockReturnValue({
      signIn: jest.fn().mockResolvedValue({ status: 200 }),
    });
    mockUseLifelog.mockReturnValue({
      clear: jest.fn(),
    });
  });

  it('ログインフォームが表示されている', () => {
    const { getByTestId } = render(
      <Router>
        <Login />
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

    const loginButton = getByTestId(TEST_ID.BUTTON);
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent(LOGIN.BUTTON.SUBMIT);

    const passwordLinks = getByTestId(
      SESSION_OTHER_LINKS_TEST_ID.PASSWORD_FORGET
    );
    expect(passwordLinks).toBeInTheDocument();
    expect(passwordLinks).toHaveAttribute('href', ROUTES.PASSWORD_FORGET);

    const signUpLinks = getByTestId(SESSION_OTHER_LINKS_TEST_ID.SIGN_UP);
    expect(signUpLinks).toBeInTheDocument();
    expect(signUpLinks).toHaveAttribute('href', ROUTES.SIGN_UP);
  });

  describe('Link コンポーネント', () => {
    const renderWithRouter = () =>
      render(
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.PASSWORD_FORGET} element={<PasswordForget />} />
          </Routes>
        </BrowserRouter>
      );

    it('Sign Up', () => {
      renderWithRouter();
      const signUpLink = screen.getByTestId(
        SESSION_OTHER_LINKS_TEST_ID.SIGN_UP
      );
      expect(signUpLink).toBeInTheDocument();
      expect(signUpLink).toHaveAttribute('href', ROUTES.SIGN_UP);
    });

    it('Password forget', () => {
      renderWithRouter();
      const passwordLink = screen.getByTestId(
        SESSION_OTHER_LINKS_TEST_ID.PASSWORD_FORGET
      );
      expect(passwordLink).toBeInTheDocument();
      expect(passwordLink).toHaveAttribute('href', ROUTES.PASSWORD_FORGET);
    });
  });

  it('ユーザーがフォームに情報を入力し、ログインする', async () => {
    const { getByTestId } = render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = getByTestId(TEST_ID.EMAIL_INPUT);
    const passwordInput = getByTestId(TEST_ID.PASSWORD_INPUT);
    const loginButton = getByTestId(TEST_ID.BUTTON);

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
      expect(mockUseAuthApi().signIn).toHaveBeenCalledWith(
        'test@example.com',
        'password'
      );
      expect(mockNotify.success).toHaveBeenCalledTimes(1);
      expect(mockNotify.success).toHaveBeenCalledWith(LOGIN.MESSAGE.SUCCESS);
      expect(mockNavigator).toHaveBeenCalledTimes(1);
      expect(mockNavigator).toHaveBeenCalledWith(ROUTES.LIFELOGS);
    });
  });
});
