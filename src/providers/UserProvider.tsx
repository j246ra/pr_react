import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Headers } from '@lib/api/client';

export type User = {
  email: string;
  sessionId: string | null;
};

const defaultUser = (): User => {
  return {
    email: '',
    sessionId: null,
  };
};

export type UserContextType = {
  user: User;
  getHeaders: () => Headers;
  createUser: (email: string) => void;
  saveUser: (user: Partial<User>) => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
  validSessionId: (validSessionId: string) => boolean;
  sessionIdIsBlank: () => boolean;
};

const UserContext = createContext({} as UserContextType);
export const useUser = () => useContext(UserContext);

export type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(defaultUser());

  const getHeaders = (): Headers => {
    return {
      'session-id': user.sessionId || undefined,
    };
  };

  const createUser = (email: string) => {
    setUser({ email, sessionId: '' });
  };

  const saveUser = (userData: Partial<User>) => {
    setUser({ ...user, ...userData });
  };

  const clearUser = () => {
    setUser({ ...defaultUser(), sessionId: '' });
  };

  const isLoggedIn = (): boolean => {
    return !sessionIdIsBlank();
  };

  const validSessionId = (validSessionId: string) => {
    if (validSessionId === undefined) return false;
    return user.sessionId === validSessionId;
  };

  const sessionIdIsBlank = () => {
    return (
      user.sessionId === '' ||
      user.sessionId === undefined ||
      user.sessionId === null
    );
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getHeaders,
        createUser,
        saveUser,
        clearUser,
        isLoggedIn,
        validSessionId,
        sessionIdIsBlank,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
