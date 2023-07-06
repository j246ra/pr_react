import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LifelogListItem from './LifelogListItem';
import userEvent from '@testing-library/user-event';

describe('LifelogListItem', () => {
  const mockLog = {
    id: 1,
    user_id: 1,
    action: 'Test action',
    detail: 'Test detail',
    startedAt: new Date(2023, 6, 5, 12, 34).toISOString(),
    createdAt: new Date(2023, 6, 5, 12, 34).toISOString(),
    updatedAt: new Date(2023, 6, 5, 12, 34).toISOString(),
  };

  it('プロパティが正しくレンダリングされる', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <LifelogListItem
            log={mockLog}
            onEditButtonClick={() => {}}
            onDeleteButtonClick={() => {}}
            onActionClick={() => {}}
          />
        </tbody>
      </table>
    );

    expect(getByText('23/07/05 12:34')).toBeInTheDocument();
    expect(getByText('Test action')).toBeInTheDocument();
    expect(getByText('Test detail')).toBeInTheDocument();
  });

  it('イベントハンドラが正しく呼び出される', () => {
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();
    const mockOnAction = jest.fn();

    const { getByText, getByTestId } = render(
      <table>
        <tbody>
          <LifelogListItem
            log={mockLog}
            onEditButtonClick={mockOnEdit}
            onDeleteButtonClick={mockOnDelete}
            onActionClick={mockOnAction}
          />
        </tbody>
      </table>
    );

    userEvent.click(getByText('Test action'));
    expect(mockOnAction).toHaveBeenCalled();

    userEvent.click(getByTestId('edit-button'));
    expect(mockOnEdit).toHaveBeenCalled();

    userEvent.click(getByTestId('delete-button'));
    expect(mockOnDelete).toHaveBeenCalled();
  });
});
