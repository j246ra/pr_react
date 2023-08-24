import React, { useEffect, useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import AuthApiProvider, { useAuth } from '@providers/AuthApiProvider';
import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { setupServer } from 'msw/node';
import {
  compose,
  context,
  DefaultBodyType,
  ResponseTransformer,
  rest,
} from 'msw';
import notify from '@lib/toast';
import { baseUrl } from '@lib/api/client';
import Defs from '@lib/consts';

const MESSAGE = Defs.COMMON.MESSAGE;
const URL = `${baseUrl}/${Defs.API.VERSION}${Defs.API.SESSION.ENDPOINT.SIGN_IN}`;

jest.unmock('@providers/AuthApiProvider');

let mockUser = { email: 'def@example.com' };
let notifySpy: jest.SpyInstance<unknown>;
describe('AuthApiProvider', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      getHeaders: jest.fn(),
      setHeaders: jest.fn(),
    });
    mockUseUser.mockReturnValue({
      user: mockUser,
      updateUser: jest.fn(),
    });
    notifySpy = jest.spyOn(notify, 'error');
  });
  afterEach(() => {
    notifySpy.mockClear();
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
    const createServer = (r: ResponseTransformer<DefaultBodyType, any>) => {
      return setupServer(
        rest.post(URL, (req, res) => {
          return res(r);
        })
      );
    };

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
      const response = (): ResponseTransformer<DefaultBodyType, any> => {
        return compose(
          context.status(200),
          context.set('access-token', 'token'),
          context.set('uid', responseUid),
          context.set('client', 'client')
        );
      };
      const server = createServer(response());
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
          expect(mockUseSession().setHeaders).toBeCalled();
          expect(mockUseUser().updateUser).toBeCalled();
          expect(mockUseUser().updateUser).toBeCalledWith(responseUid);
          expect(notifySpy).not.toBeCalled();
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
          expect(mockUseSession().setHeaders).toBeCalled();
          expect(mockUseUser().updateUser).not.toBeCalled();
          expect(notifySpy).not.toBeCalled();
        });
      });
    });

    describe('異常系 (errorInterceptor)', () => {
      describe('responseが存在する場合', () => {
        const response = (): ResponseTransformer<DefaultBodyType, any> => {
          return compose(
            context.status(400),
            context.json({
              errors: { fullMessages: ['error message 1', 'error message 2'] },
            })
          );
        };
        const server = createServer(response());
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
            expect(getByTestId('sign-in').textContent).toEqual(
              'Request failed.'
            );
            expect(mockUseSession().setHeaders).not.toBeCalled();
            expect(notifySpy).toBeCalled();
            expect(notifySpy).toBeCalledWith('error message 1');
            expect(notifySpy).toBeCalledWith('error message 2');
          });
        });
      });

      describe('responseが存在しない場合', () => {
        const server = setupServer(
          rest.post(URL, (req, res) => {
            return res.networkError('Failed to connect.');
          })
        );
        beforeAll(() => server.listen());
        afterEach(() => server.resetHandlers());
        afterAll(() => server.close());

        it('固定エラーメッセージが通知されている', async () => {
          const { getByTestId } = render(
            <AuthApiProvider>
              <ChildComponent />
            </AuthApiProvider>
          );
          await waitFor(() => {
            expect(getByTestId('sign-in')).toBeInTheDocument();
            expect(mockUseSession().setHeaders).not.toBeCalled();
            expect(notifySpy).toBeCalled();
            expect(notifySpy).toBeCalledWith(
              expect.stringMatching(MESSAGE.ERROR.GENERAL)
            );
          });
        });
      });
    });
  });
});
