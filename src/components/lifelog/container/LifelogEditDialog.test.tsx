import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import LifelogEditDialog from '@lifelog/container/LifelogEditDialog';
import { LIFELOG_EDIT_DIALOG_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import { lifelog } from '@lib/faker/lifelog';
import { LIFELOG_EDIT_DIALOG } from '@lib/consts/component';
import userEvent from '@testing-library/user-event';
import notify from '@lib/toast';

jest.mock('@providers/LifelogEditDialogProvider');
const mockUseLifelogEditDialog =
  useLifelogEditDialog as jest.MockedFunction<any>;
let notifySpySuccess: jest.SpyInstance<unknown>;
let notifySpyError: jest.SpyInstance<unknown>;

describe('LifelogEditDialog', () => {
  beforeEach(() => {
    mockUseLifelogEditDialog.mockReturnValue({
      isOpen: true,
      lifelog: lifelog(),
      editLifelog: jest.fn(),
      updateLifelog: jest.fn().mockResolvedValue({}),
      closeEditDialog: jest.fn(),
    });
    notifySpySuccess = jest.spyOn(notify, 'success');
    notifySpyError = jest.spyOn(notify, 'error');
  });
  afterEach(() => {
    notifySpySuccess.mockClear();
    notifySpyError.mockClear();
  });

  describe('ダイアログ開閉検証', () => {
    it('閉じているダイアログを開く', () => {
      useLifelogEditDialog().isOpen = false;
      const { rerender } = render(<LifelogEditDialog />);
      expect(screen.queryByTestId(TEST_ID.BASE)).not.toBeInTheDocument();
      useLifelogEditDialog().isOpen = true;
      rerender(<LifelogEditDialog />);
      expect(screen.getByTestId(TEST_ID.BASE)).toBeInTheDocument();
    });
    it('開いているダイアログを閉じる', async () => {
      const { rerender } = render(<LifelogEditDialog />);
      expect(screen.getByTestId(TEST_ID.BASE)).toBeInTheDocument();
      useLifelogEditDialog().isOpen = false;
      rerender(<LifelogEditDialog />);
      await waitFor(() => {
        expect(screen.queryByTestId(TEST_ID.BASE)).not.toBeInTheDocument();
      });
    });
    it('開いているダイアログを Esc キーで閉じる', async () => {
      render(<LifelogEditDialog />);
      expect(screen.getByTestId(TEST_ID.BASE)).toBeInTheDocument();
      fireEvent.keyDown(screen.getByTestId(TEST_ID.BASE), {
        key: 'Escape',
      });
      expect(mockUseLifelogEditDialog().closeEditDialog).toHaveBeenCalled();
    });
  });
  describe('Props検証', () => {
    it('detailRows 省略時は detail の textarea は 8 行であること', () => {
      render(<LifelogEditDialog />);
      const detailInput = screen.getByPlaceholderText(
        LIFELOG_EDIT_DIALOG.DETAIL.PLACEHOLDER
      );
      expect(detailInput.getAttribute('rows')).toEqual('8');
    });
    it('detailRows 指定時は detail の textarea は 指定した行数であること', () => {
      render(<LifelogEditDialog detailRows={20} />);
      const detailInput = screen.getByPlaceholderText(
        LIFELOG_EDIT_DIALOG.DETAIL.PLACEHOLDER
      );
      expect(detailInput.getAttribute('rows')).toEqual('20');
    });
  });
  describe('入力値検証', () => {
    it('行動(action)入力検証', async () => {
      const log = useLifelogEditDialog().lifelog;
      render(<LifelogEditDialog />);
      const actionInput = screen.getByPlaceholderText(
        LIFELOG_EDIT_DIALOG.ACTION.PLACEHOLDER
      );
      act(() => {
        userEvent.type(actionInput, '赤白黄');
      });
      await waitFor(() => {
        expect(useLifelogEditDialog().editLifelog).toHaveBeenCalled();
        expect(useLifelogEditDialog().editLifelog).toHaveBeenCalledTimes(3);
        expect(useLifelogEditDialog().editLifelog).toHaveBeenLastCalledWith({
          action: log.action + '黄',
        });
      });
    });
    it('行動詳細(detail)入力検証', async () => {
      const log = useLifelogEditDialog().lifelog;
      render(<LifelogEditDialog />);
      const detailInput = screen.getByPlaceholderText(
        LIFELOG_EDIT_DIALOG.DETAIL.PLACEHOLDER
      );
      act(() => {
        userEvent.type(detailInput, 'むらさき');
      });
      await waitFor(() => {
        expect(useLifelogEditDialog().editLifelog).toHaveBeenCalled();
        expect(useLifelogEditDialog().editLifelog).toHaveBeenCalledTimes(4);
        expect(useLifelogEditDialog().editLifelog).toHaveBeenLastCalledWith({
          detail: log.detail + 'き',
        });
      });
    });
    it('開始日時(startedAt)入力検証', async () => {
      render(<LifelogEditDialog />);
      const startedAtInput = screen.getByPlaceholderText(
        LIFELOG_EDIT_DIALOG.STARTED_AT.PLACEHOLDER
      );
      act(() => {
        fireEvent.change(startedAtInput, {
          target: { value: '2021-12-12 13:10:20' },
        });
      });
      await waitFor(() => {
        expect(useLifelogEditDialog().editLifelog).toHaveBeenCalled();
        expect(useLifelogEditDialog().editLifelog).toHaveBeenCalledWith({
          startedAt: '2021-12-12T13:10+09:00',
        });
      });
    });
    it('終了日時(finishedAt)入力検証', async () => {
      render(<LifelogEditDialog />);
      const finishedAtInput = screen.getByPlaceholderText(
        LIFELOG_EDIT_DIALOG.FINISHED_AT.PLACEHOLDER
      );
      act(() => {
        fireEvent.change(finishedAtInput, {
          target: { value: '2022-12-15 15:22:55' },
        });
      });
      await waitFor(() => {
        expect(useLifelogEditDialog().editLifelog).toHaveBeenCalled();
        expect(useLifelogEditDialog().editLifelog).toHaveBeenCalledWith({
          finishedAt: '2022-12-15T15:22+09:00',
        });
      });
    });
  });
  describe('ライフログ更新(保存ボタンクリック)検証', () => {
    it('正しい Lifelog の場合は更新処理が実行されていること', async () => {
      render(<LifelogEditDialog />);
      userEvent.click(screen.getByTestId(TEST_ID.BUTTON));
      await waitFor(() => {
        expect(useLifelogEditDialog().updateLifelog).toHaveBeenCalled();
        expect(useLifelogEditDialog().closeEditDialog).toHaveBeenCalled();
        expect(notifySpySuccess).toHaveBeenCalledWith(
          LIFELOG_EDIT_DIALOG.MESSAGE.SUCCESS
        );
      });
    });
    it('誤った Lifelog の場合はエラー通知されていること', async () => {
      useLifelogEditDialog().updateLifelog = jest
        .fn()
        .mockRejectedValue({ message: 'エラーですぞ' });
      render(<LifelogEditDialog />);
      userEvent.click(screen.getByTestId(TEST_ID.BUTTON));
      await waitFor(() => {
        expect(useLifelogEditDialog().updateLifelog).toHaveBeenCalled();
        expect(notifySpyError).toHaveBeenCalledWith('エラーですぞ');
      });
    });
  });
});
