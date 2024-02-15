import React from 'react';
import { render } from '@testing-library/react';
import LifelogListItem from './LifelogListItem';
import userEvent from '@testing-library/user-event';
import { lifelog } from '@lib/faker/lifelog';
import { LIFELOG_LIST_ITEM_TEST_ID as TEST_ID } from '@lib/consts/testId';

describe('LifelogListItem', () => {
  const mockLog = lifelog({
    startedAt: new Date(2023, 6, 5, 12, 34).toISOString(),
    finishedAt: null,
    action: 'Test action',
    detail: 'Test detail',
  });
  const mockOnFinish = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnAction = jest.fn();

  it('プロパティが正しくレンダリングされる', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <LifelogListItem
            log={mockLog}
            onFinishButtonClick={mockOnFinish}
            onEditButtonClick={mockOnEdit}
            onDeleteButtonClick={mockOnDelete}
            onActionClick={mockOnAction}
          />
        </tbody>
      </table>
    );

    expect(getByText('12:34')).toBeInTheDocument();
    expect(getByText('Test action')).toBeInTheDocument();
    expect(getByText('Test detail')).toBeInTheDocument();
  });

  it('イベントハンドラが正しく呼び出される', () => {
    const { getByText, getByTestId } = render(
      <table>
        <tbody>
          <LifelogListItem
            log={mockLog}
            onFinishButtonClick={mockOnFinish}
            onEditButtonClick={mockOnEdit}
            onDeleteButtonClick={mockOnDelete}
            onActionClick={mockOnAction}
          />
        </tbody>
      </table>
    );

    userEvent.click(getByText('Test action'));
    expect(mockOnAction).toHaveBeenCalled();

    userEvent.click(getByTestId(new RegExp(TEST_ID.FINISH_BUTTON)));
    expect(mockOnFinish).toHaveBeenCalled();

    userEvent.click(getByTestId(new RegExp(TEST_ID.EDIT_BUTTON)));
    expect(mockOnEdit).toHaveBeenCalled();

    userEvent.click(getByTestId(new RegExp(TEST_ID.DELETE_BUTTON)));
    expect(mockOnDelete).toHaveBeenCalled();
  });
});
