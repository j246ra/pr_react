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

const UserContext = createContext<UserContextType | undefined>(undefined);
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

type Props = {
  children: ReactNode;
};

export default function UserProvider({ children }: Props) {
  const { getHeaders, hasToken } = useSession();
  const [user, setUser] = useState<User>({
    email: getHeaders()?.uid || '',
  });

  const createUser = (email: string) => {
    setUser({ ...user, email });
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
}
