import { render, screen } from '@testing-library/react';
import { mockNavigator } from '@src/tests/common';
import { mockUseUser } from '@src/tests/baseProviders';
import AuthenticatedOnly from '@src/components/AuthenticatedOnly';
import toast from 'react-hot-toast';
import { AUTHENTICATED_ONLY } from '@lib/consts/component';
import { NOTIFY } from '@lib/consts/common';
import useAccount from '@src/hooks/useAccount';

const CHILDREN = 'Child component';
const children = <div>{CHILDREN}</div>;

jest.mock('@src/hooks/useAccount');
const mockUseAccount = useAccount as jest.MockedFunction<any>;

jest.mock('react-hot-toast');
const mockToast = jest.mocked(toast);

beforeEach(() => {
  mockUseUser.mockReturnValue({
    sessionIdIsBlank: jest.fn().mockReturnValue(true),
  });
  mockUseAccount.mockReturnValue({
    checkAuthenticated: jest.fn(),
  });
});

describe('Certified', () => {
  describe('未認証のとき', () => {
    it('リダイレクトしていること', () => {
      render(<AuthenticatedOnly children={children} />);
      expect(mockNavigator).toHaveBeenCalled();
      expect(mockNavigator).toHaveBeenCalledWith(
        AUTHENTICATED_ONLY.FALLBACK_PATH
      );
      expect(mockToast.error).not.toHaveBeenCalled();
      expect(screen.queryByText(CHILDREN)).not.toBeInTheDocument();
    });

    it('任意のパスでリダイレクトしていること', () => {
      render(
        <AuthenticatedOnly
          children={children}
          fallbackPath={'/nis'}
          fallbackMessage={AUTHENTICATED_ONLY.MESSAGE.ERROR}
        />
      );
      expect(mockNavigator).toHaveBeenCalled();
      expect(mockNavigator).toHaveBeenCalledWith('/nis');
      expect(mockToast.error).toHaveBeenCalled();
      expect(mockToast.error).toHaveBeenCalledWith(
        AUTHENTICATED_ONLY.MESSAGE.ERROR,
        NOTIFY.STYLE.ERROR
      );
      expect(screen.queryByText(CHILDREN)).not.toBeInTheDocument();
    });
  });

  describe('認証済みの時', () => {
    beforeEach(() => {
      mockUseUser().sessionIdIsBlank.mockReturnValue(false);
    });
    it('コンポーネントをレンダリングしていること', () => {
      render(<AuthenticatedOnly children={children} />);
      expect(mockNavigator).not.toHaveBeenCalled();
      expect(screen.queryByText(CHILDREN)).toBeInTheDocument();
    });
  });
});
