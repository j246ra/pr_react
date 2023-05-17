import React, { createContext, useState, useContext } from 'react';
import { useCookies } from 'react-cookie/cjs';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// eslint-disable-next-line react/prop-types
export default function UserProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [user, setUser] = useState({
    email: cookies.token?.uid || '',
  });

  const createUser = (email) => {
    removeCookie('token');
    setUser({ ...user, email });
    setCookie('token', { uid: email });
  };

  const updateUser = (email) => {
    setUser({ ...user, email });
  };

  const clearUser = () => {
    removeCookie('token');
    setUser({ email: '' });
  };

  const isLogin = () => {
    const client = cookies.token?.client || '';
    return user.email !== '' && client !== '';
  };

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        updateUser,
        clearUser,
        isLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
