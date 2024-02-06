import { render, screen } from '@testing-library/react';
import { mockNavigator } from '@src/tests/common';
import { mockUseUser } from '@src/tests/baseProviders';
import Certified from '@src/components/Certified';
import toast from 'react-hot-toast';
import { CERTIFIED } from '@lib/consts/component';
import { NOTIFY } from '@lib/consts/common';

const CHILD = 'Child component';
const child = <div>{CHILD}</div>;

jest.mock('react-hot-toast');
const mockToast = jest.mocked(toast);

beforeEach(() => {
  mockUseUser.mockReturnValue({
    isLoggedIn: jest.fn().mockReturnValue(false),
  });
});

describe('Certified', () => {
  describe('未認証のとき', () => {
    it('リダイレクトしていること', () => {
      render(<Certified component={child} />);
      expect(mockNavigator).toHaveBeenCalled();
      expect(mockNavigator).toHaveBeenCalledWith('/login');
      expect(mockToast.error).toHaveBeenCalled();
      expect(mockToast.error).toHaveBeenCalledWith(
        CERTIFIED.ERROR,
        NOTIFY.STYLE.ERROR
      );
      expect(screen.queryByText(CHILD)).not.toBeInTheDocument();
    });

    it('任意のパスでリダイレクトしていること', () => {
      render(<Certified component={child} redirectTo={'/nis'} />);
      expect(mockNavigator).toHaveBeenCalled();
      expect(mockNavigator).toHaveBeenCalledWith('/nis');
      expect(mockToast.error).toHaveBeenCalled();
      expect(mockToast.error).toHaveBeenCalledWith(
        CERTIFIED.ERROR,
        NOTIFY.STYLE.ERROR
      );
      expect(screen.queryByText(CHILD)).not.toBeInTheDocument();
    });
  });

  describe('認証済みの時', () => {
    beforeEach(() => {
      mockUseUser().isLoggedIn = jest.fn().mockReturnValue(true);
    });
    it('コンポーネントをレンダリングしていること', () => {
      render(<Certified component={child} />);
      expect(mockNavigator).not.toHaveBeenCalled();
      expect(screen.queryByText(CHILD)).toBeInTheDocument();
    });
  });
});
