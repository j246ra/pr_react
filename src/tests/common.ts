import '@testing-library/jest-dom';
global.TextEncoder = require('util').TextEncoder;
export const mockNavigator = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigator,
}));
