import React, { createContext, useState, useContext } from 'react';
import { useSession } from './SessionProvider';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// eslint-disable-next-line react/prop-types
export default function UserProvider({ children }) {
  const { getToken } = useSession();
  const [user, setUser] = useState({
    email: getToken()?.uid || '',
  });

  const createUser = (email) => {
    setUser({ ...user, email });
  };

  const updateUser = (email) => {
    setUser({ ...user, email });
  };

  const clearUser = () => {
    setUser({ email: '' });
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
