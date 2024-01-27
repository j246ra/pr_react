import { render, screen } from '@testing-library/react';
import SessionLayout from '@session/SessionLayout';

describe('SessionLayout', () => {
  const children = <div>CHILDREN</div>;
  it('表示されていること', () => {
    render(<SessionLayout>{children}</SessionLayout>);
    expect(screen.getByText('CHILDREN')).toBeInTheDocument();
  });
});
