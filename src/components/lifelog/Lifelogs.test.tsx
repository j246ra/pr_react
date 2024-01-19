import React from 'react';
import { render } from '@testing-library/react';
import { useUser } from '@providers/UserProvider';
import Lifelogs from '@lifelog/Lifelogs';
import { BrowserRouter as Router } from 'react-router-dom';
import { mockNavigator } from '@src/tests/common';

jest.mock('@providers/UserProvider');
jest.mock('@providers/LifelogProvider');

jest.mock('@lifelog/container/LifelogDetailDialog', () => () => (
  <div>{LIFELOG_DETAIL_DIALOG}</div>
));
jest.mock('@lifelog/container/LifelogEditDialog', () => () => (
  <div>{LIFELOG_EDIT_DIALOG}</div>
));
jest.mock('@lifelog/container/ContextInput', () => () => (
  <div>{CONTEXT_INPUT}</div>
));
jest.mock('@lifelog/container/LifelogList', () => () => (
  <div>{LIFELOG_LIST}</div>
));

const mockUseUser = useUser as jest.MockedFunction<any>;

const LIFELOG_DETAIL_DIALOG = 'LifelogDetailDialog Test';
const LIFELOG_EDIT_DIALOG = 'LifelogEditDialog Test';
const LIFELOG_LIST = 'LifelogList Test';
const CONTEXT_INPUT = 'ContextInput Test';

describe('Lifelogs component.', () => {
  describe('ログイン状態の時', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({
        isLogin: jest.fn().mockReturnValue(true),
      });
    });
    it('子コンポーネントが表示される', () => {
      const { getByText, container } = render(
        <Router>
          <Lifelogs />
        </Router>
      );
      expect(getByText(LIFELOG_DETAIL_DIALOG)).toBeInTheDocument();
      expect(getByText(LIFELOG_EDIT_DIALOG)).toBeInTheDocument();
      expect(getByText(LIFELOG_LIST)).toBeInTheDocument();
      expect(getByText(CONTEXT_INPUT)).toBeInTheDocument();
      expect(container.childElementCount).toEqual(4);
    });
  });

  describe('未ログイン状態の時', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({
        isLogin: jest.fn().mockReturnValue(false),
      });
    });
    it('子コンポーネントは表示されない', () => {
      const { queryByText, container } = render(
        <Router>
          <Lifelogs />
        </Router>
      );
      expect(queryByText(LIFELOG_DETAIL_DIALOG)).not.toBeInTheDocument();
      expect(queryByText(LIFELOG_EDIT_DIALOG)).not.toBeInTheDocument();
      expect(queryByText(LIFELOG_LIST)).not.toBeInTheDocument();
      expect(queryByText(CONTEXT_INPUT)).not.toBeInTheDocument();
      expect(container.childElementCount).toEqual(0);

      expect(mockNavigator).toHaveBeenCalledTimes(1);
      expect(mockNavigator).toHaveBeenCalledWith('/login');
    });
  });
});
