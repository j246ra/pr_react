import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import LifelogList from './LifelogList';
import { Lifelog, useLifelog } from '@providers/LifelogProvider';
import { lifelog, lifelogs } from '@lib/faker/lifelog';
import userEvent from '@testing-library/user-event';
import {
  mockUseAuth,
  mockUseSession,
  mockUseUser,
} from '@src/tests/baseProviders';
import toast from 'react-hot-toast';
import {
  LIFELOG_LIST_ITEM_TEST_ID as TEST_ID,
  LIFELOG_LIST_TEST_ID,
} from '@lib/consts/testId';
import { NOTIFY, USE_FINISH_ACTION } from '@lib/consts/common';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import { useLifelogDetailDialog } from '@providers/LifelogDetailDialogProvider';

jest.mock('react-hot-toast');
jest.mock('@providers/LifelogProvider');
jest.mock('@providers/LifelogDetailDialogProvider');
jest.mock('@providers/LifelogEditDialogProvider');

const mockUseLifelog = useLifelog as jest.MockedFunction<any>;
const mockUseLifelogDetailDialog =
  useLifelogDetailDialog as jest.MockedFunction<any>;
const mockUseLifelogEditDialog =
  useLifelogEditDialog as jest.MockedFunction<any>;
const mockToast = jest.mocked(toast);

let mockLogs: Lifelog[];
describe('LifelogList component', () => {
  beforeEach(() => {
    mockLogs = lifelogs(10);

    mockUseSession.mockReturnValue({
      removeToken: jest.fn(),
    });
    mockUseAuth.mockReturnValue({
      authApi: jest.fn(),
    });
    mockUseUser.mockReturnValue({
      clearUser: jest.fn(),
      updateUser: jest.fn(),
    });
    mockUseLifelog.mockReturnValue({
      lifelogs: mockLogs,
      loadLogs: jest.fn(),
      newLog: lifelog,
      deleteLog: jest.fn().mockReturnValue(Promise.resolve()),
      finishLog: jest.fn().mockReturnValue(Promise.resolve()),
    });
    mockUseLifelogDetailDialog.mockReturnValue({
      openDetailDialog: jest.fn(),
    });
    mockUseLifelogEditDialog.mockReturnValue({
      openEditDialog: jest.fn(),
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('spinner', () => {
    mockUseLifelog().logs = [];
    render(<LifelogList />);
    expect(
      screen.getByTestId(LIFELOG_LIST_TEST_ID.SPINNER)
    ).toBeInTheDocument();
  });
  it('LifelogItem component', () => {
    const { rerender } = render(<LifelogList />);
    const links = screen.getAllByTestId(new RegExp(TEST_ID.LINK_TEXT));
    expect(links).toHaveLength(10);
    const contexts = links.map((td) => td.textContent);
    mockLogs.forEach((log) => {
      expect(contexts).toContain(log.action + log.detail);
    });
    mockUseLifelog().lifelogs = [...mockLogs, ...lifelogs(10, 10)];
    rerender(<LifelogList />);
    const beforeLinks = screen.getAllByTestId(new RegExp(TEST_ID.LINK_TEXT));
    expect(beforeLinks).toHaveLength(20);
  });
  it('Finish Button', async () => {
    render(<LifelogList />);
    const log = mockLogs[2];
    const button = screen.getByTestId(TEST_ID.FINISH_BUTTON + log.id);
    act(() => {
      userEvent.click(button);
    });
    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalled();
      expect(mockToast.success).toHaveBeenCalledWith(
        USE_FINISH_ACTION.MESSAGE.SUCCESS
      );
    });
  });
  describe('Delete Button', () => {
    let confirmSpay: jest.SpyInstance;
    beforeEach(() => {
      confirmSpay = jest.spyOn(global, 'confirm');
    });
    it('確認ダイアログ confirm でキャンセル時は何もしないこと', async () => {
      confirmSpay.mockReturnValue(false);
      const log = mockLogs[4];
      render(<LifelogList />);
      act(() =>
        userEvent.click(screen.getByTestId(TEST_ID.DELETE_BUTTON + log.id))
      );
      await waitFor(() => {
        expect(mockToast.success).not.toHaveBeenCalled();
      });
    });
    it('確認ダイアログ OK 時は削除処理を実行すること', async () => {
      confirmSpay.mockReturnValue(true);
      const log = mockLogs[3];
      render(<LifelogList />);
      act(() =>
        userEvent.click(screen.getByTestId(TEST_ID.DELETE_BUTTON + log.id))
      );
      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalled();
        expect(mockToast.success).toHaveBeenCalledWith('削除成功');
      });
    });
    it('削除処理失敗時はエラーメッセージを通知していること', async () => {
      useLifelog().deleteLog = jest.fn().mockRejectedValue(new Error('error!'));
      confirmSpay.mockReturnValue(true);
      const log = mockLogs[3];
      render(<LifelogList />);
      act(() =>
        userEvent.click(screen.getByTestId(TEST_ID.DELETE_BUTTON + log.id))
      );
      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalled();
        expect(mockToast.error).toHaveBeenCalledWith(
          'error!',
          NOTIFY.STYLE.ERROR
        );
      });
    });
  });
  it('LifelogDetailDialog', async () => {
    render(<LifelogList />);
    const log = mockLogs[5];
    const link = screen.getByTestId(TEST_ID.LINK_TEXT + log.id);
    act(() => userEvent.click(link));
    await waitFor(() => {
      expect(mockUseLifelogDetailDialog().openDetailDialog).toHaveBeenCalled();
    });
  });
  it('LifelogEditDialog', async () => {
    render(<LifelogList />);
    const log = mockLogs[1];
    const button = screen.getByTestId(TEST_ID.EDIT_BUTTON + log.id);
    act(() => {
      userEvent.click(button);
    });
    await waitFor(() => {
      expect(mockUseLifelogEditDialog().openEditDialog).toHaveBeenCalled();
    });
  });
});
