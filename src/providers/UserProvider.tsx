import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useSession } from './SessionProvider';
import session from '@lib/api/session';

export type User = {
  email: string;
  sessionId: string;
};

const blankUser = (): User => {
  return {
    email: '',
    sessionId: '',
  };
};

export type UserContextType = {
  user: User;
  createUser: (email: string) => void;
  saveUser: (user: Partial<User>) => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
  validSessionId: (validSessionId: string) => boolean;
  sessionIdIsBlank: () => boolean;
  checkAuthenticated: () => void;
};

const UserContext = createContext({} as UserContextType);
export const useUser = () => useContext(UserContext);

export type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const { initializeByUid, getHeaders } = useSession();
  const [user, setUser] = useState<User>(blankUser());
  const api = session(getHeaders);

  const createUser = (email: string) => {
    setUser({ ...blankUser(), email });
    initializeByUid(email);
  };

  const saveUser = (userData: Partial<User>) => {
    setUser({ ...user, ...userData });
  };

  const clearUser = () => {
    setUser(blankUser());
  };

  const isLoggedIn = (): boolean => {
    return !sessionIdIsBlank();
  };

  const validSessionId = (validSessionId: string) => {
    if (validSessionId === undefined) return false;
    return user.sessionId === validSessionId;
  };

  const sessionIdIsBlank = () => {
    return user.sessionId === '' || user.sessionId === undefined;
  };

  const checkAuthenticated = () => {
    api
      .validate()
      .then((r) => {
        switch (r.status) {
          case 401:
            clearUser();
            break;
          case 200:
            setUser({
              email: r.data['email'],
              sessionId: r.headers['session-id'],
            });
            break;
          default:
            throw new Error(r.statusText);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        saveUser,
        clearUser,
        isLoggedIn,
        validSessionId,
        sessionIdIsBlank,
        checkAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
