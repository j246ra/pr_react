import React from 'react';
import { render, waitFor } from '@testing-library/react';
import LifelogList from './LifelogList';
import { useLifelog } from '@providers/LifelogProvider';
import { lifelog, lifelogs } from '@lib/faker/lifelog';
import userEvent from '@testing-library/user-event';
import {
  mockUseAuth,
  mockUseSession,
  mockUseUser,
} from '@src/tests/baseProviders';

jest.mock('@providers/LifelogProvider');

const mockUseLifelog = useLifelog as jest.MockedFunction<any>;

const mockLogs = lifelogs(10);
describe('LifelogList component', () => {
  beforeEach(() => {
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
    });
  });
  it('LifelogListHeader component.', () => {
    const { findByText } = render(<LifelogList />);
    findByText('開始時間').then((element) => {
      expect(element).not.toBeUndefined();
    });
  });
  it('LifelogItem component', () => {
    const { container } = render(<LifelogList />);
    expect(
      container.getElementsByClassName('app-link-text')[5]
    ).toHaveTextContent(mockLogs[5].action);
  });
  it('LifelogDetailDialog', async () => {
    const { getAllByTestId, findAllByText } = render(<LifelogList />);
    await waitFor(() => {
      const editButton = getAllByTestId('edit-button').pop();
      expect(editButton).not.toBeUndefined();
      if (editButton !== undefined) userEvent.click(editButton);
    });
    findAllByText(mockLogs[0].action).then((elements) => {
      expect(elements.length).toEqual(1);
      expect(elements[0]).toHaveTextContent(mockLogs[0].action);
    });
  });
  it('LifelogDetailDialog', async () => {
    const { container, findAllByText } = render(<LifelogList />);
    await waitFor(() => {
      const linkText = container.getElementsByClassName('app-link-text')[0];
      userEvent.click(linkText);
    });
    findAllByText(mockLogs[0].action).then((elements) => {
      expect(elements.length).toEqual(1);
      expect(elements[0]).toHaveTextContent(mockLogs[0].action);
    });
  });
});
