import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import BaseLifelogEditDialog, {
  BaseLifelogEditDialogProps,
} from '@lifelog/presentational/BaseLifelogEditDialog';
import { LIFELOG_EDIT_DIALOG_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { LIFELOG_EDIT_DIALOG as CONST } from '@lib/consts/component';
import { lifelog } from '@lib/faker/lifelog';
import userEvent from '@testing-library/user-event';
import { doFunctionWhenCmdOrCtrlEnter } from '@lib/keyEventUtil';
import { days, DISPLAY_DATETIME_FULL } from '@lib/dateUtil';
import { blank as newLog } from '@lib/lifelogUtil';

jest.mock('@lib/keyEventUtil');
const mockedDoFunctionWhenCmdOrCtrlEnter = jest.mocked(
  doFunctionWhenCmdOrCtrlEnter
);

describe('BaseLifelogEditDialog', () => {
  const props: BaseLifelogEditDialogProps = {
    isOpen: false,
    lifelog: newLog(),
    editLifelog: () => {},
    closeEditDialog: () => {},
    handleUpdateLifelog: () => {},
    handleDeleteLifelog: () => {},
  };
  beforeEach(() => {
    props.isOpen = true;
    props.lifelog = lifelog();
    props.editLifelog = jest.fn();
    props.closeEditDialog = jest.fn();
    props.handleUpdateLifelog = jest.fn();
    props.handleDeleteLifelog = jest.fn();
  });

  describe('ダイアログ開閉', () => {
    it('isOpen が true でダイアログが開く', () => {
      render(<BaseLifelogEditDialog {...props} />);
      expect(screen.getByTestId(TEST_ID.BASE)).toBeInTheDocument();
    });
    it('isOpen が false でダイアログは閉じている', () => {
      render(<BaseLifelogEditDialog {...props} isOpen={false} />);
      expect(screen.queryByTestId(TEST_ID.BASE)).not.toBeInTheDocument();
    });
    it('isOpen が true -> false でダイアログが閉じる', async () => {
      const { rerender } = render(<BaseLifelogEditDialog {...props} />);
      expect(screen.getByTestId(TEST_ID.BASE)).toBeInTheDocument();
      rerender(<BaseLifelogEditDialog {...props} isOpen={false} />);
      await waitFor(() => {
        expect(screen.queryByTestId(TEST_ID.BASE)).not.toBeInTheDocument();
      });
    });
    it('Esc を押下で closeEditDialog が呼び出される', async () => {
      render(<BaseLifelogEditDialog {...props} />);
      expect(screen.getByTestId(TEST_ID.BASE)).toBeInTheDocument();
      fireEvent.keyDown(screen.getByTestId(TEST_ID.BASE), {
        key: 'Escape',
      });
      await waitFor(() => {
        expect(props.closeEditDialog).toHaveBeenCalled();
      });
    });
  });

  describe('各入力フォーム検証', () => {
    describe('行動 (action) 入力フォーム', () => {
      it('label', () => {
        render(<BaseLifelogEditDialog {...props} />);
        expect(screen.getByText(CONST.ACTION.LABEL).tagName).toEqual('LABEL');
      });
      it('input', async () => {
        const { rerender } = render(<BaseLifelogEditDialog {...props} />);
        const input: HTMLInputElement = screen.getByPlaceholderText(
          CONST.ACTION.PLACEHOLDER
        );
        expect(input.tagName).toEqual('INPUT');
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toHaveAttribute('required');
        expect(input).toHaveValue(props.lifelog.action);

        rerender(<BaseLifelogEditDialog {...props} />);
        const words = '◯△□';
        act(() => userEvent.type(input, words));
        await waitFor(() => {
          for (let i = 0; i < words.length; i++) {
            expect(props.editLifelog).toHaveBeenNthCalledWith(i + 1, {
              action: props.lifelog.action + words[i],
            });
          }
        });
      });
    });

    describe('詳細 (detail) 入力フォーム', () => {
      it('label', () => {
        render(<BaseLifelogEditDialog {...props} />);
        expect(screen.getByText(CONST.DETAIL.LABEL).tagName).toEqual('LABEL');
      });
      it('textarea', async () => {
        props.lifelog.action = '運動';
        props.lifelog.detail = 'ジョギング。';
        const { rerender } = render(<BaseLifelogEditDialog {...props} />);
        const input: HTMLTextAreaElement = screen.getByPlaceholderText(
          CONST.DETAIL.PLACEHOLDER
        );
        expect(input.tagName).toEqual('TEXTAREA');
        expect(input).toHaveAttribute('rows', '8');
        expect(input).toHaveValue(props.lifelog.detail);

        props.detailRows = 10;
        rerender(<BaseLifelogEditDialog {...props} />);
        expect(input).toHaveAttribute('rows', '10');

        const words = '公園を３周。';
        act(() => userEvent.type(input, words));
        await waitFor(() => {
          expect(mockedDoFunctionWhenCmdOrCtrlEnter).toHaveBeenCalledTimes(
            words.length
          );
          expect(mockedDoFunctionWhenCmdOrCtrlEnter).toHaveBeenLastCalledWith(
            expect.anything(),
            props.handleUpdateLifelog
          );
          expect(props.editLifelog).toHaveBeenCalledTimes(words.length);
          for (let i = 0; i < words.length; i++) {
            expect(props.editLifelog).toHaveBeenNthCalledWith(i + 1, {
              detail: props.lifelog.detail + words[i],
            });
          }
        });
      });
    });

    describe('開始時間 (startedAt) 入力フォーム', () => {
      it('label', () => {
        render(<BaseLifelogEditDialog {...props} />);
        expect(screen.getByText(CONST.STARTED_AT.LABEL).tagName).toEqual(
          'LABEL'
        );
      });
      it('input', async () => {
        const { rerender } = render(<BaseLifelogEditDialog {...props} />);
        const input: HTMLInputElement = screen.getByPlaceholderText(
          CONST.STARTED_AT.PLACEHOLDER
        );
        expect(input).toHaveAttribute(
          'placeholder',
          CONST.STARTED_AT.PLACEHOLDER
        );
        expect(input).toHaveValue(
          days(props.lifelog.startedAt).format(DISPLAY_DATETIME_FULL)
        );

        const newDateTimeString = '2024-02-28 16:03:00';
        rerender(<BaseLifelogEditDialog {...props} />);
        act(() => {
          userEvent.clear(input);
          userEvent.type(input, newDateTimeString);
        });
        await waitFor(() => {
          expect(props.editLifelog).toHaveBeenLastCalledWith({
            startedAt: days(newDateTimeString).format('YYYY-MM-DDTHH:mmZ'),
          });
        });
      });
    });

    describe('完了時間 (finishedAt) 入力フォーム', () => {
      it('label', () => {
        render(<BaseLifelogEditDialog {...props} />);
        expect(screen.getByText(CONST.FINISHED_AT.LABEL).tagName).toEqual(
          'LABEL'
        );
      });
      it('input', async () => {
        props.lifelog.finishedAt = null;
        const { rerender } = render(<BaseLifelogEditDialog {...props} />);
        const input: HTMLInputElement = screen.getByPlaceholderText(
          CONST.FINISHED_AT.PLACEHOLDER
        );
        expect(input).toHaveAttribute(
          'placeholder',
          CONST.FINISHED_AT.PLACEHOLDER
        );
        expect(input).toHaveValue('');

        const newDateTimeString = '2024-02-28 16:03:00';
        rerender(<BaseLifelogEditDialog {...props} />);
        act(() => userEvent.type(input, newDateTimeString));
        await waitFor(() => {
          expect(props.editLifelog).toHaveBeenLastCalledWith({
            finishedAt: days(newDateTimeString).format('YYYY-MM-DDTHH:mmZ'),
          });
        });
      });
    });
  });

  describe('各ボタン検証', () => {
    it('削除ボタン', async () => {
      render(<BaseLifelogEditDialog {...props} />);
      const button = screen.getByTestId(TEST_ID.DELETE);
      expect(button).toHaveTextContent(CONST.BUTTONS.DELETE);
      fireEvent.click(button);
      await waitFor(() => {
        expect(props.handleDeleteLifelog).toHaveBeenCalledWith(
          props.lifelog.id
        );
      });
    });
    it('完了時間設定ボタン', async () => {
      render(<BaseLifelogEditDialog {...props} />);
      const button = screen.getByTestId(TEST_ID.FINISH);
      expect(button).toHaveTextContent(CONST.BUTTONS.FINISH);
      fireEvent.click(button);
      await waitFor(() => {
        expect(props.editLifelog).toHaveBeenCalledWith({
          finishedAt: expect.anything(),
        });
      });
    });
    it('保存ボタン', async () => {
      render(<BaseLifelogEditDialog {...props} />);
      const button = screen.getByTestId(TEST_ID.SAVE);
      expect(button).toHaveTextContent(CONST.BUTTONS.SAVE);
      fireEvent.click(button);
      await waitFor(() => {
        expect(props.handleUpdateLifelog).toHaveBeenCalled();
      });
    });
  });
});
