import { renderHook } from '@testing-library/react';
import SessionProvider, {
  useSession,
  SessionProviderProps,
} from '@providers/SessionProvider';

jest.unmock('@providers/SessionProvider');

const mockSetCookie = jest.fn();
const mockRemoveCookie = jest.fn();

jest.mock('react-cookie', () => {
  const originalModule = jest.requireActual('react-cookie');
  return {
    __esModule: true,
    ...originalModule,
    useCookies: () => [{ token: {} }, mockSetCookie, mockRemoveCookie],
  };
});

describe('SessionProvider', () => {
  const wrapper = ({ children }: SessionProviderProps) => (
    <SessionProvider>{children}</SessionProvider>
  );
  const { result } = renderHook(() => useSession(), { wrapper });
  describe('hasToken 検証', () => {
    it('無効な access-token の場合 false', () => {
      // モック化している cookie を差し替える方法を調査中
      expect(result.current.hasToken()).toBeFalsy();
    });
  });
});
