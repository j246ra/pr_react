import { render, screen } from '@testing-library/react';
import { mockNavigator } from '@src/tests/common';
import { mockUseUser } from '@src/tests/baseProviders';
import { NOTIFY } from '@lib/consts/common';
import AuthGate from '@src/components/AuthGate';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast');
const mockToast = jest.mocked(toast);

const CHILDREN = 'Child component';
const children = <div>{CHILDREN}</div>;
const FALLBACK_PATH = '/fallbackTo';
const FALLBACK_MESSAGE = 'Fallback Message.';

beforeEach(() => {
  mockUseUser.mockReturnValue({
    checkAuthenticated: jest.fn(),
    sessionIdIsBlank: jest.fn().mockReturnValue(false),
  });
});

describe('AuthGate', () => {
  describe('通過条件を満たしているとき', () => {
    it('コンポーネントをレンダリングしていること', () => {
      render(
        <AuthGate
          children={children}
          passingCondition={(isLoggedIn: boolean) => isLoggedIn}
          fallbackPath={FALLBACK_PATH}
          fallbackMessage={FALLBACK_MESSAGE}
        />
      );
      expect(screen.queryByText(CHILDREN)).toBeInTheDocument();
      expect(mockNavigator).not.toHaveBeenCalled();
      expect(mockToast.error).not.toHaveBeenCalled();
    });
  });

  describe('通過条件を満たしていないとき', () => {
    mockUseUser.sessionIdIsBlank = jest.fn().mockReturnValue(true);
    it('リダイレクトされていること', () => {
      render(
        <AuthGate
          children={children}
          passingCondition={(isLoggedIn: boolean) => !isLoggedIn}
          fallbackPath={FALLBACK_PATH}
          fallbackMessage={FALLBACK_MESSAGE}
        />
      );
      expect(mockNavigator).toHaveBeenCalled();
      expect(mockNavigator).toHaveBeenCalledWith(FALLBACK_PATH);
      expect(mockToast.error).toHaveBeenCalled();
      expect(mockToast.error).toHaveBeenCalledWith(
        FALLBACK_MESSAGE,
        NOTIFY.STYLE.ERROR
      );
      expect(screen.queryByText(CHILDREN)).not.toBeInTheDocument();
    });

    it('fallbackMessage が空白の場合、トーストは非表示', () => {
      render(
        <AuthGate
          children={children}
          passingCondition={(isLoggedIn: boolean) => !isLoggedIn}
          fallbackPath={FALLBACK_PATH}
          fallbackMessage={''}
        />
      );
      expect(mockNavigator).toHaveBeenCalled();
      expect(mockNavigator).toHaveBeenCalledWith(FALLBACK_PATH);
      expect(mockToast.error).not.toHaveBeenCalled();
      expect(screen.queryByText(CHILDREN)).not.toBeInTheDocument();
    });

    it('fallbackMessage が undefinedの場合、トーストは非表示', () => {
      render(
        <AuthGate
          children={children}
          passingCondition={(isLoggedIn: boolean) => !isLoggedIn}
          fallbackPath={FALLBACK_PATH}
        />
      );
      expect(mockNavigator).toHaveBeenCalled();
      expect(mockNavigator).toHaveBeenCalledWith(FALLBACK_PATH);
      expect(mockToast.error).not.toHaveBeenCalled();
      expect(screen.queryByText(CHILDREN)).not.toBeInTheDocument();
    });
  });
});
