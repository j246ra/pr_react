import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BaseLifelogDetailDialog from '@lifelog/presentational/BaseLifelogDetailDialog';
import { lifelog } from '@lib/faker/lifelog';
import { LIFELOG_DETAIL_DIALOG_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { daysDisplayFull } from '@lib/dateUtil';
import { LIFELOG_DETAIL_DIALOG } from '@lib/consts/component';
import lifelogUtil from '@lib/lifelogUtil';

describe('BaseLifelogDetailDialog', () => {
  const mockCloseDetailDialog = jest.fn();
  describe('ダイアログ開閉検証', () => {
    it('isOpen による制御確認', async () => {
      const { rerender } = render(
        <BaseLifelogDetailDialog
          closeDetailDialog={mockCloseDetailDialog}
          isOpen={true}
          log={lifelog()}
        />
      );
      expect(screen.getByTestId(TEST_ID.TBODY)).toBeInTheDocument();
      rerender(
        <BaseLifelogDetailDialog
          closeDetailDialog={mockCloseDetailDialog}
          isOpen={false}
          log={lifelog()}
        />
      );
      await waitFor(() => {
        expect(screen.queryByTestId(TEST_ID.TBODY)).not.toBeInTheDocument();
      });
    });
    it('開いているダイアログを Esc キーで閉じる', async () => {
      render(
        <BaseLifelogDetailDialog
          closeDetailDialog={mockCloseDetailDialog}
          isOpen={true}
          log={lifelog()}
        />
      );
      expect(screen.getByTestId(TEST_ID.TBODY)).toBeInTheDocument();
      fireEvent.keyDown(screen.getByTestId(TEST_ID.TBODY), {
        key: 'Escape',
      });
      expect(mockCloseDetailDialog).toHaveBeenCalled();
    });
  });
  describe('各項目表示確認', () => {
    const LABEL = LIFELOG_DETAIL_DIALOG.LABEL;
    const log = lifelog();
    it('すべての項目が正しく表示されている', () => {
      render(
        <BaseLifelogDetailDialog
          closeDetailDialog={mockCloseDetailDialog}
          isOpen={true}
          log={log}
        />
      );
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
      render(
        <BaseLifelogDetailDialog
          closeDetailDialog={mockCloseDetailDialog}
          isOpen={true}
          log={lifelogUtil.blank()}
        />
      );
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
