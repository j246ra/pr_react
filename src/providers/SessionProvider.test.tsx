import { act, renderHook } from '@testing-library/react';
import SessionProvider, {
  useSession,
  Headers,
  SessionProviderProps,
} from '@providers/SessionProvider';

jest.unmock('@providers/SessionProvider');

const initToken = {
  uid: 'uid',
  'access-token': 'access-token',
  client: 'client',
} as Headers;

describe('SessionProvider', () => {
  const wrapper = ({ children }: SessionProviderProps) => (
    <SessionProvider>{children}</SessionProvider>
  );
  it('initializeByUid 検証', () => {
    const { result } = renderHook(() => useSession(), { wrapper });
    act(() => {
      result.current.initializeByUid('UID-1111');
    });
    const headers = result.current.getHeaders();
    expect(headers.uid).toEqual('UID-1111');
  });

  describe('setHeaders 検証', () => {
    it('引数の型が Headers の場合に正常に保存できること', () => {
      const { result } = renderHook(() => useSession(), { wrapper });
      act(() => {
        result.current.setHeaders(initToken);
      });
      const headers = result.current.getHeaders();
      expect(initToken).toEqual(headers);
    });
    it('引数の型が AxiosResponse<Headers> の場合に正常に保存できること', () => {
      const { result } = renderHook(() => useSession(), { wrapper });
      const r = { headers: initToken };
      act(() => {
        result.current.setHeaders(r as any);
      });
      const headers = result.current.getHeaders();
      expect(initToken).toEqual(headers);
    });
    it('access-token が無効（空白 or undefined）の場合は保存しない', () => {
      const { result } = renderHook(() => useSession(), { wrapper });
      act(() => {
        result.current.initializeByUid('UID-1111');
        result.current.setHeaders({ ...initToken, 'access-token': '' });
      });
      const headers = result.current.getHeaders();
      expect(headers.uid).toEqual('UID-1111');
    });
    it('access-token が不正（文字列型以外）の場合はエラーを投げること', () => {
      const { result } = renderHook(() => useSession(), { wrapper });
      act(() => {
        result.current.initializeByUid('UID-1111');
        expect(() =>
          result.current.setHeaders({
            ...initToken,
            'access-token': 1111 as any,
          })
        ).toThrowError('Invalid access-token type error.');
      });
    });
  });

  describe('hasToken 検証', () => {
    it('有効な access-token の場合 true', () => {
      const { result } = renderHook(() => useSession(), { wrapper });
      act(() => {
        result.current.setHeaders(initToken);
      });
      expect(result.current.hasToken()).toBeTruthy();
      act(() => {
        result.current.removeHeaders();
      });
    });
    it('無効な access-token の場合 false', () => {
      const { result } = renderHook(() => useSession(), { wrapper });
      act(() => {
        result.current.removeHeaders();
      });
      expect(result.current.hasToken()).toBeFalsy();
    });
  });

  it('removeHeaders 検証', async () => {
    const { result } = renderHook(() => useSession(), { wrapper });
    act(() => {
      result.current.setHeaders(initToken);
    });
    const headers = result.current.getHeaders();
    expect(initToken).toEqual(headers);
    act(() => {
      result.current.removeHeaders();
    });
    expect(result.current.getHeaders()).toEqual({
      'access-token': undefined,
      uid: undefined,
      client: undefined,
    });
  });
});
