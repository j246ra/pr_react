import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AccountDelete from './AccountDelete';
import { mockUseSession, mockUseUser } from '@src/tests/baseProviders';
import { ACCOUNT_DELETE } from '@lib/consts/component';
import useAuthApi from '@src/hooks/useAuthApi';

jest.mock('@src/hooks/useAuthApi');
const mockUseAuthApi = useAuthApi as jest.MockedFunction<any>;

describe('AccountDelete component', () => {
  beforeEach(() => {
    mockUseAuthApi.mockReturnValue({
      deleteUser: jest.fn().mockResolvedValue({}),
    });
    mockUseUser.mockReturnValue({
      user: { email: '' },
      createUser: jest.fn(),
      updateUser: jest.fn(),
      clearUser: jest.fn(),
      isLogin: jest.fn(),
    });
    mockUseSession.mockReturnValue({
      removeHeaders: jest.fn(),
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
    const { getByText } = render(
      <Router>
        <AccountDelete />
      </Router>
    );

    fireEvent.click(getByText(ACCOUNT_DELETE.BUTTON.DELETE));
    fireEvent.click(getByText(ACCOUNT_DELETE.ALERT.CONFIRM));

    await waitFor(() => {
      expect(mockUseAuthApi().deleteUser).toHaveBeenCalled();
      expect(mockUseUser().clearUser).toHaveBeenCalled();
      expect(mockUseSession().removeHeaders).toHaveBeenCalled();
    });
  });
});
