import { render, screen, fireEvent } from '@testing-library/react';
import InputEmail from './InputEmail';

test('email form test', () => {
  render(<InputEmail />);
  const input = screen.getByLabelText(/メールアドレス/);
  fireEvent.change(input, { target: { value: 'junkichii@gmail.com' } });
  expect(input.value).toEqual('junkichii@gmail.com');
});
