import { useLifelog } from '@providers/LifelogProvider';
import useDeleteLifelog from '@src/hooks/useDeleteLifelog';
import { lifelogs } from '@lib/faker/lifelog';
import { USE_DELETE_LIFELOG } from '@lib/consts/common';
import notify from '@lib/toast';
import { waitFor } from '@testing-library/react';

jest.mock('@providers/LifelogProvider');
const mockUseLifelog = useLifelog as jest.MockedFunction<any>;
const spyConfirm = jest.spyOn(window, 'confirm');
let spySuccess: jest.SpyInstance<unknown>;

describe('useDeleteLifelog', () => {
  const logs = lifelogs(5);
  beforeEach(() => {
    mockUseLifelog.mockReturnValue({
      lifelogs: logs,
      deleteLog: jest.fn().mockReturnValue(Promise.resolve()),
    });
    spyConfirm.mockReturnValue(true);
    spySuccess = jest.spyOn(notify, 'success');
  });
  afterEach(() => {
    spyConfirm.mockClear();
    spySuccess.mockClear();
  });
  describe('confirm', () => {
    it('いいえを選択するとLifelogは削除されない', () => {
      spyConfirm.mockReturnValue(false);
      const deleteLifelog = useDeleteLifelog();
      deleteLifelog(logs[0].id);
      expect(spyConfirm).toHaveBeenCalledWith(
        USE_DELETE_LIFELOG.MESSAGE.CONFIRM
      );
      expect(mockUseLifelog().deleteLog).not.toHaveBeenCalled();
    });
    it('はいを選択するとLifelogが削除される', async () => {
      const deleteLifelog = useDeleteLifelog();
      deleteLifelog(logs[0].id);
      expect(spyConfirm).toHaveBeenCalledWith(
        USE_DELETE_LIFELOG.MESSAGE.CONFIRM
      );
      expect(mockUseLifelog().deleteLog).toHaveBeenCalledWith(
        logs[0].id,
        USE_DELETE_LIFELOG.MESSAGE.ERROR
      );
      await waitFor(() => {
        expect(spySuccess).toHaveBeenCalledWith(
          USE_DELETE_LIFELOG.MESSAGE.SUCCESS
        );
      });
    });
  });
});
