import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import SearchInput from '@lifelog/presentational/SearchInput';
import { useLifelog } from '@providers/LifelogProvider';
import userEvent from '@testing-library/user-event';
import toast from 'react-hot-toast';
import { SEARCH_INPUT } from '@lib/consts/component';
import { SEARCH_INPUT_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { NOTIFY } from '@lib/consts/common';

jest.mock('react-hot-toast');
jest.mock('@providers/LifelogProvider');
const mockUseLifelog = useLifelog as jest.MockedFunction<any>;
const mockToast = jest.mocked(toast);

describe('SearchInput', () => {
  beforeEach(() => {
    mockUseLifelog.mockReturnValue({
      searchLogs: jest.fn().mockReturnValue(Promise.resolve()),
    });
  });
  describe('props検証', () => {
    it('isShow が true の場合、表示され指定の width であること', () => {
      render(<SearchInput isShow={true} width={300} />);
      const input = screen.getByTestId(TEST_ID.BASE);
      expect(input).toBeInTheDocument();
      expect(input.style.width).toEqual('300px');
    });

    it('isShow が true で width 未指定の場合、260px であること', () => {
      render(<SearchInput isShow={true} />);
      const input = screen.getByTestId(TEST_ID.BASE);
      expect(input).toBeInTheDocument();
      expect(input.style.width).toEqual('260px');
    });

    it('isShow が false の場合、非表示であること', () => {
      render(<SearchInput isShow={false} />);
      expect(screen.queryByTestId(TEST_ID.BASE)).toBeNull();
    });
  });

  describe('操作関連', () => {
    beforeEach(() => {
      render(<SearchInput isShow={true} />);
    });
    describe('文字入力', () => {
      it('日本語入力中でない場合 Enter を押すと検索すること', async () => {
        const input = screen.getByPlaceholderText(
          SEARCH_INPUT.PLACEHOLDER
        ) as HTMLInputElement;
        act(() => {
          userEvent.type(input, 'running');
          fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        });
        await waitFor(() => {
          expect(mockUseLifelog().searchLogs).toHaveBeenCalledTimes(1);
          expect(input.value).toEqual('running');
        });
      });

      it('日本語入力中に Enter を押しても検索しないこと', async () => {
        const input = screen.getByPlaceholderText(
          SEARCH_INPUT.PLACEHOLDER
        ) as HTMLInputElement;
        act(() => {
          fireEvent.compositionStart(input);
          userEvent.type(input, 'こんにちは');
          fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
          fireEvent.compositionEnd(input);
        });
        await waitFor(() => {
          expect(mockUseLifelog().searchLogs).toHaveBeenCalledTimes(0);
          expect(input.value).toEqual('こんにちは');
        });
      });
    });

    describe('検索ボタン検証', () => {
      it('押下時に検索すること', async () => {
        const input = screen.getByPlaceholderText(
          SEARCH_INPUT.PLACEHOLDER
        ) as HTMLInputElement;
        const button = screen.getByTestId(TEST_ID.BUTTON);
        act(() => {
          userEvent.type(input, 'walking');
          userEvent.click(button);
        });
        await waitFor(() => {
          expect(mockUseLifelog().searchLogs).toHaveBeenCalledTimes(1);
          expect(input.value).toEqual('walking');
        });
      });

      it('日本語入力中でも検索すること', async () => {
        const input = screen.getByPlaceholderText(
          SEARCH_INPUT.PLACEHOLDER
        ) as HTMLInputElement;
        const button = screen.getByTestId(TEST_ID.BUTTON);
        act(() => {
          fireEvent.compositionStart(input);
          userEvent.type(input, 'にほんごにゅうりょくちゅう');
          userEvent.click(button);
        });
        await waitFor(() => {
          expect(mockUseLifelog().searchLogs).toHaveBeenCalledTimes(1);
          expect(input.value).toEqual('にほんごにゅうりょくちゅう');
        });
      });
    });

    describe('エラー検証', () => {
      beforeEach(() => {
        useLifelog().searchLogs = jest
          .fn()
          .mockReturnValue(Promise.reject(new Error('Very dangerous error.')));
        render(<SearchInput isShow={true} />);
      });
      it('検索エラー時に toast を表示していること', async () => {
        const input = screen.getAllByPlaceholderText(
          SEARCH_INPUT.PLACEHOLDER
        )[0] as HTMLInputElement;
        const button = screen.getAllByTestId(TEST_ID.BUTTON)[0];
        act(() => {
          userEvent.type(input, 'searching');
          userEvent.click(button);
        });
        await waitFor(() => {
          expect(mockUseLifelog().searchLogs).toHaveBeenCalledTimes(1);
          expect(input.value).toEqual('searching');
          expect(mockToast.error).toHaveBeenCalled();
          expect(mockToast.error).toHaveBeenCalledWith(
            'Very dangerous error.',
            NOTIFY.STYLE.ERROR
          );
        });
      });
    });
  });
});
