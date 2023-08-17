import { act, renderHook } from '@testing-library/react';
import SessionProvider, {
  useSession,
  SessionProviderProps,
} from '@providers/SessionProvider';

jest.unmock('@providers/SessionProvider');

describe('SessionProvider', () => {
  const wrapper = ({ children }: SessionProviderProps) => (
    <SessionProvider>{children}</SessionProvider>
  );
  const { result } = renderHook(() => useSession(), { wrapper });
  describe('hasToken 検証', () => {
    it('有効な access-token の場合 true', () => {
      act(() => {
        result.current.setHeaders({
          'access-token': 'abc0001',
          uid: 'uid',
          client: 'client',
        });
      });
      expect(result.current.hasToken()).toBeTruthy();
      act(() => {
        result.current.removeHeaders();
      });
    });
    it('無効な access-token の場合 false', () => {
      act(() => {
        result.current.removeHeaders();
      });
      expect(result.current.hasToken()).toBeFalsy();
    });
  });
});
