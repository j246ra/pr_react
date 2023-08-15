import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import SessionProvider, {
  useSession,
  Headers,
} from '@providers/SessionProvider';
import { AxiosResponse } from 'axios';

jest.unmock('@providers/SessionProvider');

const initToken = {
  uid: 'uid',
  'access-token': 'access-token',
  client: 'client',
} as Headers;

let mockToken = {};

const mockSetCookie = jest.fn();
const mockRemoveCookie = jest.fn();
jest.mock('react-cookie', () => {
  const originalModule = jest.requireActual('react-cookie');
  return {
    __esModule: true,
    ...originalModule,
    useCookies: () => [mockToken, mockSetCookie, mockRemoveCookie],
  };
});

type ChildComponentProps = {
  methodType?: string;
  headers?: Headers | AxiosResponse<Headers>;
  uid?: string;
};
const ChildComponent: React.FC<ChildComponentProps> = ({
  methodType,
  headers,
  uid,
}) => {
  const { initializeByUid, getHeaders, hasToken, setHeaders, removeHeaders } =
    useSession();
  useEffect(() => {
    switch (methodType) {
      case 'uid':
        if (uid) initializeByUid(uid);
        return;
      case 'set':
        if (headers) setHeaders(headers);
        return;
      case 'remove':
        removeHeaders();
        break;
    }
  }, []);

  return (
    <div>
      <h3>SessionProvider TEST.</h3>
      <div data-testid={'uid'}>{getHeaders().uid}</div>
      <div data-testid={'token'}>{getHeaders()['access-token']}</div>
      <div data-testid={'client'}>{getHeaders().client}</div>
      <div data-testid={'has-token'}>{hasToken() ? 'TRUE' : 'FALSE'}</div>
      <div data-testid={'undefined'}>{undefined}</div>
    </div>
  );
};

describe('SessionProvider', () => {
  it('子要素がレンダリングされている', () => {
    const { getByTestId } = render(
      <SessionProvider>
        <div data-testid="child" />
      </SessionProvider>
    );
    expect(getByTestId('child')).toBeInTheDocument();
  });

  describe('getHeaders 検証', () => {
    it('cookie にすべてデータが存在する', () => {
      mockToken = { token: { ...initToken } };
      const { getByTestId } = render(
        <SessionProvider>
          <ChildComponent methodType={'uid'} uid={'UID001'} />
        </SessionProvider>
      );

      expect(getByTestId('uid').textContent).toEqual(initToken.uid);
      expect(getByTestId('token').textContent).toEqual(
        initToken['access-token']
      );
      expect(getByTestId('client').textContent).toEqual(initToken.client);
      expect(mockSetCookie).toHaveBeenCalledTimes(1);
      expect(mockSetCookie).toHaveBeenCalledWith('token', { uid: 'UID001' });
    });
    it('cookie が空の場合でも正常に表示される', () => {
      mockToken = {};
      const { getByTestId } = render(
        <SessionProvider>
          <ChildComponent />
        </SessionProvider>
      );
      expect(getByTestId('uid').textContent).toEqual('');
      expect(getByTestId('token').textContent).toEqual('');
      expect(getByTestId('client').textContent).toEqual('');
    });
  });

  describe('hasToken 検証', () => {
    it('token がある場合は true', () => {
      mockToken = { token: { 'access-token': 'MY_ACCESS_TOKEN' } };
      const { getByTestId } = render(
        <SessionProvider>
          <ChildComponent />
        </SessionProvider>
      );
      expect(getByTestId('has-token').textContent).toEqual('TRUE');
    });
    it('token が undefined の場合は false', () => {
      mockToken = { token: { 'access-token': undefined } };
      const { getByTestId } = render(
        <SessionProvider>
          <ChildComponent />
        </SessionProvider>
      );
      expect(getByTestId('has-token').textContent).toEqual('FALSE');
    });
    it('token が 空白の場合は false', () => {
      mockToken = { token: { 'access-token': '' } };
      const { getByTestId } = render(
        <SessionProvider>
          <ChildComponent />
        </SessionProvider>
      );
      expect(getByTestId('has-token').textContent).toEqual('FALSE');
    });
  });

  describe('initializeByUid 検証', () => {
    it('cookie には uid のみを保存する', () => {
      mockToken = { token: { ...initToken } };
      render(
        <SessionProvider>
          <ChildComponent methodType={'uid'} uid={'UID_ONLY'} />
        </SessionProvider>
      );
      expect(mockSetCookie).toHaveBeenCalledTimes(1);
      expect(mockSetCookie).toHaveBeenCalledWith('token', { uid: 'UID_ONLY' });
    });
  });

  describe('setHeaders 検証', () => {
    it('引数の型が Headers の場合に正しく cookie へ保存されている', () => {
      const headerToken = {
        'access-token': 'TOKEN-001',
        uid: 'UID-001',
        client: 'CLIENT-001',
      };
      render(
        <SessionProvider>
          <ChildComponent methodType={'set'} headers={headerToken} />
        </SessionProvider>
      );
      expect(mockSetCookie).toHaveBeenCalledTimes(1);
      expect(mockSetCookie).toHaveBeenCalledWith('token', headerToken);
    });

    it('引数の型が AxiosResponse<Headers> の場合に正しく cookie へ保存されている', () => {
      const headers = {
        'access-token': 'TOKEN-002',
        uid: 'UID-002',
        client: 'CLIENT-002',
      } as Headers;
      const response = {
        headers,
      } as AxiosResponse;

      render(
        <SessionProvider>
          <ChildComponent methodType={'set'} headers={response} />
        </SessionProvider>
      );
      expect(mockSetCookie).toHaveBeenCalledTimes(1);
      expect(mockSetCookie).toHaveBeenCalledWith('token', headers);
    });

    describe('access-token が', () => {
      let baseHeaders = {
        uid: 'UID-AAA',
        client: 'CLIENT-AAA',
      };
      it('未定義の場合は cookie へ保存しない', () => {
        render(
          <SessionProvider>
            <ChildComponent methodType={'set'} headers={{ ...baseHeaders }} />
          </SessionProvider>
        );
        expect(mockSetCookie).toHaveBeenCalledTimes(0);
      });
      it('undefined の場合は cookie へ保存しない', () => {
        render(
          <SessionProvider>
            <ChildComponent
              methodType={'set'}
              headers={{ ...baseHeaders, 'access-token': undefined }}
            />
          </SessionProvider>
        );
        expect(mockSetCookie).toHaveBeenCalledTimes(0);
      });
      it('空白の場合は cookie へ保存しない', () => {
        render(
          <SessionProvider>
            <ChildComponent
              methodType={'set'}
              headers={{ ...baseHeaders, 'access-token': '' }}
            />
          </SessionProvider>
        );
        expect(mockSetCookie).toHaveBeenCalledTimes(0);
      });
      it('access-token が null の場合', () => {
        const invalidHeaders = {
          ...baseHeaders,
          'access-token': null,
        } as unknown as Headers;
        expect(() =>
          render(
            <SessionProvider>
              <ChildComponent methodType={'set'} headers={invalidHeaders} />
            </SessionProvider>
          )
        ).toThrow('Invalid access-token type error');
        expect(mockSetCookie).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('removeHeaders 検証', () => {
    mockToken = { token: { ...initToken } };
    render(
      <SessionProvider>
        <ChildComponent methodType={'remove'} />
      </SessionProvider>
    );
    expect(mockSetCookie).toHaveBeenCalledTimes(0);
    expect(mockRemoveCookie).toHaveBeenCalledTimes(1);
  });
});
