import { render, screen } from '@testing-library/react';
import BaseLayout from '@src/components/BaseLayout';

describe('BaseLayout', () => {
  const children = <div>CHILDREN</div>;
  it('表示されていること', () => {
    render(<BaseLayout>{children}</BaseLayout>);
    expect(screen.getByText('CHILDREN')).toBeInTheDocument();
  });
});
