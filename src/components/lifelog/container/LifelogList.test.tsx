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

import {
  LIFELOG_LIST_ITEM_TEST_ID as TEST_ID,
  LIFELOG_LIST_ITEM_SP_TEST_ID as TEST_ID_SP,
  LIFELOG_LIST_TEST_ID,
} from '@lib/consts/testId';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import { useLifelogDetailDialog } from '@providers/LifelogDetailDialogProvider';
import { matchMediaObject } from '@src/tests/matchMedia';
import { days, DISPLAY_TIME } from '@lib/dateUtil';
import { truncate } from '@lib/stringUtil';
import { LIFELOG_LIST_ITEM_SP } from '@lib/consts/component';

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
      isTerminated: false,
    });
    mockUseLifelogDetailDialog.mockReturnValue({
      openDetailDialog: jest.fn(),
    });
    mockUseLifelogEditDialog.mockReturnValue({
      openEditDialog: jest.fn(),
    });
    matchMediaObject({ matches: false });
  });

  it('spinner', () => {
    render(<LifelogList />);
    expect(
      screen.getByTestId(LIFELOG_LIST_TEST_ID.SPINNER)
    ).toBeInTheDocument();
  });
  it('NonIdeaState', () => {
    mockUseLifelog().lifelogs = [];
    mockUseLifelog().isTerminated = true;
    render(<LifelogList />);
    expect(
      screen.getByTestId(LIFELOG_LIST_TEST_ID.NON_IDEA_STATE)
    ).toBeInTheDocument();
  });
  it('LifelogListItem component', () => {
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
  it('LifelogListItemSp component', () => {
    matchMediaObject({ matches: true });
    const { rerender } = render(<LifelogList />);
    const items = screen.getAllByTestId(new RegExp(TEST_ID_SP.TR));
    expect(items).toHaveLength(10);
    const contexts = items.map((td) => td.textContent);
    mockLogs.forEach((log) => {
      expect(contexts).toContain(
        days(log.startedAt).format(DISPLAY_TIME) +
          log.action +
          truncate(log.detail, LIFELOG_LIST_ITEM_SP.DETAIL_TRUNCATE_LENGTH)
      );
    });
    mockUseLifelog().lifelogs = [...mockLogs, ...lifelogs(10, 10)];
    rerender(<LifelogList />);
    const beforeItems = screen.getAllByTestId(new RegExp(TEST_ID_SP.TR));
    expect(beforeItems).toHaveLength(20);
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
