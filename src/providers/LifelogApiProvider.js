import React, { createContext, useContext } from 'react';
import test from '../lib/api/test';
import { useUser } from './UserProvider';
import { useSession } from './SessionProvider';

const LifelogApiContext = createContext();
export const useLifelog = () => useContext(LifelogApiContext);

// eslint-disable-next-line react/prop-types
export default function LifelogApiProvider({ children }) {
  const { headers, setToken } = useSession();
  const { clearUser } = useUser();
  const responseInterceptor = (response) => {
    setToken(response);
    return response;
  };
  const errorInterceptor = (error) => {
    if (error?.status === 401) clearUser();
    return Promise.reject(error);
  };
  const lifelogApi = test(headers(), responseInterceptor, errorInterceptor);

  return (
    <LifelogApiContext.Provider value={{ lifelogApi }}>
      {children}
    </LifelogApiContext.Provider>
  );
}
