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
