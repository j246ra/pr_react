import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useSession } from './SessionProvider';

export type User = {
  email: string;
};

export type UserContextType = {
  user: User;
  createUser: (email: string) => void;
  updateUser: (email: string) => void;
  clearUser: () => void;
  isLogin: () => boolean;
};

const UserContext = createContext({} as UserContextType);
export const useUser = () => useContext(UserContext);

type Props = {
  children: ReactNode;
};

const UserProvider: React.FC<Props> = ({ children }) => {
  const { initCookieByUid, getHeaders, hasToken } = useSession();
  const [user, setUser] = useState<User>({
    email: getHeaders()?.uid || '',
  });

  const createUser = (email: string) => {
    setUser({ ...user, email });
    initCookieByUid(email);
  };

  const updateUser = (email: string) => {
    setUser({ ...user, email });
  };

  const clearUser = () => {
    setUser({ email: '' });
  };

  const isLogin = (): boolean => {
    return user.email !== '' && hasToken();
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
};

export default UserProvider;
