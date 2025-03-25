import '@testing-library/jest-dom';
import { useUser } from '@providers/UserProvider';

jest.mock('@providers/UserProvider');

export const mockUseUser = useUser as jest.MockedFunction<any>;
