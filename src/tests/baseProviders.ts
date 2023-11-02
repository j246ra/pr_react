import '@testing-library/jest-dom';
import { useUser } from '@providers/UserProvider';
import { useSession } from '@providers/SessionProvider';
import { useAuth } from '@providers/AuthApiProvider';

jest.mock('@providers/UserProvider');
jest.mock('@providers/SessionProvider');
jest.mock('@providers/AuthApiProvider');

export const mockUseUser = useUser as jest.MockedFunction<any>;
export const mockUseSession = useSession as jest.MockedFunction<any>;
export const mockUseAuth = useAuth as jest.MockedFunction<any>;
