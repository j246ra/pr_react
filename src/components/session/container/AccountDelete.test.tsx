import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AccountDelete from './AccountDelete';
import { ACCOUNT_DELETE } from '@lib/consts/component';
import useAccount from '@src/hooks/useAccount';

jest.mock('@src/hooks/useAccount');
const mockUseAccount = useAccount as jest.MockedFunction<any>;

describe('AccountDelete component', () => {
  beforeEach(() => {
    mockUseAccount.mockReturnValue({
      remove: jest.fn().mockResolvedValue({ status: 200 }),
    });
  });

  it('アカウント削除ボタンが表示されている', () => {
    const { getByText } = render(
      <Router>
        <AccountDelete />
      </Router>
    );
    expect(getByText('アカウント削除')).toBeInTheDocument();
  });

  it('ユーザーがアカウント削除ボタンをクリックし、確認ダイアログで削除を選択', async () => {
    const { getByText, queryByText } = render(
      <Router>
        <AccountDelete />
      </Router>
    );

    fireEvent.click(getByText(ACCOUNT_DELETE.BUTTON.DELETE));
    fireEvent.click(getByText(ACCOUNT_DELETE.ALERT.CONFIRM));

    await waitFor(() => {
      expect(mockUseAccount().remove).toHaveBeenCalledTimes(1);
      expect(queryByText(ACCOUNT_DELETE.ALERT.CONFIRM)).not.toBeInTheDocument();
    });
  });
});
