import { useLifelogDetailDialog } from '@providers/LifelogDetailDialogProvider';
import { lifelog } from '@lib/faker/lifelog';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LIFELOG_DETAIL_DIALOG_TEST_ID as TEST_ID } from '@lib/consts/testId';
import LifelogDetailDialog from '@lifelog/container/LifelogDetailDialog';
import { LIFELOG_DETAIL_DIALOG } from '@lib/consts/component';
import lifelogUtil from '@lib/lifelogUtil';
import { daysDisplayFull } from '@lib/dateUtil';

jest.mock('@providers/LifelogDetailDialogProvider');
const mockUseLifelogDetailDialog =
  useLifelogDetailDialog as jest.MockedFunction<any>;

describe('LifelogDetailDialog', () => {
  beforeEach(() => {
    mockUseLifelogDetailDialog.mockReturnValue({
      isOpen: true,
      log: lifelog(),
      closeDetailDialog: jest.fn(),
    });
  });

  describe('ダイアログの開閉検証', () => {
    it('閉じているダイアログを開く', () => {
      useLifelogDetailDialog().isOpen = false;
      const { rerender } = render(<LifelogDetailDialog />);
      expect(screen.queryByTestId(TEST_ID.TBODY)).not.toBeInTheDocument();
      useLifelogDetailDialog().isOpen = true;
      rerender(<LifelogDetailDialog />);
      expect(screen.getByTestId(TEST_ID.TBODY)).toBeInTheDocument();
    });
    it('開いているダイアログを閉じる', async () => {
      const { rerender } = render(<LifelogDetailDialog />);
      expect(screen.getByTestId(TEST_ID.TBODY)).toBeInTheDocument();
      useLifelogDetailDialog().isOpen = false;
      rerender(<LifelogDetailDialog />);
      await waitFor(() => {
        expect(screen.queryByTestId(TEST_ID.TBODY)).not.toBeInTheDocument();
      });
    });
    it('開いているダイアログを Esc キーで閉じる', async () => {
      render(<LifelogDetailDialog />);
      expect(screen.getByTestId(TEST_ID.TBODY)).toBeInTheDocument();
      fireEvent.keyDown(screen.getByTestId(TEST_ID.TBODY), {
        key: 'Escape',
      });
      expect(mockUseLifelogDetailDialog().closeDetailDialog).toHaveBeenCalled();
    });
  });

  describe('表示項目検証', () => {
    const LABEL = LIFELOG_DETAIL_DIALOG.LABEL;
    it('すべての項目が正しく表示されていること', () => {
      render(<LifelogDetailDialog />);
      const log = mockUseLifelogDetailDialog().log;

      expect(screen.getByText(LABEL.ACTION)).not.toBeUndefined();
      expect(screen.getByTestId(TEST_ID.TD_ACTION)).toHaveTextContent(
        log.action
      );
      expect(screen.getByText(LABEL.DETAIL)).not.toBeUndefined();
      expect(screen.getByTestId(TEST_ID.TD_DETAIL)).toHaveTextContent(
        log.detail || ''
      );
      expect(screen.getByText(LABEL.STARTED_AT)).not.toBeUndefined();
      expect(screen.getByTestId(TEST_ID.TD_STARTED_AT)).toHaveTextContent(
        daysDisplayFull(log.startedAt)
      );
      expect(screen.getByText(LABEL.FINISHED_AT)).not.toBeUndefined();
      expect(screen.getByTestId(TEST_ID.TD_FINISHED_AT)).toHaveTextContent(
        daysDisplayFull(log.finishedAt) || ''
      );
      expect(screen.getByText(LABEL.CREATED_AT)).not.toBeUndefined();
      expect(screen.getByTestId(TEST_ID.TD_CREATED_AT)).toHaveTextContent(
        daysDisplayFull(log.createdAt)
      );
      expect(screen.getByText(LABEL.UPDATED_AT)).not.toBeUndefined();
      expect(screen.getByTestId(TEST_ID.TD_UPDATED_AT)).toHaveTextContent(
        daysDisplayFull(log.updatedAt)
      );
    });
    it('未設定の場合でも初期値で表示されること', () => {
      mockUseLifelogDetailDialog().log = lifelogUtil.blank();
      render(<LifelogDetailDialog />);
      expect(screen.getByText(LABEL.ACTION)).not.toBeUndefined();
      expect(screen.getByTestId(TEST_ID.TD_ACTION)).toHaveTextContent('');
      expect(screen.getByText(LABEL.DETAIL)).not.toBeUndefined();
      expect(screen.getByTestId(TEST_ID.TD_DETAIL)).toHaveTextContent('');
      expect(screen.getByText(LABEL.STARTED_AT)).not.toBeUndefined();
      expect(screen.getByTestId(TEST_ID.TD_STARTED_AT)).toHaveTextContent('');
      expect(screen.getByText(LABEL.FINISHED_AT)).not.toBeUndefined();
      expect(screen.getByTestId(TEST_ID.TD_FINISHED_AT)).toHaveTextContent('');
      expect(screen.getByText(LABEL.CREATED_AT)).not.toBeUndefined();
      expect(screen.getByTestId(TEST_ID.TD_CREATED_AT)).toHaveTextContent('');
      expect(screen.getByText(LABEL.UPDATED_AT)).not.toBeUndefined();
      expect(screen.getByTestId(TEST_ID.TD_UPDATED_AT)).toHaveTextContent('');
    });
  });
});
