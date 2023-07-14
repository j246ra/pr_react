import '@testing-library/jest-dom';

jest.mock('@providers/SessionProvider');
export const mockNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigator,
}));
