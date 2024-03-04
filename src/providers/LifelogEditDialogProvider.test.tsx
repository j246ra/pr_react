import { Lifelog, useLifelog } from '@providers/LifelogProvider';
import { lifelog } from '@lib/faker/lifelog';
import LifelogEditDialogProvider, {
  useLifelogEditDialog,
} from '@providers/LifelogEditDialogProvider';
import { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { LIFELOG_EDIT_DIALOG as CONST } from '@lib/consts/component';
import notify from '@lib/toast';
import { INVALID_MESSAGES } from '@validators/validator';
import useDeleteLifelog from '@src/hooks/useDeleteLifelog';

jest.mock('@providers/LifelogProvider');
const mockUseLifelog = useLifelog as jest.MockedFunction<any>;
jest.mock('@lib/toast');
const mockNotify = notify as jest.MockedFunction<any>;
jest.mock('@src/hooks/useDeleteLifelog');
const mockUseDeleteLifelog = useDeleteLifelog as jest.MockedFunction<any>;

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
      updateLog: jest.fn().mockImplementation(() => Promise.resolve()),
    });
    mockUseDeleteLifelog.mockReturnValue(jest.fn());
  });
  describe('openEditDialog', () => {
    it('isOpen が false なら初期化処理を実行すること', () => {
      const log = lifelog();
      const { result } = renderHook(() => useLifelogEditDialog(), { wrapper });
      expect(result.current.isOpen).toEqual(false);
      act(() => result.current.openEditDialog(log));
      expect(result.current.lifelog).toEqual(log);
      expect(result.current.isOpen).toEqual(true);
    });
    it('isOpen が true なら初期化処理はしないこと', () => {
      const log = lifelog();
      const { result } = renderHook(() => useLifelogEditDialog(), { wrapper });
      act(() => result.current.openEditDialog(lifelog()));
      expect(result.current.isOpen).toEqual(true);
      act(() => result.current.openEditDialog(log));
      expect(result.current.isOpen).toEqual(true);
      expect(result.current.lifelog).not.toEqual(log);
    });
  });

  describe('closeEditDialog', () => {
    it('isOpen が true なら false になっていること', () => {
      const { result } = renderHook(() => useLifelogEditDialog(), { wrapper });
      act(() => result.current.openEditDialog(lifelog()));
      expect(result.current.isOpen).toEqual(true);
      act(() => result.current.closeEditDialog());
      expect(result.current.isOpen).toEqual(false);
    });
    it('isOpen が false の場合でも変化がないこと', () => {
      const { result } = renderHook(() => useLifelogEditDialog(), { wrapper });
      expect(result.current.isOpen).toEqual(false);
      act(() => result.current.closeEditDialog());
      expect(result.current.isOpen).toEqual(false);
    });
  });

  describe('editLifelog', () => {
    const prevLifelog = {
      id: 1,
      userId: 10,
      action: 'Action',
      detail: 'Detail',
      startedAt: '2024-01-01 13:00:00',
      finishedAt: '2024-01-01 14:00:00',
      createdAt: '2024-01-01 15:00:00',
      updatedAt: '2024-01-01 16:00:00',
      isDateChanged: false,
    };
    const callEditLifelogByProperty = (log: Partial<Lifelog>) => {
      const { result } = renderHook(() => useLifelogEditDialog(), {
        wrapper,
      });
      act(() => result.current.openEditDialog(prevLifelog));
      act(() => result.current.editLifelog(log));
      expect(result.current.lifelog).toEqual({
        ...prevLifelog,
        ...log,
      });
      act(() => result.current.closeEditDialog());
    };

    it('個別のプロパティでLifelogが変更されていることを確認', () => {
      callEditLifelogByProperty({ id: 123 });
      callEditLifelogByProperty({ userId: 999 });
      callEditLifelogByProperty({ action: 'New Action' });
      callEditLifelogByProperty({ detail: 'New Detail' });
      callEditLifelogByProperty({ detail: null });
      callEditLifelogByProperty({ startedAt: '2024-02-01 13:00:00' });
      callEditLifelogByProperty({ finishedAt: '2024-02-01 14:00:00' });
      callEditLifelogByProperty({ finishedAt: null });
      callEditLifelogByProperty({ createdAt: '2024-02-01 15:00:00' });
      callEditLifelogByProperty({ updatedAt: '2024-02-01 16:00:00' });
      callEditLifelogByProperty({ isDateChanged: true });
      callEditLifelogByProperty(lifelog());
    });
  });

  describe('handleUpdateLifelog', () => {
    it('valid の場合 useLifelog().updateLog が呼び出されていること', async () => {
      const log = lifelog();
      const { result } = renderHook(() => useLifelogEditDialog(), { wrapper });
      act(() => result.current.openEditDialog(log));
      act(() => result.current.handleUpdateLifelog());
      await waitFor(() => {
        expect(useLifelog().updateLog).toHaveBeenCalledWith(
          log,
          CONST.MESSAGE.ERROR
        );
        expect(mockNotify.success).toHaveBeenCalledWith(CONST.MESSAGE.SUCCESS);
        expect(result.current.isOpen).toEqual(false);
      });
    });
    it('inValid の場合は警告が表示されること', async () => {
      const invalidLog = { ...lifelog(), action: undefined as any };
      const { result } = renderHook(() => useLifelogEditDialog(), { wrapper });
      act(() => result.current.openEditDialog(invalidLog));
      act(() => result.current.handleUpdateLifelog());
      await waitFor(() => {
        expect(useLifelog().updateLog).not.toHaveBeenCalled();
        expect(mockNotify.error).toHaveBeenCalledWith(
          INVALID_MESSAGES.TEXT_PRESENCE(CONST.ACTION.LABEL)
        );
        expect(result.current.isOpen).toEqual(true);
      });
    });
  });

  describe('handleDeleteLifelog', () => {
    it('deleteLifelog が呼び出されてダイアログを閉じていること', async () => {
      const { result } = renderHook(() => useLifelogEditDialog(), { wrapper });
      act(() => result.current.openEditDialog(lifelog()));
      act(() => result.current.handleDeleteLifelog());
      await waitFor(() => {
        expect(mockUseDeleteLifelog).toHaveBeenCalled();
        expect(result.current.isOpen).toEqual(false);
      });
    });
  });
});
