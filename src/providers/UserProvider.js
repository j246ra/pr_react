import React, { createContext, useState, useContext } from 'react';
import { useCookies } from 'react-cookie/cjs';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// eslint-disable-next-line react/prop-types
export default function UserProvider({ children }) {
  const [cookies, , removeCookie] = useCookies(['token']);
  const [user, setUser] = useState({
    email: cookies.token?.email || '',
    uid: cookies.token?.uid || '',
  });

  const createUser = (email) => setUser({ ...user, email });

  const updateUser = (email, uid) => {
    setUser({
      ...user,
      email,
      uid,
    });
  };

  const clearUser = () => {
    removeCookie('token');
    setUser({
      email: '',
      uid: '',
    });
  };

  const isLogin = () => {
    return user.email !== '' && user.uid !== '';
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
