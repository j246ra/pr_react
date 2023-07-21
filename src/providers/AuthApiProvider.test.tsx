import React, { useEffect, useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import AuthApiProvider, { useAuth } from '@providers/AuthApiProvider';
import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import notify from '@lib/toast';

jest.unmock('@providers/AuthApiProvider');

let mockSetToken: jest.SpyInstance<unknown>;
let mockUpdateUser = jest.fn();
let mockUser = { email: 'def@example.com' };
let notifySpy: jest.SpyInstance<unknown>;
describe('AuthApiProvider', () => {
  beforeEach(() => {
    mockSetToken = jest.fn();
    mockUseSession.mockReturnValue({
      getHeaders: jest.fn(),
      setToken: mockSetToken,
    });
    mockUseUser.mockReturnValue({
      user: mockUser,
      clearUser: jest.fn(),
      createUser: jest.fn(),
      isLogin: jest.fn(),
      updateUser: mockUpdateUser,
    });
    notifySpy = jest.spyOn(notify, 'error');
  });
  afterEach(() => {
    mockSetToken.mockClear();
    mockUpdateUser.mockClear();
  });
  it('子要素がレンダリングされる', () => {
    const { getByTestId } = render(
      <AuthApiProvider>
        <div data-testid={'child'} />
      </AuthApiProvider>
    );
    expect(getByTestId('child')).toBeInTheDocument();
  });
  describe('authApi 検証', () => {
    const ChildComponent: React.FC = () => {
      const { authApi: api } = useAuth();
      const [message, setMessage] = useState('');
      useEffect(() => {
        api.signIn('', '').catch(() => {
          setMessage('Request failed.');
        });
      }, []);
      return <div data-testid={'sign-in'}>{message}</div>;
    };
    describe('正常系 (responseInterceptor)', () => {
      const responseUid = 'test1@example.com';
      const server = setupServer(
        rest.post('http://localhost:3000/v1/auth/sign_in', (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.set('access-token', 'token'),
            ctx.set('uid', responseUid),
            ctx.set('client', 'client')
          );
        })
      );
      beforeAll(() => server.listen());
      afterEach(() => server.resetHandlers());
      afterAll(() => server.close());

      it('updateUser が呼び出されている', async () => {
        mockUser.email = 'test666@example.com';
        const { getByTestId } = render(
          <AuthApiProvider>
            <ChildComponent />
          </AuthApiProvider>
        );
        await waitFor(() => {
          expect(getByTestId('sign-in')).toBeInTheDocument();
          expect(mockSetToken).toBeCalled();
          expect(mockUpdateUser).toBeCalled();
          expect(mockUpdateUser).toBeCalledWith(responseUid);
        });
      });
      it('updateUser 呼び出されない', async () => {
        mockUser.email = responseUid;
        const { getByTestId } = render(
          <AuthApiProvider>
            <ChildComponent />
          </AuthApiProvider>
        );
        await waitFor(() => {
          expect(getByTestId('sign-in')).toBeInTheDocument();
          expect(mockSetToken).toBeCalled();
          expect(mockUpdateUser).not.toBeCalled();
        });
      });
    });
    describe('異常系 (errorInterceptor)', () => {
      const server = setupServer(
        rest.post('http://localhost:3000/v1/auth/sign_in', (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              errors: { fullMessages: ['error message 1', 'error message 2'] },
            })
          );
        })
      );
      beforeAll(() => server.listen());
      afterEach(() => server.resetHandlers());
      afterAll(() => server.close());

      it('メッセージが通知されている', async () => {
        const { getByTestId } = render(
          <AuthApiProvider>
            <ChildComponent />
          </AuthApiProvider>
        );
        await waitFor(() => {
          expect(getByTestId('sign-in')).toBeInTheDocument();
          expect(getByTestId('sign-in').textContent).toEqual('Request failed.');
          expect(mockSetToken).not.toBeCalled();
          expect(notifySpy).toBeCalled();
          expect(notifySpy).toBeCalledWith('error message 1');
          expect(notifySpy).toBeCalledWith('error message 2');
        });
      });
    });
  });
});
