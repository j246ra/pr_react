import { render, screen } from '@testing-library/react';
import { mockNavigator } from '@src/tests/common';
import { mockUseUser } from '@src/tests/baseProviders';
import Uncertified from '@src/components/Uncertified';

const CHILD = 'Child component';
const child = <div>{CHILD}</div>;

beforeEach(() => {
  mockUseUser.mockReturnValue({
    isLoggedIn: jest.fn().mockReturnValue(true),
  });
});

describe('Uncertified', () => {
  describe('認証済みのとき', () => {
    it('リダイレクトしていること', () => {
      render(<Uncertified component={child} />);
      expect(mockNavigator).toHaveBeenCalled();
      expect(mockNavigator).toHaveBeenCalledWith('/lifelogs');
      expect(screen.queryByText(CHILD)).not.toBeInTheDocument();
    });

    it('任意のパスでリダイレクトしていること', () => {
      render(<Uncertified component={child} redirectTo={'/nis'} />);
      expect(mockNavigator).toHaveBeenCalled();
      expect(mockNavigator).toHaveBeenCalledWith('/nis');
      expect(screen.queryByText(CHILD)).not.toBeInTheDocument();
    });
  });

  describe('未認証時', () => {
    beforeEach(() => {
      mockUseUser().isLoggedIn = jest.fn().mockReturnValue(false);
    });
    it('リダイレクトしていること', () => {
      render(<Uncertified component={child} />);
      expect(mockNavigator).not.toHaveBeenCalled();
      expect(screen.queryByText(CHILD)).toBeInTheDocument();
    });
  });
});
