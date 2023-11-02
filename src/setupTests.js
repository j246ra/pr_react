// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const originalConsoleError = console.error;

console.error = (...args) => {
  if (
    args[0].includes(
      'Warning: An update to %s inside a test was not wrapped in'
    ) &&
    args[1] === 'Blueprint5.Icon'
  ) {
    return;
  }
  originalConsoleError(...args);
};
