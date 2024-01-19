import React from 'react';
import { render } from '@testing-library/react';
import { useUser } from '@providers/UserProvider';
import Lifelogs from '@lifelog/Lifelogs';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('@providers/UserProvider');
jest.mock('@providers/LifelogProvider');
jest.mock('@lifelog/container/LifelogDetailDialog');
jest.mock('@lifelog/container/LifelogEditDialog');
jest.mock('@lifelog/container/ContextInput');
jest.mock('@lifelog/container/LifelogList', () => () => (
  <div>Lifelog List Stub</div>
));

const mockUseUser = useUser as jest.MockedFunction<any>;

describe('Lifelogs component.', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      isLogin: jest.fn().mockReturnValue(true),
    });
  });
  it('LifelogList component', () => {
    const { getByText } = render(
      <Router>
        <Lifelogs />
      </Router>
    );
    expect(getByText('Lifelog List Stub')).toBeInTheDocument();
  });
});
