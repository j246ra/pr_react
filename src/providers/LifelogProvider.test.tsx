import { render, waitFor } from '@testing-library/react';
import LifelogProvider, {
  Lifelog,
  useLifelog,
} from '@providers/LifelogProvider';
import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React, { useEffect, useState } from 'react';
import { lifelogs } from '@lib/faker/lifelog';

let mockSetToken: jest.SpyInstance<unknown>;
let mockClearUser: jest.SpyInstance<unknown>;
describe('LifelogProvider', () => {
  beforeEach(() => {
    mockSetToken = jest.fn();
    mockClearUser = jest.fn();
    mockUseSession.mockReturnValue({
      getHeaders: jest.fn(),
      setToken: mockSetToken,
    });
    mockUseUser.mockReturnValue({
      clearUser: mockClearUser,
    });
  });
  afterEach(() => {
    mockSetToken.mockClear();
  });

  it('子要素がレンダリングされる', () => {
    const { getByTestId } = render(
      <LifelogProvider>
        <div data-testid={'child'} />
      </LifelogProvider>
    );
    expect(getByTestId('child')).toBeInTheDocument();
  });

  describe('Api検証', () => {
    const hostURL = 'http://localhost:3000/v1';
    const ChildComponent: React.FC = () => {
      const { loadLogs, newLog } = useLifelog();
      const [logs, setLogs] = useState<Lifelog[]>([newLog()]);
      useEffect(() => {
        loadLogs()
          .then((r) => setLogs(r.data))
          .catch(() => {
            setLogs(logs);
          });
      }, []);
      return <div data-testid={'api'}>{logs[0].id}</div>;
    };

    const server = setupServer(
      rest.get(hostURL + '/lifelogs', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(lifelogs(2)));
      })
    );
    beforeAll(() => server.listen());
    beforeEach(() => server.resetHandlers());
    afterAll(() => server.close());

    describe('Axios interceptor', () => {
      it('responseInterceptor', async () => {
        const { getByTestId } = render(
          <LifelogProvider>
            <ChildComponent />
          </LifelogProvider>
        );
        await waitFor(() => {
          expect(getByTestId('api').textContent).toEqual('1');
          expect(mockSetToken).toBeCalled();
        });
      });

      describe('errorInterceptor', () => {
        it('status 401 認証エラーの場合', async () => {
          server.use(
            rest.get(hostURL + '/lifelogs', (req, res, ctx) => {
              return res(ctx.status(401));
            })
          );
          const { getByTestId } = render(
            <LifelogProvider>
              <ChildComponent />
            </LifelogProvider>
          );
          await waitFor(() => {
            expect(getByTestId('api').textContent).toEqual('-1');
            expect(mockClearUser).toBeCalled();
          });
        });
        it('status 500 の場合', async () => {
          server.use(
            rest.get(hostURL + '/lifelogs', (req, res, ctx) => {
              return res(ctx.status(500));
            })
          );
          const { getByTestId } = render(
            <LifelogProvider>
              <ChildComponent />
            </LifelogProvider>
          );
          await waitFor(() => {
            expect(getByTestId('api').textContent).toEqual('-1');
            expect(mockClearUser).not.toBeCalled();
          });
        });
      });
    });
  });
});
