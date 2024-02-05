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
  isLoggedIn: () => boolean;
};

const UserContext = createContext({} as UserContextType);
export const useUser = () => useContext(UserContext);

export type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const { initializeByUid, getHeaders, hasToken } = useSession();
  const [user, setUser] = useState<User>({
    email: getHeaders()?.uid || '',
  });

  const createUser = (email: string) => {
    setUser({ ...user, email });
    initializeByUid(email);
  };

  const updateUser = (email: string) => {
    setUser({ ...user, email });
  };

  const clearUser = () => {
    setUser({ email: '' });
  };

  const isLoggedIn = (): boolean => {
    return user.email !== '' && hasToken();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        updateUser,
        clearUser,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
