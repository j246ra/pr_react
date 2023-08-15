import { render } from '@testing-library/react';
import UserProvider, { useUser } from '@providers/UserProvider';

jest.unmock('@providers/UserProvider');

import * as SessionContext from './SessionProvider';
import { useSession } from './SessionProvider';
import React, { useEffect } from 'react';
let sessionSpy: jest.SpyInstance<unknown>;
const initializeByUidSpy = jest.fn();
const getHeaderSpy = jest.fn().mockImplementation(() => {
  return { uid: 'test666@example.com' };
});
let hasTokenSpy = jest.fn().mockImplementation(() => true);
beforeEach(() => {
  sessionSpy = jest.spyOn(SessionContext, 'useSession');
  sessionSpy.mockImplementation(() => {
    return {
      initializeByUid: initializeByUidSpy,
      getHeaders: getHeaderSpy,
      hasToken: hasTokenSpy,
    };
  });
});
afterEach(() => {
  sessionSpy.mockClear();
});

describe('UserProvider', () => {
  it('子要素がレンダリングされる', () => {
    const { getByTestId } = render(
      <UserProvider>
        <h3 data-testid={'child'}>TEST for UserProvider.</h3>
      </UserProvider>
    );
    expect(getByTestId('child')).toBeInTheDocument();
  });

  it('createUser 検証', () => {
    const email = 'test1@example.com';
    const ChildComponent: React.FC = () => {
      const { user, createUser } = useUser();
      useEffect(() => {
        createUser(email);
      }, []);
      return <div data-testid={'email'}>{user.email}</div>;
    };
    const { getByTestId } = render(
      <UserProvider>
        <ChildComponent />
      </UserProvider>
    );
    expect(getByTestId('email').textContent).toEqual(email);
    expect(initializeByUidSpy).toHaveBeenCalledWith(email);
  });

  it('updateUser 検証', () => {
    const email = 'test2@example.com';
    const ChildComponent: React.FC = () => {
      const { user, updateUser } = useUser();
      useEffect(() => {
        updateUser(email);
      }, []);
      return <div data-testid={'email'}>{user.email}</div>;
    };
    const { getByTestId } = render(
      <UserProvider>
        <ChildComponent />
      </UserProvider>
    );
    expect(getByTestId('email').textContent).toEqual(email);
  });

  it('clearUser 検証', () => {
    const ChildComponent: React.FC = () => {
      const { user, clearUser } = useUser();
      useEffect(() => {
        clearUser();
      }, []);
      return <div data-testid={'email'}>{user.email}</div>;
    };
    const { getByTestId } = render(
      <UserProvider>
        <ChildComponent />
      </UserProvider>
    );
    expect(getByTestId('email').textContent).toEqual('');
  });

  describe('isLogin 検証', () => {
    const ChildComponent: React.FC = () => {
      const { updateUser, isLogin } = useUser();
      useEffect(() => {
        updateUser('test11@exmaple.com');
      }, []);
      return <div data-testid={'isLogin'}>{isLogin() ? 'yes' : 'no'}</div>;
    };

    it('ログイン状態', () => {
      hasTokenSpy = jest.fn().mockImplementation(() => true);
      const { getByTestId } = render(
        <UserProvider>
          <ChildComponent />
        </UserProvider>
      );
      expect(getByTestId('isLogin').textContent).toEqual('yes');
    });
    it('未ログイン状態', () => {
      hasTokenSpy = jest.fn().mockImplementation(() => false);
      const { getByTestId } = render(
        <UserProvider>
          <ChildComponent />
        </UserProvider>
      );
      expect(getByTestId('isLogin').textContent).toEqual('no');
    });
  });
});
