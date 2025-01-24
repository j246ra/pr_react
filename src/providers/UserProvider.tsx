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
  updateSessionId: (sessionId: string) => void;
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
  const { initializeByUid, getHeaders } = useSession();
  const [user, setUser] = useState<User>({
    email: '',
    sessionId: '',
  });
  const api = session(getHeaders)

  const createUser = (email: string) => {
    setUser({ ...user, email });
    initializeByUid(email);
  };

  const updateUser = (email: string) => {
    setUser({ ...user, email });
  };

  const updateSessionId = (sessionId: string) => {
    setUser({ ...user, sessionId });
  }

  const clearUser = () => {
    setUser({ email: '', sessionId: '' });
  };

  const isLoggedIn = (): boolean => {
    return (user.sessionId !== '' || user.sessionId !== undefined);
  };

  const checkAuthenticated = () => {
    api.validate().then((r) => {
      switch (r.status) {
        case 401:
          clearUser();
          break;
        case 200:
          setUser({email: r.data['email'], sessionId: r.headers['session-id']});
          break;
        default:
          throw new Error(r.statusText);
      }
    }).catch((err) => {
      console.log(err.message);
    })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        updateUser,
        updateSessionId,
        clearUser,
        isLoggedIn,
        checkAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
