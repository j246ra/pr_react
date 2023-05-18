import React, { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie/cjs';
import { CookiesProvider } from 'react-cookie';

const SessionContext = createContext();
export const useSession = () => useContext(SessionContext);

// eslint-disable-next-line react/prop-types
export default function SessionProvider({ children }) {
  const [cookies, setCookie] = useCookies(['token']);
  const headers = () => {
    const cookie = { ...cookies.token };
    return {
      'access-token': cookie['access-token'],
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
  return (
    <CookiesProvider>
      <SessionContext.Provider value={{ headers, setToken }}>
        {children}
      </SessionContext.Provider>
    </CookiesProvider>
  );
}
