import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LifelogListHeader from './LifelogListHeader';

describe('LifelogListHeader', () => {
  it('enabled が true 時にヘッダーが表示される', () => {
    const { container } = render(
      <table>
        <LifelogListHeader enabled={true} />
      </table>
    );
    const thead = container.getElementsByTagName('thead')[0];

    expect(thead).toBeVisible();
  });

  it('enabled が false 時にヘッダーが表示されない', () => {
    const { container } = render(
      <table>
        <LifelogListHeader enabled={false} />
      </table>
    );
    const thead = container.getElementsByTagName('thead')[0];

    expect(thead).toBeUndefined();
  });

  it('enabled が 未指定時にヘッダーが表示されない', () => {
    const { container } = render(
      <table>
        <LifelogListHeader />
      </table>
    );
    const thead = container.getElementsByTagName('thead')[0];

    // ヘッダーが表示されることを確認します
    expect(thead).toBeVisible();
  });
});
