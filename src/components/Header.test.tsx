import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Header from '@src/components/Header';
import { mockUseUser } from '@src/tests/baseProviders';
import userEvent from '@testing-library/user-event';
import { HEADER_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { SEARCH_INPUT } from '@lib/consts/component';
import { BrowserRouter as Router } from 'react-router-dom';
import { mockNavigator } from '@src/tests/common';
import { ROUTES } from '@lib/consts/common';
import useAccount from '@src/hooks/useAccount';

jest.mock('@src/hooks/useAccount');
const mockUseAccount = useAccount as jest.MockedFunction<any>;

beforeEach(() => {
  mockUseUser.mockReturnValue({
    isLoggedIn: jest.fn().mockReturnValue(true),
  });
  mockUseAccount.mockReturnValue({
    logout: jest.fn().mockResolvedValue({}),
  });
});

const HeaderComponent = (
  <Router>
    <Header />
  </Router>
);

describe('Header', () => {
  describe('ログイン時', () => {
    it('ロゴが表示されていること', () => {
      render(HeaderComponent);
      expect(screen.getByText('Lifelog')).toBeInTheDocument();
    });
    it('SearchInput が表示されていること', () => {
      render(HeaderComponent);
      expect(
        screen.getByPlaceholderText('検索（行動、詳細）')
      ).toBeInTheDocument();
    });
    it('アカウント編集ボタンが活性化していること', async () => {
      render(HeaderComponent);
      fireEvent.click(screen.getByTestId(TEST_ID.BUTTON));
      userEvent.hover(screen.getByTestId(TEST_ID.SETTINGS));
      await waitFor(() => {
        expect(screen.getByTestId(TEST_ID.EDIT_ACCOUNT).className).not.toMatch(
          'disabled'
        );
      });
      fireEvent.click(screen.getByTestId(TEST_ID.EDIT_ACCOUNT));
      await waitFor(() => {
        expect(mockNavigator).toHaveBeenCalledTimes(1);
        expect(mockNavigator).toHaveBeenCalledWith(ROUTES.ACCOUNT_UPDATE);
      });
    });
    it('ログアウトボタンが活性化していること', async () => {
      render(HeaderComponent);
      fireEvent.click(screen.getByTestId(TEST_ID.BUTTON));
      userEvent.hover(screen.getByTestId(TEST_ID.SETTINGS));
      await waitFor(() => {
        const logoutButton = screen.getByTestId(TEST_ID.LOGOUT);
        expect(logoutButton.className).not.toMatch('disabled');
        fireEvent.click(logoutButton);
        expect(mockUseAccount().logout).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ログアウト時', () => {
    beforeEach(() => {
      mockUseUser().isLoggedIn = jest.fn().mockReturnValue(false);
    });
    it('ロゴが表示されていること', () => {
      render(HeaderComponent);
      expect(screen.getByText('Lifelog')).toBeInTheDocument();
    });
    it('SearchInput が表示されていないこと', () => {
      render(HeaderComponent);
      expect(
        screen.queryByPlaceholderText(SEARCH_INPUT.PLACEHOLDER)
      ).toBeNull();
    });
    it('アカウント編集ボタンが非活性であること', async () => {
      render(HeaderComponent);
      fireEvent.click(screen.getByTestId(TEST_ID.BUTTON));
      userEvent.hover(screen.getByTestId(TEST_ID.SETTINGS));
      await waitFor(() => {
        expect(screen.getByTestId(TEST_ID.EDIT_ACCOUNT).className).toMatch(
          'disabled'
        );
      });
    });
    it('ログアウトボタンが非活性であること', async () => {
      render(HeaderComponent);
      fireEvent.click(screen.getByTestId(TEST_ID.BUTTON));
      userEvent.hover(screen.getByTestId(TEST_ID.SETTINGS));
      await waitFor(() => {
        const logoutButton = screen.getByTestId(TEST_ID.LOGOUT);
        expect(logoutButton.className).toMatch('disabled');
        fireEvent.click(logoutButton);
        expect(mockUseAccount().logout).not.toHaveBeenCalled();
      });
    });
  });
});
