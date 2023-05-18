import React, { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie/cjs';
import { CookiesProvider } from 'react-cookie';

const SessionContext = createContext();
export const useSession = () => useContext(SessionContext);

// eslint-disable-next-line react/prop-types
export default function SessionProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const headers = () => {
    const cookie = { ...cookies.token };
    return {
      'access-token': cookie['access-token'],
      uid: cookie.uid,
      client: cookie.client,
    };
  };
  const hasToken = () => {
    const cookie = { ...cookies.token };
    return !(cookie['access-token'] === undefined || cookie['access-token'] === '');
  };
  const createToken = (uid) => {
    setCookie('token', { uid });
  };
  const getToken = () => {
    const cookie = { ...cookies.token };
    return {
      token: cookie['access-token'],
      uid: cookie.uid,
      client: cookie.client,
    };
  };
  const setToken = (r) => {
    const cookie = {
      'access-token': r.headers['access-token'],
      uid: r.headers['uid'],
      client: r.headers['client'],
    };
    setCookie('token', cookie);
  };
  const removeToken = () => removeCookie('token');
  return (
    <CookiesProvider>
      <SessionContext.Provider
        value={{
          headers,
          createToken,
          getToken,
          hasToken,
          setToken,
          removeToken,
        }}
      >
        {children}
      </SessionContext.Provider>
    </CookiesProvider>
  );
}
