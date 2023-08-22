import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import LifelogList from './LifelogList';
import {
  Lifelog,
  useLifelog,
  useLifelogDetailDialog,
  useLifelogEditDialog,
} from '@providers/LifelogProvider';
import { lifelog, lifelogs } from '@lib/faker/lifelog';
import userEvent from '@testing-library/user-event';
import {
  mockUseAuth,
  mockUseSession,
  mockUseUser,
} from '@src/tests/baseProviders';
import toast from 'react-hot-toast';
import { NOTIFY } from '@src/lib/consts';

jest.mock('react-hot-toast');
jest.mock('@providers/LifelogProvider');

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
      logs: mockLogs,
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
  });
  it('LifelogListHeader component.', () => {
    render(<LifelogList />);
    expect(screen.getByText('開始時間')).toBeInTheDocument();
  });
  it('LifelogItem component', () => {
    render(<LifelogList />);
    const links = screen.getAllByTestId(/lifelog-item-link-text/);
    expect(links).toHaveLength(10);
    const contexts = links.map((td) => td.textContent);
    mockLogs.forEach((log) => {
      expect(contexts).toContain(log.action);
    });
  });
  it('Finish Button', async () => {
    render(<LifelogList />);
    const log = mockLogs[2];
    const button = screen.getByTestId(`finish-button-${log.id}`);
    act(() => {
      userEvent.click(button);
    });
    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalled();
      expect(mockToast.success).toHaveBeenCalledWith(
        '行動時間を記録しました。'
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
      act(() => userEvent.click(screen.getByTestId(`delete-button-${log.id}`)));
      await waitFor(() => {
        expect(mockToast.success).not.toHaveBeenCalled();
      });
    });
    it('確認ダイアログ OK 時は削除処理を実行すること', async () => {
      confirmSpay.mockReturnValue(true);
      const log = mockLogs[3];
      render(<LifelogList />);
      act(() => userEvent.click(screen.getByTestId(`delete-button-${log.id}`)));
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
      act(() => userEvent.click(screen.getByTestId(`delete-button-${log.id}`)));
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
    const testid = (id: string) => `lifelog-detail-dialog-${id}`;
    const log = mockLogs[5];
    const link = screen.getByTestId(`lifelog-item-link-text-${log.id}`);
    expect(screen.queryAllByTestId(testid('tbody'))).toHaveLength(0);
    act(() => userEvent.click(link));
    await waitFor(() => {
      expect(mockUseLifelogDetailDialog().openDetailDialog).toHaveBeenCalled();
    });
  });
  it('LifelogEditDialog', async () => {
    render(<LifelogList />);
    const log = mockLogs[1];
    expect(screen.queryAllByTestId('lifelog-edit-dialog')).toHaveLength(0);
    const button = screen.getByTestId(`edit-button-${log.id}`);
    act(() => {
      userEvent.click(button);
    });
    await waitFor(() => {
      expect(mockUseLifelogEditDialog().openEditDialog).toHaveBeenCalled();
    });
  });
});
