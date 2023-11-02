import { render, screen } from '@testing-library/react';
import NotFound from '@src/components/NotFound';
import { NOTFOUND } from '@lib/consts/component';

describe('NotFound', () => {
  it('正しく表示されていること', () => {
    render(<NotFound />);
    const el = screen.getByText(NOTFOUND.CONTEXT);
    expect(el.tagName).toEqual('H3');
  });
});
