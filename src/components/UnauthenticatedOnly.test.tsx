import { render, screen } from '@testing-library/react';
import { mockNavigator } from '@src/tests/common';
import { mockUseUser } from '@src/tests/baseProviders';
import UnauthenticatedOnly from '@src/components/UnauthenticatedOnly';
import { UNAUTHENTICATED_ONLY } from '@lib/consts/component';
import toast from 'react-hot-toast';
// import { NOTIFY } from '@lib/consts/common';

jest.mock('react-hot-toast');
const mockToast = jest.mocked(toast);

const CHILDREN = 'Child component';
const children = <div>{CHILDREN}</div>;
// const FALLBACK_MESSAGE = 'Fallback Message.';

beforeEach(() => {
  mockUseUser.mockReturnValue({
    checkAuthenticated: jest.fn(),
    user: {
      email: 'test@test.com',
      sessionId: 'session-id',
    },
  });
});

describe('UnauthenticatedOnly', () => {
  describe('認証済みのとき', () => {
    it('リダイレクトしていること', () => {
      render(<UnauthenticatedOnly children={children} />);
      expect(mockNavigator).toHaveBeenCalled();
      expect(mockNavigator).toHaveBeenCalledWith(
        UNAUTHENTICATED_ONLY.FALLBACK_PATH
      );
      expect(screen.queryByText(CHILDREN)).not.toBeInTheDocument();
      expect(mockToast.error).not.toHaveBeenCalled();
    });

    it('任意のパスでリダイレクトしていること', () => {
      render(<UnauthenticatedOnly children={children} fallbackPath={'/nis'} />);
      expect(mockNavigator).toHaveBeenCalled();
      expect(mockNavigator).toHaveBeenCalledWith('/nis');
      expect(screen.queryByText(CHILDREN)).not.toBeInTheDocument();
    });

    // it('任意のメッセージでトーストを表示していること', () => {
    //   render(
    //     <UnauthenticatedOnly
    //       children={children}
    //       fallbackMessage={FALLBACK_MESSAGE}
    //     />
    //   );
    //   expect(mockNavigator).toHaveBeenCalled();
    //   expect(mockNavigator).toHaveBeenCalledWith(
    //     UNAUTHENTICATED_ONLY.FALLBACK_PATH
    //   );
    //   expect(screen.queryByText(CHILDREN)).not.toBeInTheDocument();
    //   expect(mockToast.error).toHaveBeenCalled();
    //   expect(mockToast.error).toHaveBeenCalledWith(
    //     FALLBACK_MESSAGE,
    //     NOTIFY.STYLE.ERROR
    //   );
    // });
  });

  describe('未認証時', () => {
    beforeEach(() => {
      mockUseUser().user = { email: '', sessionId: ''}
    });
    it('コンポーネントをレンダリングしていること', () => {
      render(<UnauthenticatedOnly children={children} />);
      expect(mockNavigator).not.toHaveBeenCalled();
      expect(screen.queryByText(CHILDREN)).toBeInTheDocument();
    });
  });
});
