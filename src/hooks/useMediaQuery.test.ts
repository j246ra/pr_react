import { renderHook } from '@testing-library/react';
import useMediaQuery, { mediaQuery } from '@src/hooks/useMediaQuery';
describe('useMediaQuery', () => {
  const mediaQueryList = ({ matches = true, media = '' }) => {
    return {
      matches,
      media,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  };
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest
        .fn()
        .mockImplementation((query) =>
          mediaQueryList({ matches: true, media: query })
        ),
    });
  });

  it('メディアクエリがマッチした場合にtrueを返す', () => {
    // @ts-ignore
    window.matchMedia.mockImplementation((query) =>
      mediaQueryList({ matches: true, media: query })
    );
    const { result } = renderHook(() => useMediaQuery(mediaQuery.pc));
    expect(result.current).toBe(true);
  });

  it('メディアクエリがマッチしない場合にfalseを返す', () => {
    // @ts-ignore
    window.matchMedia.mockImplementation((query) =>
      mediaQueryList({ matches: false, media: query })
    );
    const { result } = renderHook(() => useMediaQuery(mediaQuery.pc));
    expect(result.current).toBe(false);
  });
});
