import '@testing-library/jest-dom';
import { useUser } from '@providers/UserProvider';
import { useSession } from '@providers/SessionProvider';

jest.mock('@providers/UserProvider');
jest.mock('@providers/SessionProvider');

export const mockUseUser = useUser as jest.MockedFunction<any>;
export const mockUseSession = useSession as jest.MockedFunction<any>;
