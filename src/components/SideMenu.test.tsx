import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SideMenu from '@src/components/SideMenu';
import { mockUseUser } from '@src/tests/baseProviders';
import userEvent from '@testing-library/user-event';
import { SIDE_MENU_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { BrowserRouter as Router } from 'react-router';
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

const SideMenuComponent = (
  <Router>
    <SideMenu />
  </Router>
);

describe('SideMenu', () => {
  describe('ログイン時', () => {
    it('メニューが開くこと', async () => {
      render(SideMenuComponent);
      fireEvent.click(screen.getByTestId(TEST_ID.BUTTON));

      await waitFor(() => {
        expect(screen.getByTestId(TEST_ID.SETTINGS)).toBeInTheDocument();
      });
    });

    it('アカウント編集ボタンが活性化していること', async () => {
      render(SideMenuComponent);
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
      render(SideMenuComponent);
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

    it('メニューが開くこと', async () => {
      render(SideMenuComponent);
      fireEvent.click(screen.getByTestId(TEST_ID.BUTTON));

      await waitFor(() => {
        expect(screen.getByTestId(TEST_ID.SETTINGS)).toBeInTheDocument();
      });
    });

    it('アカウント編集ボタンが非活性であること', async () => {
      render(SideMenuComponent);
      fireEvent.click(screen.getByTestId(TEST_ID.BUTTON));
      userEvent.hover(screen.getByTestId(TEST_ID.SETTINGS));

      await waitFor(() => {
        expect(screen.getByTestId(TEST_ID.EDIT_ACCOUNT).className).toMatch(
          'disabled'
        );
      });
    });

    it('ログアウトボタンが非活性であること', async () => {
      render(SideMenuComponent);
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
