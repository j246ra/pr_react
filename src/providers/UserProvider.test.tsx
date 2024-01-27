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
      hasToken: jest.fn(),
    });
  });

  describe('createUser 検証', () => {
    it('通常の email 場合、User 作成に成功すること', () => {
      const { result } = renderHook(() => useUser(), { wrapper });
      const email = 'test1@example.com';
      act(() => result.current.createUser(email));
      expect(result.current.user.email).toEqual(email);
      expect(mockUseSession().initializeByUid).toHaveBeenCalledTimes(1);
      expect(mockUseSession().initializeByUid).toHaveBeenCalledWith(email);
    });
    it('ブランクの場合でも、 User 作成に成功すること', () => {
      const { result } = renderHook(() => useUser(), { wrapper });
      const email = '';
      act(() => result.current.createUser(email));
      expect(result.current.user.email).toEqual(email);
      expect(mockUseSession().initializeByUid).toHaveBeenCalledTimes(1);
      expect(mockUseSession().initializeByUid).toHaveBeenCalledWith(email);
    });
  });

  describe('updateUser 検証', () => {
    it('通常の email 場合、User 更新に成功すること', () => {
      const { result } = renderHook(() => useUser(), { wrapper });
      const beforeEmail = 'before@example.com';
      const afterEmail = 'after@example.com';
      act(() => result.current.createUser(beforeEmail));
      expect(result.current.user.email).toEqual(beforeEmail);
      act(() => result.current.updateUser(afterEmail));
      expect(result.current.user.email).toEqual(afterEmail);
    });
    it('ブランクの場合でも、 User 更新に成功すること', () => {
      const { result } = renderHook(() => useUser(), { wrapper });
      const beforeEmail = 'before@example.com';
      const afterEmail = '';
      act(() => result.current.createUser(beforeEmail));
      act(() => result.current.updateUser(afterEmail));
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
    it('email と access-token が 存在する時はログイン状態', () => {
      mockUseSession().hasToken = jest.fn().mockReturnValue(true);
      const { result } = renderHook(() => useUser(), { wrapper });
      const email = 'test1@example.com';
      act(() => result.current.createUser(email));
      expect(result.current.user.email).toEqual(email);
      act(() => expect(result.current.isLoggedIn()).toBeTruthy());
    });
    it('email が ブランクの時は未ログイン状態', () => {
      mockUseSession().hasToken = jest.fn().mockReturnValue(true);
      const { result } = renderHook(() => useUser(), { wrapper });
      const email = '';
      act(() => result.current.createUser(email));
      expect(result.current.user.email).toEqual(email);
      act(() => expect(result.current.isLoggedIn()).toBeFalsy());
    });
    it('access-token が存在しない場合は未ログイン状態', () => {
      mockUseSession().hasToken = jest.fn().mockReturnValue(false);
      const { result } = renderHook(() => useUser(), { wrapper });
      const email = 'test1@example.com';
      act(() => result.current.createUser(email));
      expect(result.current.user.email).toEqual(email);
      act(() => expect(result.current.isLoggedIn()).toBeFalsy());
    });
    it('email が ブランクで access-token が存在しない場合は未ログイン状態', () => {
      mockUseSession().hasToken = jest.fn().mockReturnValue(false);
      const { result } = renderHook(() => useUser(), { wrapper });
      const email = '';
      act(() => result.current.createUser(email));
      expect(result.current.user.email).toEqual(email);
      act(() => expect(result.current.isLoggedIn()).toBeFalsy());
    });
  });
});
