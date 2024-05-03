import { render, screen } from '@testing-library/react';
import LifelogListItemResponsive from '@lifelog/container/LifelogListItemResponsive';
import { lifelogs } from '@lib/faker/lifelog';
import { matchMediaObject } from '@src/tests/matchMedia';
import {
  LIFELOG_LIST_ITEM_SP_TEST_ID,
  LIFELOG_LIST_ITEM_TEST_ID,
} from '@lib/consts/testId';
import { HTMLTable } from '@blueprintjs/core';
import { ReactNode } from 'react';

describe('LifelogListItemResponsive', () => {
  const wrapper = (children: ReactNode) => {
    return (
      <HTMLTable>
        <tbody>{children}</tbody>
      </HTMLTable>
    );
  };
  it('isSp が true の場合は LifelogListItemSp を表示している', () => {
    matchMediaObject({ matches: true });
    render(wrapper(<LifelogListItemResponsive lifelogs={lifelogs(10)} />));
    expect(screen.getAllByTestId(LIFELOG_LIST_ITEM_SP_TEST_ID.TR)).toHaveLength(
      10
    );
    expect(
      screen.queryAllByTestId(LIFELOG_LIST_ITEM_TEST_ID.TD_STARTED_AT)
    ).toHaveLength(0);
  });
  it('isSp が false の場合は LifelogListItem を表示している', () => {
    matchMediaObject({ matches: false });
    render(wrapper(<LifelogListItemResponsive lifelogs={lifelogs(10)} />));
    expect(
      screen.queryAllByTestId(LIFELOG_LIST_ITEM_SP_TEST_ID.TR)
    ).toHaveLength(0);
    expect(
      screen.getAllByTestId(LIFELOG_LIST_ITEM_TEST_ID.TD_STARTED_AT)
    ).toHaveLength(10);
  });
});
