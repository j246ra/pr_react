import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useSession } from './SessionProvider';
import session from '@lib/api/session';

export type User = {
  email: string;
  sessionId: string;
};

export type UserContextType = {
  user: User;
  createUser: (email: string) => void;
  updateUser: (email: string) => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
  checkAuthenticated: () => void;
};

const UserContext = createContext({} as UserContextType);
export const useUser = () => useContext(UserContext);

export type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const { initializeByUid, getHeaders, hasToken } = useSession();
  const [user, setUser] = useState<User>({
    email: getHeaders()?.uid || '',
    sessionId: getHeaders()['session-id'] || '',
  });
  const api = session(getHeaders)

  const createUser = (email: string) => {
    setUser({ ...user, email });
    initializeByUid(email);
  };

  const updateUser = (email: string) => {
    setUser({ ...user, email });
  };

  const clearUser = () => {
    setUser({ email: '', sessionId: '' });
  };

  const isLoggedIn = (): boolean => {
    return user.email !== '' && hasToken();
  };

  const checkAuthenticated = () => {
    api.validate().then((r) => {
      if (r.status == 200) {
        // TODO responseInterceptor に実装
        setUser({...user, sessionId: r.headers['session-id']})
      }else{
        // TODO errorInterceptor に実装
        throw new Error()
      }
    })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        updateUser,
        clearUser,
        isLoggedIn,
        checkAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
