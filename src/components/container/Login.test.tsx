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
import {
  mockUseUser,
  mockUseSession,
  mockUseAuth,
} from '@src/tests/baseProviders';
import App from '@src/App';
import PasswordForget from '@container/PasswordForget';
import { useLifelog } from '@providers/LifelogProvider';
import SignUp from '@container/SignUp';
import { EMAIL_INPUT, LOGIN, PASSWORD_INPUT } from '@lib/consts';
import { LOGIN_TEST_ID as TEST_ID, SIGN_UP_TEST_ID } from '@lib/consts/testId';

jest.mock('@providers/LifelogProvider');
jest.mock('@lib/toast');
const mockUseLifelog = useLifelog as jest.MockedFunction<any>;
const mockNotify = jest.mocked(notify);

describe('Login component', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      user: { email: '' },
      createUser: jest.fn(),
      updateUser: jest.fn(),
      clearUser: jest.fn(),
      isLogin: jest.fn(),
    });
    mockUseSession.mockReturnValue({
      initializeByUid: jest.fn(),
    });
    mockUseAuth.mockReturnValue({
      authApi: {
        signIn: jest.fn().mockResolvedValue({ status: 200 }),
      },
    });
    mockUseLifelog.mockReturnValue({
      clear: jest.fn(),
    });
  });

  it('ログインフォームが表示されている', () => {
    const { container, getByTestId } = render(
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

    const passwordLinks = container.getElementsByClassName(
      'password-forget-link'
    );
    expect(passwordLinks).toHaveLength(1);
    expect(passwordLinks[0]).toHaveAttribute('href', '/password_forget');

    const signUpLinks = container.getElementsByClassName('sign-up-link');
    expect(signUpLinks).toHaveLength(1);
    expect(signUpLinks[0]).toHaveAttribute('href', '/sign_up');
  });

  describe('Link コンポーネント', () => {
    const renderWithRouter = () =>
      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Login />} />
              <Route path="/sign_up" element={<SignUp />} />
              <Route path="/password_forget" element={<PasswordForget />} />
            </Route>
          </Routes>
        </BrowserRouter>
      );

    it('Sign Up', async () => {
      const { container } = renderWithRouter();
      const signUpLinks = container.getElementsByClassName('sign-up-link');
      expect(signUpLinks).toHaveLength(1);
      expect(signUpLinks[0]).toHaveAttribute('href', '/sign_up');
      fireEvent.click(signUpLinks[0]);
      await waitFor(() => {
        const els = screen.getAllByTestId(SIGN_UP_TEST_ID.FORM);
        expect(els).toHaveLength(1);
      });
    });

    it('Password forget', async () => {
      const { container } = renderWithRouter();
      const passwordLinks = container.getElementsByClassName(
        'password-forget-link'
      );
      expect(passwordLinks).toHaveLength(1);
      expect(passwordLinks[0]).toHaveAttribute('href', '/password_forget');
      fireEvent.click(passwordLinks[0]);
      await waitFor(() => {
        const els = container.getElementsByClassName('session-callout');
        expect(els).toHaveLength(1);
      });
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
      expect(mockUseAuth().authApi.signIn).toHaveBeenCalledWith(
        'test@example.com',
        'password'
      );
      expect(mockNotify.success).toHaveBeenCalledTimes(1);
      expect(mockNotify.success).toHaveBeenCalledWith(LOGIN.MESSAGE.SUCCESS);
      expect(mockNavigator).toHaveBeenCalledTimes(1);
      expect(mockNavigator).toHaveBeenCalledWith('/lifelogs');
    });
  });
});
