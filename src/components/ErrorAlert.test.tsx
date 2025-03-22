import { render, screen } from '@testing-library/react';
import { ErrorAlert } from '@src/components/ErrorAlert';

describe('ErrorAlert', () => {
  it('正しく表示されていること', () => {
    render(
      <ErrorAlert
        error={{ message: 'error message.' }}
        resetErrorBoundary={() => {}}
      />
    );
    const el = screen.getByText('error message.');
    expect(el).toHaveTextContent('error message.');
  });
});
