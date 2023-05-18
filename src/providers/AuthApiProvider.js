import React, { createContext, useContext } from 'react';
import { useUser } from './UserProvider';
import session from '../lib/api/session';
import { useSession } from './SessionProvider';

const AuthApiContext = createContext();
export const useAuth = () => useContext(AuthApiContext);

// eslint-disable-next-line react/prop-types
export default function AuthApiProvider({ children }) {
  const { headers, setToken } = useSession();
  const { user, updateUser } = useUser();
  const responseInterceptor = (response) => {
    setToken(response);
    if (user.email !== response.headers['uid'])
      updateUser(response.headers['uid']);
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
