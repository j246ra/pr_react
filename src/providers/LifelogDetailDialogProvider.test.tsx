import { ReactNode } from 'react';
import { lifelog } from '@lib/faker/lifelog';
import LifelogDetailDialogProvider, {
  useLifelogDetailDialog,
} from '@providers/LifelogDetailDialogProvider';
import { act, renderHook } from '@testing-library/react';

describe('LifelogDetailDialogProvider', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <LifelogDetailDialogProvider>{children}</LifelogDetailDialogProvider>
  );

  describe('openDetailDialog', () => {
    it('isOpen が false なら初期化処理を実行すること', () => {
      const log = lifelog();
      const { result } = renderHook(() => useLifelogDetailDialog(), {
        wrapper,
      });
      expect(result.current.isOpen).toEqual(false);
      act(() => result.current.openDetailDialog(log));
      expect(result.current.log).toEqual(log);
      expect(result.current.isOpen).toEqual(true);
    });
    it('isOpen が true なら初期化処理はしないこと', () => {
      const log = lifelog();
      const { result } = renderHook(() => useLifelogDetailDialog(), {
        wrapper,
      });
      act(() => result.current.openDetailDialog(lifelog()));
      expect(result.current.isOpen).toEqual(true);
      act(() => result.current.openDetailDialog(log));
      expect(result.current.isOpen).toEqual(true);
      expect(result.current.log).not.toEqual(log);
    });
  });

  describe('closeDetailDialog', () => {
    it('isOpen が true なら false になっていること', () => {
      const { result } = renderHook(() => useLifelogDetailDialog(), {
        wrapper,
      });
      act(() => result.current.openDetailDialog(lifelog()));
      expect(result.current.isOpen).toEqual(true);
      act(() => result.current.closeDetailDialog());
      expect(result.current.isOpen).toEqual(false);
    });
    it('isOpen が false の場合でも変化はないこと', () => {
      const { result } = renderHook(() => useLifelogDetailDialog(), {
        wrapper,
      });
      expect(result.current.isOpen).toEqual(false);
      act(() => result.current.closeDetailDialog());
      expect(result.current.isOpen).toEqual(false);
    });
  });
});
