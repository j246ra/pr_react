import { fireEvent, render, waitFor } from '@testing-library/react';
import LifelogDetailDialog from '@lifelog/container/LifelogDetailDialog';
import { lifelog } from '@lib/faker/lifelog';
import { Lifelog } from '@providers/LifelogProvider';
import { LIFELOG_DETAIL_DIALOG } from '@lib/consts/component';
import { LIFELOG_DETAIL_DIALOG_TEST_ID as TEST_ID } from '@lib/consts/testId';

const LABEL = LIFELOG_DETAIL_DIALOG.LABEL;

describe('LifelogDetailDialog', () => {
  const handleClose = jest.fn();
  let log: Lifelog;
  beforeEach(() => {
    log = lifelog();
  });
  describe('Props log', () => {
    it('log が存在する時は各項目が正しく表示されている', async () => {
      const { getByTestId, getByText } = render(
        <LifelogDetailDialog
          isOpen={true}
          handleCloseDialog={handleClose}
          log={log}
        />
      );
      await waitFor(() => {
        expect(getByText(LABEL.ACTION)).not.toBeUndefined();
        expect(getByTestId(TEST_ID.TD_ACTION)).toHaveTextContent(log.action);
        expect(getByText(LABEL.DETAIL)).not.toBeUndefined();
        expect(getByTestId(TEST_ID.TD_DETAIL)).toHaveTextContent(
          log.detail || ''
        );
        expect(getByText(LABEL.STARTED_AT)).not.toBeUndefined();
        expect(getByTestId(TEST_ID.TD_STARTED_AT)).toHaveTextContent(
          log.startedAt
        );
        expect(getByText(LABEL.FINISHED_AT)).not.toBeUndefined();
        expect(getByTestId(TEST_ID.TD_FINISHED_AT)).toHaveTextContent(
          log.finishedAt || ''
        );
        expect(getByText(LABEL.CREATED_AT)).not.toBeUndefined();
        expect(getByTestId(TEST_ID.TD_CREATED_AT)).toHaveTextContent(
          log.createdAt
        );
        expect(getByText(LABEL.UPDATED_AT)).not.toBeUndefined();
        expect(getByTestId(TEST_ID.TD_UPDATED_AT)).toHaveTextContent(
          log.updatedAt
        );
      });
    });
    it('log が存在しない時もダイアログは表示される', async () => {
      const { getByTestId, getByText } = render(
        <LifelogDetailDialog isOpen={true} handleCloseDialog={handleClose} />
      );
      await waitFor(() => {
        expect(getByText(LABEL.ACTION)).not.toBeUndefined();
        expect(getByTestId(TEST_ID.TD_ACTION)).toBeEmptyDOMElement();
        expect(getByText(LABEL.DETAIL)).not.toBeUndefined();
        expect(getByTestId(TEST_ID.TD_DETAIL)).toBeEmptyDOMElement();
        expect(getByText(LABEL.STARTED_AT)).not.toBeUndefined();
        expect(getByTestId(TEST_ID.TD_STARTED_AT)).toBeEmptyDOMElement();
        expect(getByText(LABEL.FINISHED_AT)).not.toBeUndefined();
        expect(getByTestId(TEST_ID.TD_FINISHED_AT)).toBeEmptyDOMElement();
        expect(getByText(LABEL.CREATED_AT)).not.toBeUndefined();
        expect(getByTestId(TEST_ID.TD_CREATED_AT)).toBeEmptyDOMElement();
        expect(getByText(LABEL.UPDATED_AT)).not.toBeUndefined();
        expect(getByTestId(TEST_ID.TD_UPDATED_AT)).toBeEmptyDOMElement();
      });
    });
  });

  describe('Props isOpen', () => {
    it('true 時にダイアログがレンダリングされる', async () => {
      const { getAllByTestId } = render(
        <LifelogDetailDialog isOpen={true} handleCloseDialog={handleClose} />
      );
      await waitFor(() => {
        const elements = getAllByTestId(TEST_ID.TBODY);
        expect(elements).toHaveLength(1);
      });
    });
    it('false 時にダイアログは表示されない', async () => {
      const { queryByText, queryAllByTestId } = render(
        <LifelogDetailDialog isOpen={false} handleCloseDialog={handleClose} />
      );
      await waitFor(() => {
        const elements = queryAllByTestId(TEST_ID.TBODY);
        expect(elements).toHaveLength(0);
      });
      expect(queryByText(LABEL.ACTION)).toBeNull();
      expect(queryByText(LABEL.DETAIL)).toBeNull();
      expect(queryByText(LABEL.STARTED_AT)).toBeNull();
      expect(queryByText(LABEL.FINISHED_AT)).toBeNull();
      expect(queryByText(LABEL.CREATED_AT)).toBeNull();
      expect(queryByText(LABEL.UPDATED_AT)).toBeNull();
    });
    it('false -> true 時にダイアログが表示される', async () => {
      const { getAllByTestId, queryAllByTestId, rerender } = render(
        <LifelogDetailDialog isOpen={false} handleCloseDialog={handleClose} />
      );
      await waitFor(() => {
        const elements = queryAllByTestId(TEST_ID.TBODY);
        expect(elements).toHaveLength(0);
      });
      rerender(
        <LifelogDetailDialog isOpen={true} handleCloseDialog={handleClose} />
      );
      await waitFor(() => {
        const elements = getAllByTestId(TEST_ID.TBODY);
        expect(elements).toHaveLength(1);
      });
    });
    it('true -> false 時にダイアログが閉じる', async () => {
      const { getAllByTestId, queryAllByTestId, rerender } = render(
        <LifelogDetailDialog isOpen={true} handleCloseDialog={handleClose} />
      );
      await waitFor(() => {
        const elements = getAllByTestId(TEST_ID.TBODY);
        expect(elements).toHaveLength(1);
      });
      rerender(
        <LifelogDetailDialog isOpen={false} handleCloseDialog={handleClose} />
      );
      await waitFor(() => {
        const elements = queryAllByTestId(TEST_ID.TBODY);
        expect(elements).toHaveLength(0);
      });
    });
  });

  describe('Props handleCloseDialog', () => {
    it('ダイアログが閉じられるときに呼び出されている', async () => {
      const { getAllByTestId, getByTestId } = render(
        <LifelogDetailDialog
          isOpen={true}
          log={log}
          handleCloseDialog={handleClose}
        />
      );
      await waitFor(() => {
        const elements = getAllByTestId(TEST_ID.TBODY);
        expect(elements).toHaveLength(1);
      });
      fireEvent.keyDown(getByTestId(TEST_ID.TBODY), {
        key: 'Escape',
      });
      await waitFor(() => {
        expect(handleClose).toHaveBeenCalled();
      });
    });
  });
});
