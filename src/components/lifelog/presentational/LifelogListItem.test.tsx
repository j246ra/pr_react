import React from 'react';
import { render, screen } from '@testing-library/react';
import LifelogListItem from './LifelogListItem';
import userEvent from '@testing-library/user-event';
import { lifelog } from '@lib/faker/lifelog';
import { LIFELOG_LIST_ITEM_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { days, DISPLAY_DATETIME } from '@lib/dateUtil';
import styles from './LifelogListItem.module.scss';
import { Lifelog } from '@providers/LifelogProvider';

describe('LifelogListItem', () => {
  const mockOnEdit = jest.fn();
  const mockOnAction = jest.fn();

  const startedAt = days('2023-07-05 12:34');
  const baseLog = {
    startedAt: startedAt.toISOString(),
    action: 'Test action',
    detail: 'Test detail',
  };

  const lifelogListItemComponent = (mockLifelog: Lifelog) => (
    <table>
      <tbody>
        <LifelogListItem
          log={mockLifelog}
          onEditButtonClick={mockOnEdit}
          onActionClick={mockOnAction}
        />
      </tbody>
    </table>
  );

  it('プロパティが正しくレンダリングされる', () => {
    const mockLog = lifelog({
      ...baseLog,
      finishedAt: null,
    });

    const { getByText } = render(lifelogListItemComponent(mockLog));

    expect(getByText(startedAt.format('HH:mm'))).toBeInTheDocument();
    expect(getByText(baseLog.action)).toBeInTheDocument();
    expect(getByText(baseLog.detail)).toBeInTheDocument();
  });

  it('日付が変更された際には日付が表示される', () => {
    const mockLog = lifelog({
      ...baseLog,
      isDateChanged: true,
    });

    render(lifelogListItemComponent(mockLog));

    expect(
      screen.getByText(new RegExp(`^${startedAt.format(DISPLAY_DATETIME)}`))
    ).toBeInTheDocument();
  });

  describe('終了時間が設定されている', () => {
    it('経過分が表示される', () => {
      const elapsedMinutes = 999;
      const mockLog = lifelog({
        ...baseLog,
        finishedAt: startedAt.add(elapsedMinutes, 'minutes').toISOString(),
      });

      render(lifelogListItemComponent(mockLog));

      expect(
        screen.getByText(new RegExp(` \\(${elapsedMinutes}\\)$`))
      ).toBeInTheDocument();
      expect(screen.getByTestId(TEST_ID.TD_STARTED_AT)).toHaveClass(
        styles.bold
      );
    });
  });

  it('1000分以上経過している場合は999と表示される', () => {
    const elapsedMinutes = 1000;
    const mockLog = lifelog({
      ...baseLog,
      finishedAt: startedAt.add(elapsedMinutes, 'minutes').toISOString(),
    });

    render(lifelogListItemComponent(mockLog));

    expect(screen.getByText(/ \(999\+\)$/)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID.TD_STARTED_AT)).toHaveClass(styles.bold);
  });

  it('イベントハンドラが正しく呼び出される', () => {
    const mockLog = lifelog({
      ...baseLog,
      finishedAt: null,
    });

    const { getByText, getByTestId } = render(
      lifelogListItemComponent(mockLog)
    );

    userEvent.click(getByText('Test action'));
    expect(mockOnAction).toHaveBeenCalled();

    userEvent.click(getByTestId(new RegExp(TEST_ID.EDIT_BUTTON)));
    expect(mockOnEdit).toHaveBeenCalled();
  });
});
