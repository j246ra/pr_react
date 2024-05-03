import { mockUseSession } from '@src/tests/baseProviders';
import { renderHook, waitFor } from '@testing-library/react';
import useSearchParamsForHeaders from '@src/hooks/useSearchParamsForHeaders';
import { MemoryRouter } from 'react-router';

describe('useSearchParamsForHeaders', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      setHeaders: jest.fn(),
    });
  });
  it('URL パラメーターから Headers を取得している', async () => {
    renderHook(() => useSearchParamsForHeaders(), {
      wrapper: ({ children }) => (
        <MemoryRouter
          initialEntries={[
            '/password_edit?access-token=123&client=abc&uid=test@example.com',
          ]}
        >
          {children}
        </MemoryRouter>
      ),
    });
    await waitFor(() => {
      expect(mockUseSession().setHeaders).toHaveBeenCalledTimes(1);
      expect(mockUseSession().setHeaders).toHaveBeenCalledWith({
        'access-token': '123',
        client: 'abc',
        uid: 'test@example.com',
      });
    });
  });
});
