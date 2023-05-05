import React, { createContext, useContext } from 'react';
import { useUser } from './UserProvider';
import session from '../lib/api/session';

const AuthApiContext = createContext();
export const useAuth = () => useContext(AuthApiContext);

export default function AuthApiProvider({ children }) {
  const { user, updateToken } = useUser();
  const headers = {
    'access-token': user.token,
    uid: user.uid,
    client: user.client,
  };
  const responseInterceptor = (response) => {
    updateToken(response.headers['access-token']);
    return response;
  };
  const errorInterceptor = (error) => {
    return Promise.reject(error);
  };

  const authApi = session(headers, responseInterceptor, errorInterceptor);

  return (
    <AuthApiContext.Provider value={{ authApi, headers }}>
      {children}
    </AuthApiContext.Provider>
  );
}
