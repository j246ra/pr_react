import { renderHook, waitFor } from '@testing-library/react';
import SessionProvider, {
  useSession,
  Headers,
  SessionProviderProps,
} from '@providers/SessionProvider';
import { AxiosResponse } from 'axios';

jest.unmock('@providers/SessionProvider');

const initToken = {
  uid: 'uid',
  'access-token': 'access-token',
  client: 'client',
} as Headers;

const mockSetCookie = jest.fn();
const mockRemoveCookie = jest.fn();

jest.mock('react-cookie', () => {
  const originalModule = jest.requireActual('react-cookie');
  return {
    __esModule: true,
    ...originalModule,
    useCookies: () => [{ token: initToken }, mockSetCookie, mockRemoveCookie],
  };
});

describe('SessionProvider', () => {
  const wrapper = ({ children }: SessionProviderProps) => (
    <SessionProvider>{children}</SessionProvider>
  );
  const { result } = renderHook(() => useSession(), { wrapper });
  it('initializeByUid 検証', async () => {
    expect(mockSetCookie).not.toBeCalled();
    result.current.initializeByUid('UID-1111');
    await waitFor(() => {
      expect(mockSetCookie).toHaveBeenCalledTimes(1);
      expect(mockSetCookie).toHaveBeenCalledWith('token', { uid: 'UID-1111' });
    });
  });

  it('getHeaders 検証', async () => {
    let tokens: Headers = result.current.getHeaders();
    await waitFor(() => {
      expect(tokens).toEqual(initToken);
    });
  });

  describe('setHeaders 検証', () => {
    it('引数の型が Headers の場合に正しく cookie へ保存されている', () => {
      const headers = {
        'access-token': 'TOKEN-001',
        uid: 'UID-001',
        client: 'CLIENT-001',
      } as Headers;
      result.current.setHeaders(headers);
      expect(mockSetCookie).toHaveBeenCalledTimes(1);
      expect(mockSetCookie).toHaveBeenCalledWith('token', headers);
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
      result.current.setHeaders(response);
      expect(mockSetCookie).toHaveBeenCalledTimes(1);
      expect(mockSetCookie).toHaveBeenCalledWith('token', headers);
    });

    describe('access-token が', () => {
      let baseHeaders = {
        uid: 'UID-AAA',
        client: 'CLIENT-AAA',
      };
      it('未定義の場合は cookie へ保存しない', () => {
        result.current.setHeaders(baseHeaders);
        expect(mockSetCookie).toHaveBeenCalledTimes(0);
      });
      it('undefined の場合は cookie へ保存しない', () => {
        result.current.setHeaders({
          ...baseHeaders,
          'access-token': undefined,
        });
        expect(mockSetCookie).toHaveBeenCalledTimes(0);
      });
      it('空白の場合は cookie へ保存しない', () => {
        result.current.setHeaders({ ...baseHeaders, 'access-token': '' });
        expect(mockSetCookie).toHaveBeenCalledTimes(0);
      });
      it('access-token が null の場合', () => {
        const invalidHeaders = {
          ...baseHeaders,
          'access-token': null,
        } as unknown as Headers;
        expect(() => {
          result.current.setHeaders(invalidHeaders);
        }).toThrow('Invalid access-token type error');
        expect(mockSetCookie).toHaveBeenCalledTimes(0);
      });
    });
  });

  it('removeHeaders 検証', async () => {
    result.current.removeHeaders();
    await waitFor(() => {
      expect(mockRemoveCookie).toHaveBeenCalledTimes(1);
    });
  });
});
