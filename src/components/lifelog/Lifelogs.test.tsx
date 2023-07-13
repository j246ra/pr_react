import React from 'react';
import { render } from '@testing-library/react';
import { useUser } from '@providers/UserProvider';
import { useLifelog } from '@providers/LifelogProvider';
import Lifelogs from '@lifelog/Lifelogs';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

jest.mock('@providers/UserProvider');
jest.mock('@providers/LifelogProvider');
jest.mock('@lifelog/container/LifelogList', () => () => (
  <div>Lifelog List Stub</div>
));

const mockUseUser = useUser as jest.MockedFunction<any>;
const mockUseLifelog = useLifelog as jest.MockedFunction<any>;

describe('Lifelogs component.', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      isLogin: jest.fn().mockReturnValue(true),
    });
    mockUseLifelog.mockReturnValue({
      createLogByContext: jest.fn().mockResolvedValue({ status: 200 }),
    });
  });
  it('ContextInput component', () => {
    const { getByText } = render(
      <Router>
        <Lifelogs />
      </Router>
    );
    expect(getByText('Lifelog List Stub')).toBeInTheDocument();
  });
  it('CreateLifelog', () => {
    const { findAllByRole } = render(
      <Router>
        <Lifelogs />
      </Router>
    );
    findAllByRole('button').then((elements) => {
      const button = elements.pop();
      expect(button).not.toBeUndefined();
      if (button !== undefined) userEvent.click(button);
      expect(mockUseLifelog).toBeCalledTimes(1);
    });
  });
});
