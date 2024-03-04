import { renderHook } from '@testing-library/react';
import useMediaQuery, { mediaQuery } from '@src/hooks/useMediaQuery';
import { matchMediaObject } from '@src/tests/matchMedia';
describe('useMediaQuery', () => {
  it('メディアクエリがマッチした場合にtrueを返す', () => {
    matchMediaObject({ matches: true });
    const { result } = renderHook(() => useMediaQuery(mediaQuery.pc));
    expect(result.current).toBe(true);
  });

  it('メディアクエリがマッチしない場合にfalseを返す', () => {
    matchMediaObject({ matches: false });
    const { result } = renderHook(() => useMediaQuery(mediaQuery.pc));
    expect(result.current).toBe(false);
  });
});
