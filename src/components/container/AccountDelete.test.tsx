import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '@providers/AuthApiProvider';
import { useUser } from '@providers/UserProvider';
import { useSession } from '@providers/SessionProvider';
import AccountDelete from './AccountDelete';

jest.mock('@providers/AuthApiProvider');
jest.mock('@providers/UserProvider');
jest.mock('@providers/SessionProvider');

const mockUseAuth = useAuth as jest.MockedFunction<any>;
const mockUseUser = useUser as jest.MockedFunction<any>;
const mockUseSession = useSession as jest.MockedFunction<any>;

describe('AccountDelete component', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      authApi: {
        deleteUser: jest.fn().mockResolvedValue({}),
      },
    });
    mockUseUser.mockReturnValue({
      clearUser: jest.fn(),
    });
    mockUseSession.mockReturnValue({
      removeToken: jest.fn(),
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

    fireEvent.click(getByText('アカウント削除'));
    fireEvent.click(getByText('削除'));

    await waitFor(() => {
      expect(mockUseAuth().authApi.deleteUser).toHaveBeenCalled();
      expect(mockUseUser().clearUser).toHaveBeenCalled();
      expect(mockUseSession().removeToken).toHaveBeenCalled();
    });
  });
});
