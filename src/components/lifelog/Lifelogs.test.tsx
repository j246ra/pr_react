import React from 'react';
import { render } from '@testing-library/react';
import Lifelogs from '@lifelog/Lifelogs';

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

const LIFELOG_DETAIL_DIALOG = 'LifelogDetailDialog Test';
const LIFELOG_EDIT_DIALOG = 'LifelogEditDialog Test';
const LIFELOG_LIST = 'LifelogList Test';
const CONTEXT_INPUT = 'ContextInput Test';

describe('Lifelogs component.', () => {
  it('子コンポーネントが表示される', () => {
    const { getByText, container } = render(<Lifelogs />);
    expect(getByText(LIFELOG_DETAIL_DIALOG)).toBeInTheDocument();
    expect(getByText(LIFELOG_EDIT_DIALOG)).toBeInTheDocument();
    expect(getByText(LIFELOG_LIST)).toBeInTheDocument();
    expect(getByText(CONTEXT_INPUT)).toBeInTheDocument();
    expect(container.childElementCount).toEqual(4);
  });
});
