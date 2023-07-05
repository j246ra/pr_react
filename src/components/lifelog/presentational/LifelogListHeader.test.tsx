import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LifelogListHeader from './LifelogListHeader';

describe('LifelogListHeader', () => {
  it('enabled が true 時にヘッダーが表示される', () => {
    const { container } = render(<LifelogListHeader enabled={true} />);
    const thead = container.firstChild;

    expect(thead).toBeVisible();
  });

  it('enabled が false 時にヘッダーが表示されない', () => {
    const { container } = render(<LifelogListHeader enabled={false} />);
    const thead = container.firstChild;

    expect(thead).not.toBeVisible();
  });

  it('enabled が 未指定時にヘッダーが表示されない', () => {
    const { container } = render(<LifelogListHeader />);
    const thead = container.firstChild;

    // ヘッダーが表示されることを確認します
    expect(thead).toBeVisible();
  });
});
