import { useLifelog } from '@providers/LifelogProvider';
import { lifelog } from '@lib/faker/lifelog';
import LifelogEditDialogProvider, {
  useLifelogEditDialog,
} from '@providers/LifelogEditDialogProvider';
import { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';

jest.mock('@providers/LifelogProvider');
const mockUseLifelog = useLifelog as jest.MockedFunction<any>;
describe('LifelogEditDialogProvider', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <LifelogEditDialogProvider>{children}</LifelogEditDialogProvider>
  );
  beforeEach(() => {
    mockUseLifelog.mockReturnValue({
      newLog: () => {
        return {
          id: -1,
          userId: -1,
          action: '',
          detail: undefined,
          startedAt: '',
          finishedAt: undefined,
          createdAt: '',
          updatedAt: '',
        };
      },
      updateLog: jest.fn(),
    });
  });
  describe('openEditDialog', () => {
    it('isOpen が false なら初期化処理を実行すること', () => {
      const log = lifelog();
      const { result } = renderHook(() => useLifelogEditDialog(), { wrapper });
      expect(result.current.isOpen).toEqual(false);
      act(() => {
        result.current.openEditDialog(log);
      });
      expect(result.current.lifelog).toEqual(log);
      expect(result.current.isOpen).toEqual(true);
    });
    it('isOpen が true なら初期化処理はしないこと', () => {
      const log = lifelog();
      const { result } = renderHook(() => useLifelogEditDialog(), { wrapper });
      act(() => {
        result.current.openEditDialog(lifelog());
      });
      expect(result.current.isOpen).toEqual(true);
      act(() => {
        result.current.openEditDialog(log);
      });
      expect(result.current.isOpen).toEqual(true);
      expect(result.current.lifelog).not.toEqual(log);
    });
  });

  describe('closeEditDialog', () => {
    it('isOpen が true なら false になっていること', () => {
      const { result } = renderHook(() => useLifelogEditDialog(), { wrapper });
      act(() => {
        result.current.openEditDialog(lifelog());
      });
      expect(result.current.isOpen).toEqual(true);
      act(() => {
        result.current.closeEditDialog();
      });
      expect(result.current.isOpen).toEqual(false);
    });
    it('isOpen が false の場合でも変化がないこと', () => {
      const { result } = renderHook(() => useLifelogEditDialog(), { wrapper });
      expect(result.current.isOpen).toEqual(false);
      act(() => {
        result.current.closeEditDialog();
      });
      expect(result.current.isOpen).toEqual(false);
    });
  });

  describe('updateLifelog', () => {
    it('useLifelog().updateLog が呼び出されていること', () => {
      const log = lifelog();
      const { result } = renderHook(() => useLifelogEditDialog(), { wrapper });
      act(() => {
        result.current.updateLifelog(log);
      });
      expect(useLifelog().updateLog).toHaveBeenCalledWith(log);
    });
  });
});
