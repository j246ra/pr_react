import { render, screen } from '@testing-library/react';
import ReloadRequiredDialog from '@src/components/ReloadRequiredDialog';

describe('ErrorAlert', () => {
  it('正しく表示されていること', () => {
    render(<ReloadRequiredDialog message={'error message.'} />);
    const el = screen.getByText('error message.');
    expect(el).toHaveTextContent('error message.');
  });
});
