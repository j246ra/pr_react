import { render } from '@testing-library/react';
import LifelogListItemSp from '@lifelog/presentational/LifelogListItemSp';
import { Lifelog } from '@providers/LifelogProvider';
import { days } from '@lib/dateUtil';
import { lifelog } from '@lib/faker/lifelog';

describe('LifeLogListItemSp', () => {
  const mockOnEdit = jest.fn();
  const startedAt = days('2023-07-05 12:34');
  const baseLog = {
    startedAt: startedAt.toISOString(),
    action: 'Test action',
    detail: 'Test detail',
  };
  const lifelogListItemSpComponent = (mockLifelog: Lifelog) => {
    return (
      <table>
        <tbody>
          <LifelogListItemSp log={mockLifelog} onEditButtonClick={mockOnEdit} />
        </tbody>
      </table>
    );
  };

  it('プロパティが正しくレンダリングされる', () => {
    const mockLog = lifelog({
      ...baseLog,
      finishedAt: null,
    });

    const { container, getByText } = render(
      lifelogListItemSpComponent(mockLog)
    );

    expect(getByText(startedAt.format('HH:mm'))).toBeInTheDocument();
    expect(getByText(baseLog.action)).toBeInTheDocument();
    expect(getByText(baseLog.detail)).toBeInTheDocument();
    expect(container.getElementsByClassName('bold')).toHaveLength(0);
  });

  describe('終了時間が設定されている', () => {
    it('経過分が表示される', () => {
      const elapsedMinutes = 999;
      const mockLog = lifelog({
        ...baseLog,
        finishedAt: startedAt.add(elapsedMinutes, 'minutes').toISOString(),
      });

      const { container } = render(lifelogListItemSpComponent(mockLog));
      expect(container.getElementsByClassName('bold')).toHaveLength(1);
    });
  });
});
