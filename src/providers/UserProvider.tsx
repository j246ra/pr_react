import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Headers, useSession } from './SessionProvider';
import session from '@lib/api/session';
import notify from '@lib/toast';
import { API, COMMON } from '@lib/consts/common';
import { AxiosError, AxiosResponse } from 'axios';
import toast from '@lib/toast';
import { LOGIN } from '@lib/consts/component';

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
  checkAuthenticated: () => void;
};

const UserContext = createContext({} as UserContextType);
export const useUser = () => useContext(UserContext);

export type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const { getHeaders: cookieHeaders } = useSession();
  const [user, setUser] = useState<User>(defaultUser());

  const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response;
  };
  const errorInterceptor = (defaultErrorMessage?: string) => {
    return (error: AxiosError) => {
      switch (error.response?.status) {
        case 401:
          clearUser();
          break;
        case 500:
        case 501:
        case 502:
        case 503:
          notify.error(COMMON.MESSAGE.ERROR.STATUS_5XX);
          break;
        default:
          notify.error(defaultErrorMessage || COMMON.MESSAGE.ERROR.GENERAL);
      }
      return Promise.reject(error);
    };
  };

  const getHeaders = (): Headers => {
    const cookie = cookieHeaders() as Headers;
    return {
      'access-token': cookie['access-token'],
      uid: cookie.uid,
      client: cookie.client,
      'session-id': user.sessionId || undefined,
    };
  };

  const api = session(getHeaders, responseInterceptor, errorInterceptor());

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

  const checkAuthenticated = () => {
    if (user.sessionId !== null) return;
    api
      .validate()
      .then((r) => {
        if (sessionIdIsBlank()) {
          saveUser({
            email: r.headers['uid'] || '',
            sessionId: r.headers['session-id'] || '',
          });
        } else if (validSessionId(r.headers['session-id'])) {
          throw new Error(API.MESSAGE.ERROR.INVALID_TOKEN);
        }
        return r;
      })
      .catch(() => {
        toast.info(LOGIN.MESSAGE.ERROR.NEED_LOGIN);
      });
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
        checkAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
