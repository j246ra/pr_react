import { render, screen } from '@testing-library/react';
import Header from '@src/components/Header';
import { mockUseUser } from '@src/tests/baseProviders';
import { SIDE_MENU_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { SEARCH_INPUT } from '@lib/consts/component';
import { BrowserRouter as Router } from 'react-router';
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
    it('SideMenu が表示されていること', () => {
      render(HeaderComponent);
      expect(screen.getByTestId(TEST_ID.BUTTON)).toBeInTheDocument();
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
    it('SideMenu が表示されていること', () => {
      render(HeaderComponent);
      expect(screen.getByTestId(TEST_ID.BUTTON)).toBeInTheDocument();
    });
  });
});
