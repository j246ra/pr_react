import React, { createContext, useContext } from 'react';
import { useUser } from './UserProvider';
import session from '../lib/api/session';
import { useCookies } from 'react-cookie/cjs';

const AuthApiContext = createContext();
export const useAuth = () => useContext(AuthApiContext);

// eslint-disable-next-line react/prop-types
export default function AuthApiProvider({ children }) {
  const [cookies, setCookie] = useCookies(['token']);
  const { user, updateUser } = useUser();
  const headers = () => {
    const cookie = { ...cookies.token };
    return {
      'access-token': cookie['access-token'],
      uid: cookie.uid,
      client: cookie.client,
    };
  };
  const responseInterceptor = (response) => {
    const cookie = {
      'access-token': response.headers['access-token'],
      uid: response.headers['uid'],
      client: response.headers['client'],
    };
    setCookie('token', cookie);
    if (user.email !== cookie.uid) updateUser(cookie.uid);
    return response;
  };
  const errorInterceptor = (error) => {
    return Promise.reject(error);
  };

  const authApi = session(headers(), responseInterceptor, errorInterceptor);

  return (
    <AuthApiContext.Provider value={{ authApi, headers }}>
      {children}
    </AuthApiContext.Provider>
  );
}
