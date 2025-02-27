import { User, UserContextType } from '@providers/UserProvider';

export const userContextValues: UserContextType = {
  isLoggedIn: () => false,
  user: { email: '', sessionId: '' } as User,
  getHeaders: () => {
    return { 'session-id': '' };
  },
  createUser: () => {},
  saveUser: () => {},
  clearUser: () => {},
  validSessionId: () => true,
  sessionIdIsBlank: () => false,
};
