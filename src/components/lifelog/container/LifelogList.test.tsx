import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
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

jest.mock('react-hot-toast');
jest.mock('@providers/LifelogProvider');

const mockUseLifelog = useLifelog as jest.MockedFunction<any>;
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
      deleteLog: jest.fn(),
      finishLog: jest.fn().mockReturnValue(Promise.resolve()),
    });
  });
  it('LifelogListHeader component.', () => {
    const { findByText } = render(<LifelogList />);
    findByText('開始時間').then((element) => {
      expect(element).not.toBeUndefined();
    });
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
    const log = mockLogs[2];
    render(<LifelogList />);
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
  it('LifelogDetailDialog', async () => {
    render(<LifelogList />);
    const testid = (id: string) => `lifelog-detail-dialog-${id}`;
    const log = mockLogs[5];
    const link = screen.getByTestId(`lifelog-item-link-text-${log.id}`);
    expect(screen.queryAllByTestId(testid('tbody'))).toHaveLength(0);
    act(() => userEvent.click(link));
    await waitFor(() => {
      expect(screen.queryAllByTestId(testid('tbody'))).toHaveLength(1);
    });
    fireEvent.keyDown(screen.getByTestId(testid('tbody')), {
      key: 'Escape',
    });
    await waitFor(() => {
      expect(screen.queryAllByTestId(testid('tbody'))).toHaveLength(0);
    });
  });
  it('LifelogEditDialog', async () => {
    const log = mockLogs[1];
    render(<LifelogList />);
    expect(screen.queryAllByTestId('lifelog-edit-dialog')).toHaveLength(0);
    const button = screen.getByTestId(`edit-button-${log.id}`);
    act(() => {
      userEvent.click(button);
    });
    await waitFor(() => {
      expect(screen.queryAllByTestId('lifelog-edit-dialog')).toHaveLength(1);
    });
    fireEvent.keyDown(screen.getByTestId('lifelog-edit-dialog'), {
      key: 'Escape',
    });
    await waitFor(() => {
      expect(screen.queryAllByTestId('lifelog-edit-dialog')).toHaveLength(0);
    });
  });
});
