import { fireEvent, render, waitFor } from '@testing-library/react';
import LifelogDetailDialog, {
  LIFELOG_DETAIL_DIALOG_TEST_ID,
} from '@lifelog/container/LifelogDetailDialog';
import { lifelog } from '@lib/faker/lifelog';
import { Lifelog } from '@providers/LifelogProvider';

const TEST_ID = LIFELOG_DETAIL_DIALOG_TEST_ID + '-';

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
        expect(getByText('行動')).not.toBeUndefined();
        expect(getByTestId(`${TEST_ID}td-action`)).toHaveTextContent(
          log.action
        );
        expect(getByText('詳細')).not.toBeUndefined();
        expect(getByTestId(`${TEST_ID}td-detail`)).toHaveTextContent(
          log.detail || ''
        );
        expect(getByText('開始時間')).not.toBeUndefined();
        expect(getByTestId(`${TEST_ID}td-started-at`)).toHaveTextContent(
          log.startedAt
        );
        expect(getByText('終了時間')).not.toBeUndefined();
        expect(getByTestId(`${TEST_ID}td-finished-at`)).toHaveTextContent(
          log.finishedAt || ''
        );
        expect(getByText('作成日時')).not.toBeUndefined();
        expect(getByTestId(`${TEST_ID}td-created-at`)).toHaveTextContent(
          log.createdAt
        );
        expect(getByText('更新日時')).not.toBeUndefined();
        expect(getByTestId(`${TEST_ID}td-updated-at`)).toHaveTextContent(
          log.updatedAt
        );
      });
    });
    it('log が存在しない時もダイアログは表示される', async () => {
      const { getByTestId, getByText } = render(
        <LifelogDetailDialog isOpen={true} handleCloseDialog={handleClose} />
      );
      await waitFor(() => {
        expect(getByText('行動')).not.toBeUndefined();
        expect(getByTestId(`${TEST_ID}td-action`)).toBeEmptyDOMElement();
        expect(getByText('詳細')).not.toBeUndefined();
        expect(getByTestId(`${TEST_ID}td-detail`)).toBeEmptyDOMElement();
        expect(getByText('開始時間')).not.toBeUndefined();
        expect(getByTestId(`${TEST_ID}td-started-at`)).toBeEmptyDOMElement();
        expect(getByText('終了時間')).not.toBeUndefined();
        expect(getByTestId(`${TEST_ID}td-finished-at`)).toBeEmptyDOMElement();
        expect(getByText('作成日時')).not.toBeUndefined();
        expect(getByTestId(`${TEST_ID}td-created-at`)).toBeEmptyDOMElement();
        expect(getByText('更新日時')).not.toBeUndefined();
        expect(getByTestId(`${TEST_ID}td-updated-at`)).toBeEmptyDOMElement();
      });
    });
  });

  describe('Props isOpen', () => {
    it('true 時にダイアログがレンダリングされる', async () => {
      const { getAllByTestId } = render(
        <LifelogDetailDialog isOpen={true} handleCloseDialog={handleClose} />
      );
      await waitFor(() => {
        const elements = getAllByTestId(`${TEST_ID}tbody`);
        expect(elements).toHaveLength(1);
      });
    });
  });
  it('false 時にダイアログは表示されない', async () => {
    const { queryByText, queryAllByTestId } = render(
      <LifelogDetailDialog isOpen={false} handleCloseDialog={handleClose} />
    );
    await waitFor(() => {
      const elements = queryAllByTestId(`${TEST_ID}tbody`);
      expect(elements).toHaveLength(0);
    });
    expect(queryByText('行動')).toBeNull();
    expect(queryByText('詳細')).toBeNull();
    expect(queryByText('開始時間')).toBeNull();
    expect(queryByText('終了時間')).toBeNull();
    expect(queryByText('作成日時')).toBeNull();
    expect(queryByText('更新日時')).toBeNull();
  });
  it('false -> true 時にダイアログが表示される', async () => {
    const { getAllByTestId, queryAllByTestId, rerender } = render(
      <LifelogDetailDialog isOpen={false} handleCloseDialog={handleClose} />
    );
    await waitFor(() => {
      const elements = queryAllByTestId(`${TEST_ID}tbody`);
      expect(elements).toHaveLength(0);
    });
    rerender(
      <LifelogDetailDialog isOpen={true} handleCloseDialog={handleClose} />
    );
    await waitFor(() => {
      const elements = getAllByTestId(`${TEST_ID}tbody`);
      expect(elements).toHaveLength(1);
    });
  });
  it('true -> false 時にダイアログが閉じる', async () => {
    const { getAllByTestId, queryAllByTestId, rerender } = render(
      <LifelogDetailDialog isOpen={true} handleCloseDialog={handleClose} />
    );
    await waitFor(() => {
      const elements = getAllByTestId(`${TEST_ID}tbody`);
      expect(elements).toHaveLength(1);
    });
    rerender(
      <LifelogDetailDialog isOpen={false} handleCloseDialog={handleClose} />
    );
    await waitFor(() => {
      const elements = queryAllByTestId(`${TEST_ID}tbody`);
      expect(elements).toHaveLength(0);
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
        const elements = getAllByTestId(`${TEST_ID}tbody`);
        expect(elements).toHaveLength(1);
      });
      fireEvent.keyDown(getByTestId(`${TEST_ID}tbody`), {
        key: 'Escape',
      });
      await waitFor(() => {
        expect(handleClose).toHaveBeenCalled();
      });
    });
  });
});
