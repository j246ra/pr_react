import { act, renderHook } from '@testing-library/react';
import UserProvider, {
  UserProviderProps,
  useUser,
} from '@providers/UserProvider';

jest.unmock('@providers/UserProvider');

import { mockUseSession } from '@src/tests/baseProviders';

describe('UserProvider', () => {
  const wrapper = ({ children }: UserProviderProps) => (
    <UserProvider>{children}</UserProvider>
  );
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      initializeByUid: jest.fn(),
      getHeaders: jest.fn(),
    });
  });

  describe('createUser 検証', () => {
    it('通常の email 場合、User 作成に成功すること', () => {
      const { result } = renderHook(() => useUser(), { wrapper });
      const email = 'test1@example.com';
      act(() => result.current.createUser(email));
      expect(result.current.user.email).toEqual(email);
      expect(mockUseSession().initializeByUid).not.toHaveBeenCalledTimes(1);
    });
    it('ブランクの場合でも、 User 作成に成功すること', () => {
      const { result } = renderHook(() => useUser(), { wrapper });
      const email = '';
      act(() => result.current.createUser(email));
      expect(result.current.user.email).toEqual(email);
      expect(mockUseSession().initializeByUid).not.toHaveBeenCalledTimes(1);
    });
  });

  describe('saveUser 検証', () => {
    it('通常の email 場合、User 更新に成功すること', () => {
      const { result } = renderHook(() => useUser(), { wrapper });
      const beforeEmail = 'before@example.com';
      const afterEmail = 'after@example.com';
      act(() => result.current.createUser(beforeEmail));
      expect(result.current.user.email).toEqual(beforeEmail);
      act(() => result.current.saveUser({ email: afterEmail }));
      expect(result.current.user.email).toEqual(afterEmail);
    });
    it('ブランクの場合でも、 User 更新に成功すること', () => {
      const { result } = renderHook(() => useUser(), { wrapper });
      const beforeEmail = 'before@example.com';
      const afterEmail = '';
      act(() => result.current.createUser(beforeEmail));
      act(() => result.current.saveUser({ email: afterEmail }));
      expect(result.current.user.email).toEqual(afterEmail);
    });
  });

  it('clearUser 検証', () => {
    const { result } = renderHook(() => useUser(), { wrapper });
    const beforeEmail = 'before@example.com';
    act(() => result.current.createUser(beforeEmail));
    expect(result.current.user.email).toEqual(beforeEmail);
    act(() => result.current.clearUser());
    expect(result.current.user.email).toEqual('');
  });

  describe('isLoggedIn ログイン状態検証', () => {
    it('sessionIdが存在する場合はログイン状態', () => {
      const { result } = renderHook(() => useUser(), { wrapper });
      const sessionId = 'session-id';
      act(() => result.current.saveUser({ sessionId }));
      act(() => expect(result.current.isLoggedIn()).toBeTruthy());
    });

    it('sessionIdがブランクのときは未ログイン状態', () => {
      const { result } = renderHook(() => useUser(), { wrapper });
      act(() => result.current.clearUser());
      expect(result.current.user).toEqual({ email: '', sessionId: '' });
      act(() => expect(result.current.isLoggedIn()).toBeFalsy());
    });
  });
});
