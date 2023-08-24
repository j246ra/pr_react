import { useLifelog } from '@providers/LifelogProvider';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Header from '@src/components/Header';
import {
  mockUseAuth,
  mockUseSession,
  mockUseUser,
} from '@src/tests/baseProviders';
import userEvent from '@testing-library/user-event';
import { HEADER_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { SEARCH_INPUT } from '@lib/consts/component';

jest.mock('@providers/LifelogProvider');

const mockUseLifelog = useLifelog as jest.MockedFunction<any>;

beforeEach(() => {
  mockUseSession.mockReturnValue({
    removeHeaders: jest.fn(),
  });
  mockUseUser.mockReturnValue({
    isLogin: jest.fn().mockReturnValue(true),
    clearUser: jest.fn(),
  });

  mockUseAuth.mockReturnValue({
    authApi: {
      signOut: jest.fn().mockResolvedValue({}),
    },
  });
  mockUseLifelog.mockReturnValue({
    clear: jest.fn(),
  });
});

describe('Header', () => {
  describe('ログイン時', () => {
    it('ロゴが表示されていること', () => {
      render(<Header />);
      expect(screen.getByText('Lifelog')).toBeInTheDocument();
    });
    it('SearchInput が表示されていること', () => {
      render(<Header />);
      expect(
        screen.getByPlaceholderText('検索（行動、詳細）')
      ).toBeInTheDocument();
    });
    it('アカウント編集ボタンが活性化していること', async () => {
      render(<Header />);
      fireEvent.click(screen.getByTestId(TEST_ID.BUTTON));
      userEvent.hover(screen.getByTestId(TEST_ID.SETTINGS));
      await waitFor(() => {
        expect(screen.getByTestId(TEST_ID.EDIT_ACCOUNT).className).not.toMatch(
          'disabled'
        );
      });
    });
    it('ログアウトボタンが活性化していること', async () => {
      render(<Header />);
      fireEvent.click(screen.getByTestId(TEST_ID.BUTTON));
      userEvent.hover(screen.getByTestId(TEST_ID.SETTINGS));
      await waitFor(() => {
        const logoutButton = screen.getByTestId(TEST_ID.LOGOUT);
        expect(logoutButton.className).not.toMatch('disabled');
        fireEvent.click(logoutButton);
        expect(mockUseAuth().authApi.signOut).toHaveBeenCalled();
      });
    });
  });

  describe('ログアウト時', () => {
    beforeEach(() => {
      mockUseUser().isLogin = jest.fn().mockReturnValue(false);
    });
    it('ロゴが表示されていること', () => {
      render(<Header />);
      expect(screen.getByText('Lifelog')).toBeInTheDocument();
    });
    it('SearchInput が表示されていないこと', () => {
      render(<Header />);
      expect(
        screen.queryByPlaceholderText(SEARCH_INPUT.PLACEHOLDER)
      ).toBeNull();
    });
    it('アカウント編集ボタンが非活性であること', async () => {
      render(<Header />);
      fireEvent.click(screen.getByTestId(TEST_ID.BUTTON));
      userEvent.hover(screen.getByTestId(TEST_ID.SETTINGS));
      await waitFor(() => {
        expect(screen.getByTestId(TEST_ID.EDIT_ACCOUNT).className).toMatch(
          'disabled'
        );
      });
    });
    it('ログアウトボタンが非活性であること', async () => {
      render(<Header />);
      fireEvent.click(screen.getByTestId(TEST_ID.BUTTON));
      userEvent.hover(screen.getByTestId(TEST_ID.SETTINGS));
      await waitFor(() => {
        const logoutButton = screen.getByTestId(TEST_ID.LOGOUT);
        expect(logoutButton.className).toMatch('disabled');
        fireEvent.click(logoutButton);
        expect(mockUseAuth().authApi.signOut).not.toHaveBeenCalled();
      });
    });
  });
});
