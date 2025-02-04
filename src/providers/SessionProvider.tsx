import React, { createContext, ReactNode, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';
import { COMMON } from '@lib/consts/common';

type SessionContextType = {
  getHeaders: () => Headers;
  removeHeaders: () => void;
};

const SessionContext = createContext({} as SessionContextType);
export const useSession = () => useContext(SessionContext);

export type Headers = {
  'access-token'?: string;
  uid?: string;
  client?: string;
  'session-id'?: string;
};

export type SessionProviderProps = {
  children: ReactNode;
};

const defaultOptions = {
  path: COMMON.APP_URL.BASE_DIR,
};

export default function SessionProvider({ children }: SessionProviderProps) {
  const [cookies, removeCookie] = useCookies(['token']);

  const getHeaders = (): Headers => {
    const cookie = { ...(cookies.token as Headers) };
    return {
      'access-token': cookie['access-token'],
      uid: cookie.uid,
      client: cookie.client,
      'session-id': cookie['session-id'],
    };
  };

  const removeHeaders = (): void => removeCookie('token', {});

  return (
    <CookiesProvider defaultSetOptions={defaultOptions}>
      <SessionContext.Provider
        value={{
          getHeaders,
          removeHeaders,
        }}
      >
        {children}
      </SessionContext.Provider>
    </CookiesProvider>
  );
}
