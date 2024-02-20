import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContextInput from './ContextInput';
import { useLifelog } from '@providers/LifelogProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { CONTEXT_INPUT } from '@lib/consts/component';

jest.mock('@providers/LifelogProvider');

describe('ContextInput', () => {
  let createLogByContext: jest.Mock;

  beforeEach(() => {
    createLogByContext = jest.fn().mockResolvedValue({ status: 200 });
    (useLifelog as jest.Mock).mockReturnValue({
      createLogByContext,
    });
  });

  it('renders correctly', () => {
    render(
      <Router>
        <ContextInput />
      </Router>
    );

    const input = screen.getByPlaceholderText(CONTEXT_INPUT.PLACEHOLDER);
    expect(input).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    render(
      <Router>
        <ContextInput />
      </Router>
    );

    const testInput = 'Test input';

    const button = screen.getByRole('button');
    const input = screen.getByPlaceholderText(CONTEXT_INPUT.PLACEHOLDER);

    await waitFor(() => {
      fireEvent.change(input, { target: { value: testInput } });
      fireEvent.submit(button);
    });

    expect(createLogByContext).toHaveBeenCalledWith(
      testInput,
      CONTEXT_INPUT.MESSAGE.ERROR
    );
  });
});
