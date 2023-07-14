import '@testing-library/jest-dom';
import { UserContextType, useUser } from '@providers/UserProvider';
import { useSession } from '@providers/SessionProvider';
import { useAuth } from '@providers/AuthApiProvider';

jest.mock('@providers/UserProvider');
jest.mock('@providers/SessionProvider');
jest.mock('@providers/AuthApiProvider');

export const mockUseUser = useUser as jest.MockedFunction<
  () => UserContextType
>;
export const mockUseSession = useSession as jest.MockedFunction<any>;
export const mockUseAuth = useAuth as jest.MockedFunction<any>;
